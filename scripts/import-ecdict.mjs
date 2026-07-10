import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const sourceArg = process.argv.find((arg) => arg.startsWith("--source="));
if (!sourceArg) {
  throw new Error("Usage: node scripts/import-ecdict.mjs --source=/path/to/ecdict.csv");
}

const sourcePath = sourceArg.slice("--source=".length);
const notesUrl = new URL("../data/hmi-notes.json", import.meta.url);
const dictionaryJsonUrl = new URL("../data/local-dictionary.json", import.meta.url);
const dictionaryJsUrl = new URL("../data/local-dictionary.js", import.meta.url);
const notes = JSON.parse(await readFile(notesUrl, "utf8"));
const existing = JSON.parse(await readFile(dictionaryJsonUrl, "utf8"));
const contexts = collectContexts(notes);
const targets = new Set(contexts.keys());
const manualOverrides = {
  alex: ["/ˈælɪks/", "名词：亚历克斯（常见英文人名）", "noun"],
  "eyes-off-road": ["/ˌaɪz ɒf ˈroʊd/", "形容词：视线离开道路的；用于描述驾驶员没有注视前方道路的状态。", "adjective"],
  "lower-demand": ["/ˌloʊər dɪˈmænd/", "形容词：较低负荷的；对驾驶员注意力要求较低的。", "adjective"],
  "visual-manual": ["/ˌvɪʒuəl ˈmænjuəl/", "形容词：视觉与手动操作结合的；需要观看并用手操作的。", "adjective"],
};
const matches = new Map();
const requestedBases = new Map();

await scanDictionary(sourcePath, (row) => {
  const word = normalize(row[0]);
  if (!word) return;

  if (targets.has(word)) {
    keepMatch(word, row, 1);
    const base = parseExchange(row[10]).find(([code]) => code === "0")?.[1];
    if (base) requestedBases.set(word, normalize(base));
  }

  for (const [code, form] of parseExchange(row[10])) {
    const normalizedForm = normalize(form);
    if (code !== "0" && targets.has(normalizedForm)) {
      keepMatch(normalizedForm, row, 2);
    }
  }
});

const neededBases = new Map(
  [...requestedBases].filter(([target]) => (matches.get(target)?.priority || 0) < 2),
);

if (neededBases.size > 0) {
  const targetsByBase = new Map();
  for (const [target, base] of neededBases) {
    if (!targetsByBase.has(base)) targetsByBase.set(base, []);
    targetsByBase.get(base).push(target);
  }
  await scanDictionary(sourcePath, (row) => {
    const base = normalize(row[0]);
    for (const target of targetsByBase.get(base) || []) keepMatch(target, row, 3);
  });
}

const output = {};
for (const term of [...targets].sort((a, b) => a.localeCompare(b))) {
  const matched = matches.get(term)?.row;
  const previous = existing[term];
  const manual = manualOverrides[term];
  if (!matched && !previous && !manual) continue;

  const translation = matched ? cleanTranslation(matched[3]) : "";
  const partOfSpeech = matched ? normalizePartOfSpeech(matched[4]) : previous?.[2] || "";
  const previousPhonetic = previous?.[0] || "";
  const phonetic = manual?.[0] || (isUsefulPhonetic(previousPhonetic)
    ? previousPhonetic
    : formatPhonetic(matched?.[1]) || "/暂无音标/");
  const meaning = manual?.[1] || (translation
    ? `${formatPartOfSpeech(partOfSpeech)}${translation}`
    : previous?.[1] || "可结合原文语境理解。");
  const example = contexts.get(term) || previous?.[3] || "";

  output[term] = [
    phonetic,
    meaning,
    manual?.[2] || partOfSpeech,
    example,
    `在这句话中，“${term}”可理解为“${stripPartLabel(meaning)}”。`,
    matched ? "https://github.com/skywind3000/ECDICT" : previous?.[5] || "",
  ];
}

await writeFile(dictionaryJsonUrl, `${JSON.stringify(output, null, 2)}\n`);
await writeFile(dictionaryJsUrl, `window.HMI_LOCAL_DICTIONARY = ${JSON.stringify(output)};\n`);

