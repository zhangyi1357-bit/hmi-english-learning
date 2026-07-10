import { readFile, writeFile } from "node:fs/promises";

const notesUrl = new URL("../data/hmi-notes.json", import.meta.url);
const mainJsUrl = new URL("../app/main.js", import.meta.url);
const dictionaryJsonUrl = new URL("../data/local-dictionary.json", import.meta.url);
const dictionaryJsUrl = new URL("../data/local-dictionary.js", import.meta.url);
const notes = JSON.parse(await readFile(notesUrl, "utf8"));
const mainSource = await readFile(mainJsUrl, "utf8");
const dictionary = JSON.parse(await readFile(dictionaryJsonUrl, "utf8"));
const authoredTerms = collectAuthoredTerms(notes);
for (const term of collectBuiltInTerms(mainSource)) authoredTerms.add(term);
const contexts = collectContexts(notes);
const allTerms = [...contexts.keys()].filter((term) => !authoredTerms.has(term) && !dictionary[term]);
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : allTerms.length;
const pending = allTerms.slice(0, Number.isFinite(limit) ? limit : allTerms.length);

console.log(`Local dictionary: ${Object.keys(dictionary).length} existing, ${pending.length} lookup(s) pending.`);

let completed = 0;
await runPool(pending, 8, async (term) => {
  const entry = await lookupTerm(term, contexts.get(term));
  if (entry) dictionary[term] = entry;
  completed += 1;

  if (completed % 25 === 0 || completed === pending.length) {
    await writeDictionary(dictionary);
    console.log(`Processed ${completed}/${pending.length}; saved ${Object.keys(dictionary).length} entries.`);
  }
});

await writeDictionary(dictionary);
console.log(`Synced ${Object.keys(dictionary).length} local dictionary entries.`);

function collectAuthoredTerms(allNotes) {
  const terms = new Set();
  for (const note of allNotes) {
    for (const entry of [...(note.words || []), ...(note.glossary || [])]) {
      if (entry?.term) terms.add(normalize(entry.term));
    }
  }
  return terms;
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

async function lookupTerm(term, example) {
  const dictionaryUrl = `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(term)}`;
  const dictionaryData = await fetchJson(dictionaryUrl).catch(() => null);
  const apiEntry = dictionaryData?.entries?.find((item) => item.language?.code === "en") || dictionaryData?.entries?.[0];
  const phonetic = apiEntry?.pronunciations?.find((item) => item.type === "ipa")?.text || "/暂无音标/";
  const translationTerm = extractLemma(apiEntry) || term;
  const translationUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(translationTerm)}&langpair=en%7Czh-CN`;
  const translationData = await fetchJson(translationUrl).catch(() => null);
  const translation = cleanTranslation(translationData?.responseData?.translatedText, term);

  if (!apiEntry && !translation) return null;

  const meaning = translation || firstDefinition(apiEntry) || "可结合原文语境理解。";
  const partOfSpeech = apiEntry?.partOfSpeech || "";
  return [
    phonetic,
    `${formatPartOfSpeech(partOfSpeech)}${meaning}`,
    partOfSpeech,
    example || `${term} appears in today's HMI learning text.`,
    `在这句话中，“${term}”可理解为“${meaning}”。`,
    dictionaryData?.source?.url || "https://freedictionaryapi.com/",
  ];
}

function collectBuiltInTerms(source) {
  const terms = new Set();
  for (const match of source.matchAll(/\["([A-Za-z][A-Za-z'-]*)",\s*"\//g)) terms.add(normalize(match[1]));
  for (const match of source.matchAll(/term:\s*"([A-Za-z][A-Za-z -]*)"/g)) terms.add(normalize(match[1]));
  return terms;
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "HMI-English-Learning/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function writeDictionary(data) {
  const sorted = Object.fromEntries(Object.entries(data).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(dictionaryJsonUrl, `${JSON.stringify(sorted, null, 2)}\n`);
  await writeFile(dictionaryJsUrl, `window.HMI_LOCAL_DICTIONARY = ${JSON.stringify(sorted)};\n`);
}

async function runPool(items, concurrency, worker) {
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
}

function cleanTranslation(value, term) {
  const translation = String(value || "").trim();
  if (!translation || normalize(translation) === normalize(term)) return "";
  return translation;
}

function firstDefinition(entry) {
  return entry?.senses?.find((sense) => sense.definition)?.definition || "";
}

function extractLemma(entry) {
  const formSense = entry?.senses?.find((sense) => sense.tags?.includes("form of"));
  const match = formSense?.definition?.match(/\bof ([A-Za-z][A-Za-z'-]*)[.!;]?$/i);
  return match?.[1] || "";
}

function formatPartOfSpeech(value = "") {
  const labels = {
    noun: "名词：",
    verb: "动词：",
    adjective: "形容词：",
    adverb: "副词：",
    pronoun: "代词：",
    preposition: "介词：",
    conjunction: "连词：",
    interjection: "感叹词：",
    article: "冠词：",
    determiner: "限定词：",
    numeral: "数词：",
  };
  return labels[String(value).toLowerCase()] || "";
}

function splitSentences(text = "") {
  return String(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()) || [];
}

function normalize(value = "") {
  return String(value).toLowerCase().replace(/[’']/g, "").trim();
}