console.log(`Imported ${Object.keys(output).length}/${targets.size} current-text entries from ECDICT.`);

function keepMatch(target, row, priority) {
  const current = matches.get(target);
  if (!current || priority > current.priority) matches.set(target, { row, priority });
}

async function scanDictionary(path, visit) {
  let firstRow = true;
  for await (const row of parseCsv(path)) {
    if (firstRow) {
      firstRow = false;
      continue;
    }
    visit(row);
  }
}

async function* parseCsv(path) {
  const stream = createReadStream(path, { encoding: "utf8" });
  let row = [];
  let field = "";
  let quoted = false;
  let quotePending = false;

  for await (const chunk of stream) {
    for (const char of chunk) {
      if (quotePending) {
        quotePending = false;
        if (char === '"') {
          field += '"';
          quoted = true;
          continue;
        }
      } else if (quoted) {
        if (char === '"') {
          quoted = false;
          quotePending = true;
        } else {
          field += char;
        }
        continue;
      }

      if (char === '"' && field.length === 0) {
        quoted = true;
      } else if (char === ",") {
        row.push(field);
        field = "";
      } else if (char === "\n") {
        row.push(field.replace(/\r$/, ""));
        yield row;
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
  }

  if (field || row.length) {
    row.push(field);
    yield row;
  }
}

function collectContexts(allNotes) {
  const result = new Map();
  for (const note of allNotes) {
    const sentences = [
      ...(note.words || []).map((word) => word.example),
      ...(note.sentenceBreakdowns || []).map((item) => item.sentence),
      ...(note.longReadings || []).flatMap((reading) => splitSentences(reading.text)),
    ].filter(Boolean);
    for (const sentence of sentences) {
      for (const match of sentence.matchAll(/[A-Za-z][A-Za-z'-]*/g)) {
        const term = normalize(match[0]);
        if (!result.has(term)) result.set(term, sentence);
      }
    }
  }
  return result;
}

function parseExchange(value = "") {
  return String(value)
    .split("/")
    .map((item) => item.split(/:(.*)/s).slice(0, 2))
    .filter(([code, form]) => code && form);
}

function cleanTranslation(value = "") {
  return String(value)
    .replace(/\\n/g, "；")
    .replace(/\n/g, "；")
    .replace(/\[(?:网络|医|法|化|计|经|航|电)\][^；]*/g, "")
    .replace(/(^|；)\s*(?:n|v|vi|vt|a|adj|adv|ad|prep|conj|pron|num|art)\.\s*/gi, "$1")
    .replace(/\s+/g, " ")
    .replace(/[；;,，]\s*[；;,，]+/g, "；")
    .replace(/^[；,，\s]+|[；,，\s]+$/g, "")
    .slice(0, 220);
}

function normalizePartOfSpeech(value = "") {
  const ranked = String(value)
    .split("/")
    .map((item) => {
      const [code, weight = "0"] = item.split(":");
      return { code, weight: Number(weight) || 0 };
    })
    .sort((a, b) => b.weight - a.weight);
  const code = ranked[0]?.code || "";
  return ({ n: "noun", v: "verb", a: "adjective", j: "adjective", s: "adjective", r: "adverb", d: "adverb", p: "preposition", c: "conjunction" })[code] || "";
}

function formatPartOfSpeech(value = "") {
  return ({ noun: "名词：", verb: "动词：", adjective: "形容词：", adverb: "副词：", preposition: "介词：", conjunction: "连词：" })[value] || "";
}

function formatPhonetic(value = "") {
  const phonetic = String(value).trim();
  return phonetic ? `/${phonetic.replace(/^\/+|\/+$/g, "")}/` : "";
}

function isUsefulPhonetic(value = "") {
  return Boolean(value && !value.includes("暂无") && !value.includes("待补充"));
}

function stripPartLabel(value = "") {
  return String(value).replace(/^(?:名词|动词|形容词|副词|介词|连词)：/, "");
}

function splitSentences(text = "") {
  return String(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()) || [];
}

function normalize(value = "") {
  return String(value).toLowerCase().replace(/[’']/g, "").trim();
}
