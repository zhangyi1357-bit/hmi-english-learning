import { mountReview } from "./review.js";

const state = {
  notes: [],
  active: null,
  dictionary: new Map(),
  clickableTerms: [],
};

const elements = {
  dateSelect: document.querySelector("#dateSelect"),
  refreshButton: document.querySelector("#refreshButton"),
  todayHero: document.querySelector("#todayHero"),
  wordCount: document.querySelector("#wordCount"),
  wordGrid: document.querySelector("#wordGrid"),
  readingMeta: document.querySelector("#readingMeta"),
  readingBlock: document.querySelector("#readingBlock"),
  breakdownList: document.querySelector("#breakdownList"),
  practiceList: document.querySelector("#practiceList"),
  dialog: document.querySelector("#wordDialog"),
  dialogClose: document.querySelector("#dialogClose"),
  dialogTerm: document.querySelector("#dialogTerm"),
  dialogPhonetic: document.querySelector("#dialogPhonetic"),
  dialogMeaning: document.querySelector("#dialogMeaning"),
  dialogExample: document.querySelector("#dialogExample"),
  dialogChineseExample: document.querySelector("#dialogChineseExample"),
  dialogSpeakTerm: document.querySelector("#dialogSpeakTerm"),
  dialogSpeakExample: document.querySelector("#dialogSpeakExample"),
};

async function loadNotes() {
  if (Array.isArray(window.HMI_NOTES)) {
    state.notes = window.HMI_NOTES;
    state.active = state.notes[0];
    renderDateOptions();
    render();
    return;
  }

  const response = await fetch("data/hmi-notes.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load learning notes.");
  }
  state.notes = await response.json();
  state.active = state.notes[0];
  renderDateOptions();
  render();
}

function renderDateOptions() {
  elements.dateSelect.innerHTML = state.notes
    .map((note, index) => `<option value="${index}">${note.date}｜${escapeHtml(note.topic)}</option>`)
    .join("");
  elements.dateSelect.addEventListener("change", (event) => {
    state.active = state.notes[Number(event.target.value)];
    render();
  });
}

function render() {
  const note = state.active;
  if (!note) return;
  state.dictionary = buildDictionary(note);

  elements.todayHero.innerHTML = `
    <p class="eyebrow">${escapeHtml(note.date)}</p>
    <h2>${escapeHtml(note.title)}</h2>
    <p>${escapeHtml(note.summary)}</p>
    <div class="heroMeta">
      <span class="pill">${escapeHtml(note.topic)}</span>
      <span class="pill">${escapeHtml(note.suggestedTime)}</span>
      <span class="pill">${note.words.length} 个词汇</span>
    </div>
  `;

  elements.wordCount.textContent = `${note.words.length} 个可点击词汇`;
  elements.wordGrid.innerHTML = "";
  note.words.forEach((word) => {
    const card = document.createElement("article");
    card.className = "wordButton";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.innerHTML = `
      <div class="wordTopline">
        <strong>${escapeHtml(word.term)}</strong>
        <button class="speakButton" type="button" data-speak="${escapeHtml(word.term)}" title="播放词汇发音">播放</button>
      </div>
      <span>${escapeHtml(word.phonetic)}</span>
      <p>${escapeHtml(word.meaning)}</p>
      <div class="wordExample">
        <div class="wordExampleTopline">
          <b>例句</b>
          <button class="speakButton" type="button" data-speak="${escapeHtml(word.example)}" title="播放完整例句">播放例句</button>
        </div>
        <p>${renderClickableText(word.example)}</p>
        <small>${escapeHtml(word.chineseExample)}</small>
      </div>
    `;
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-speak]")) return;
      if (event.target.closest(".inlineWord")) return;
      openWord(word);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWord(word);
      }
    });
    elements.wordGrid.append(card);
  });

  const reading = note.longReadings[0];
  elements.readingMeta.textContent = reading.source?.label || "原创跟读文本";
  elements.readingBlock.innerHTML = `
    <div class="readingActions">
      <button class="iconTextButton" type="button" data-speak-reading="true">播放全文</button>
      <button class="iconTextButton secondary" type="button" data-stop-speaking="true">停止播放</button>
    </div>
    <p class="readingText">${renderClickableText(reading.text)}</p>
    <p class="translation">${escapeHtml(reading.translation)}</p>
    ${renderSource(reading.source)}
  `;

  elements.breakdownList.innerHTML = note.sentenceBreakdowns
    .map((item) => `
      <article class="breakdownItem">
        <p><strong>Sentence</strong>：${renderClickableText(item.sentence)}</p>
        ${item.translation ? `<p>${escapeHtml(item.translation)}</p>` : ""}
        ${(item.points || [item.structure, item.focus, item.pattern]).filter(Boolean).map(point => `<p>${escapeHtml(point)}</p>`).join("")}
      </article>
    `)
    .join("");

  elements.practiceList.innerHTML = note.practiceSteps
    .map((step) => `<li><strong>${escapeHtml(step.title)}｜${escapeHtml(step.time)}</strong><br>${escapeHtml(step.detail || step.description || "")}</li>`)
    .join("");
}

function renderSource(source) {
  if (!source?.url) {
    return '<p class="translation">视频来源：无可靠公开视频来源，本日文本为原创。</p>';
  }
  return `<p class="translation">参考来源：<a class="sourceLink" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a></p>`;
}

function openWord(word) {
  elements.dialogTerm.textContent = word.term;
  elements.dialogPhonetic.textContent = word.phonetic || "/待补充/";
  elements.dialogMeaning.textContent = word.meaning || "这个词还没有收录在当天词库里。";
  elements.dialogExample.innerHTML = renderClickableText(word.example || "This word will be added to the daily glossary when it appears in a key sentence.");
  elements.dialogChineseExample.textContent = word.chineseExample || "当这个词出现在重点句中时，会补充到每日词库。";
  elements.dialog.dataset.term = word.term || "";
  elements.dialog.dataset.example = word.example || "";
  if (!elements.dialog.open) {
    elements.dialog.showModal();
  }
}

async function openTerm(term) {
  const key = normalizeTerm(term);
  const word = findDictionaryEntry(key) || findCachedWord(key);

  if (word) {
    openWord({
      ...word,
      term,
      example: word.example || findContextExample(term),
      chineseExample: word.chineseExample || `在原文中，“${term}”表示“${word.meaning}”。`,
    });
    return;
  }

  openWord(buildLoadingWord(term));
  const remoteWord = await lookupRemoteWord(term);
  if (!remoteWord) {
    if (normalizeTerm(elements.dialog.dataset.term) === key) {
      openWord(buildFallbackWord(term));
    }
    return;
  }

  addEntry(state.dictionary, term, remoteWord);
  cacheWord(key, remoteWord);
  if (normalizeTerm(elements.dialog.dataset.term) === key) {
    openWord(remoteWord);
  }
}

function findDictionaryEntry(key) {
  return getDictionaryVariants(key)
    .map((variant) => state.dictionary.get(variant))
    .find(Boolean);
}

function buildDictionary(note) {
  const dictionary = new Map();
  Object.entries(window.HMI_LOCAL_DICTIONARY || {}).forEach(([term, value]) => {
    const [phonetic, meaning, partOfSpeech, example, chineseExample, sourceUrl] = value;
    addEntry(dictionary, term, {
      term,
      phonetic,
      meaning,
      partOfSpeech,
      example,
      chineseExample,
      sourceUrl,
    });
  });
  COMMON_WORDS.forEach((entry) => addEntry(dictionary, entry.term, entry));
  [...(note.words || []), ...(note.glossary || [])].forEach((entry) => {
    if (!entry?.term) return;
    addEntry(dictionary, entry.term, entry);
  });
  state.clickableTerms = buildClickableTerms(dictionary);
  return dictionary;
}

function addEntry(dictionary, term, entry) {
  dictionary.set(normalizeTerm(term), entry);
}

function normalizeTerm(term = "") {
  return String(term)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9-]+/g, " ")
    .trim();
}

function getDictionaryVariants(key) {
  const variants = [key];
  const words = key.split(" ");
  const lastWord = words.at(-1) || "";

  getWordVariants(lastWord)
    .filter(Boolean)
    .forEach((variant) => {
      variants.push([...words.slice(0, -1), variant].join(" "));
    });

  return [...new Set(variants)];
}

function getWordVariants(word) {
  const variants = [];

  if (word.endsWith("ies") && word.length > 4) variants.push(`${word.slice(0, -3)}y`);
  if (word.endsWith("ves") && word.length > 4) variants.push(`${word.slice(0, -3)}f`, `${word.slice(0, -3)}fe`);
  if (word.endsWith("es") && word.length > 3) variants.push(word.slice(0, -1), word.slice(0, -2));
  if (word.endsWith("s") && word.length > 3) variants.push(word.slice(0, -1));
  if (word.endsWith("ing") && word.length > 5) variants.push(word.slice(0, -3), `${word.slice(0, -3)}e`);
  if (word.endsWith("ed") && word.length > 4) variants.push(word.slice(0, -2), `${word.slice(0, -2)}e`);
  if (word.endsWith("ly") && word.length > 4) variants.push(word.slice(0, -2));
  if (word.endsWith("er") && word.length > 4) variants.push(word.slice(0, -2), `${word.slice(0, -1)}e`);
  if (word.endsWith("est") && word.length > 5) variants.push(word.slice(0, -3), `${word.slice(0, -2)}e`);

  const withoutIng = word.slice(0, -3);
  if (word.endsWith("ing") && /(.)\1$/.test(withoutIng)) variants.push(withoutIng.slice(0, -1));
  const withoutEd = word.slice(0, -2);
  if (word.endsWith("ed") && /(.)\1$/.test(withoutEd)) variants.push(withoutEd.slice(0, -1));

  return variants;
}

function buildLoadingWord(term) {
  const example = findContextExample(term);
  return {
    term,
    phonetic: "/正在查询/",
    meaning: "正在从免费词典中查询中文意思、音标和例句……",
    example,
    chineseExample: "查询完成后，这里会显示对应的中文解释。",
  };
}

function buildFallbackWord(term) {
  const example = findContextExample(term);
  return {
    term,
    phonetic: "/暂无音标/",
    meaning: "免费词典暂时没有返回这个词的释义。你仍然可以播放发音，网站会在后续每日更新中继续补齐。",
    example,
    chineseExample: `原文中包含 “${term}”；可结合上下文理解。`,
  };
}

const REMOTE_CACHE_KEY = "hmi-dictionary-cache-v2";

function findCachedWord(key) {
  try {
    const cache = JSON.parse(localStorage.getItem(REMOTE_CACHE_KEY) || "{}");
    return cache[key] || null;
  } catch {
    return null;
  }
}

function cacheWord(key, word) {
  try {
    const cache = JSON.parse(localStorage.getItem(REMOTE_CACHE_KEY) || "{}");
    cache[key] = word;
    const entries = Object.entries(cache);
    const trimmed = entries.length > 300 ? Object.fromEntries(entries.slice(-300)) : cache;
    localStorage.setItem(REMOTE_CACHE_KEY, JSON.stringify(trimmed));
  } catch {
    // Private browsing can disable localStorage; lookup still works for this session.
  }
}

async function lookupRemoteWord(term) {
  const query = String(term).trim();
  if (!query) return null;

  const dictionaryUrl = `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(query)}?translations=true`;
  const dictionaryData = await fetchJsonWithTimeout(dictionaryUrl).catch(() => null);
  const entry = dictionaryData?.entries?.find((item) => item.language?.code === "en") || dictionaryData?.entries?.[0];
  const sense = entry?.senses?.find((item) => item.examples?.length) || entry?.senses?.[0];
  const phonetic = entry?.pronunciations?.find((item) => item.type === "ipa")?.text || "/暂无音标/";
  const translationTerm = extractLemma(entry) || query;
  const translationUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(translationTerm)}&langpair=en%7Czh-CN`;
  const translationData = await fetchJsonWithTimeout(translationUrl).catch(() => null);
  const translatedText = translationData?.responseData?.translatedText?.trim();

  if (!entry && !translatedText) return null;

  const meaning = translatedText
    ? `${formatPartOfSpeech(entry?.partOfSpeech)}${translatedText}`
    : `${formatPartOfSpeech(entry?.partOfSpeech)}${sense?.definition || "可结合原文语境理解。"}`;
  const example = sense?.examples?.[0] || findContextExample(query);

  return {
    term: query,
    phonetic,
    meaning,
    example,
    chineseExample: `在这句话中，“${query}”可理解为“${translatedText || meaning}”。`,
    sourceUrl: dictionaryData?.source?.url || "https://freedictionaryapi.com/",
  };
}

function extractLemma(entry) {
  const formSense = entry?.senses?.find((sense) => sense.tags?.includes("form of"));
  const match = formSense?.definition?.match(/\bof ([A-Za-z][A-Za-z'-]*)[.!;]?$/i);
  return match?.[1] || "";
}

async function fetchJsonWithTimeout(url, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Dictionary lookup failed: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
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

function findContextExample(term) {
  const note = state.active;
  const candidates = [
    ...(note?.words || []).map((word) => word.example),
    ...(note?.sentenceBreakdowns || []).map((item) => item.sentence),
    ...(note?.longReadings || []).flatMap((reading) => splitSentences(reading.text)),
  ].filter(Boolean);
  const pattern = new RegExp(`(^|[^A-Za-z])${escapeRegExp(term)}(?=$|[^A-Za-z])`, "i");
  return candidates.find((candidate) => pattern.test(candidate)) || `${term} appears in today's HMI learning text.`;
}

function splitSentences(text = "") {
  return String(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()) || [];
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderClickableText(text = "") {
  const source = String(text);
  const tokens = tokenizeText(source);
  const parts = [];
  let cursor = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const match = findClickableTerm(tokens, index, source);
    const tokenCount = match?.tokenCount || 1;

    for (let offset = 0; offset < tokenCount; offset += 1) {
      const token = tokens[index + offset];
      parts.push(escapeHtml(source.slice(cursor, token.start)));
      const label = source.slice(token.start, token.end);
      const phraseAttrs = match?.tokenCount > 1
        ? ` data-phrase="${escapeHtml(match.term)}" title="所在短语：${escapeHtml(match.term)}"`
        : "";
      const phraseClass = match?.tokenCount > 1 ? " phraseWord" : "";
      parts.push(`<button class="inlineWord${phraseClass}" type="button" data-term="${escapeHtml(token.text)}"${phraseAttrs}>${escapeHtml(label)}</button>`);
      cursor = token.end;
    }

    index += tokenCount - 1;
  }

  parts.push(escapeHtml(source.slice(cursor)));
  return parts.join("");
}

function buildClickableTerms(dictionary) {
  return [...dictionary.values()]
    .map((entry) => {
      const tokens = normalizeTerm(entry.term).split(" ").filter(Boolean);
      return { term: entry.term, tokens };
    })
    .filter((entry) => entry.tokens.length > 0)
    .sort((a, b) => b.tokens.length - a.tokens.length || b.term.length - a.term.length);
}

function tokenizeText(text) {
  const tokens = [];
  const pattern = /[A-Za-z][A-Za-z'-]*/g;
  let match;

  while ((match = pattern.exec(text))) {
    tokens.push({
      text: match[0],
      norm: normalizeTerm(match[0]),
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return tokens;
}

function findClickableTerm(tokens, index, source) {
  for (const entry of state.clickableTerms) {
    if (!doesTermMatch(tokens, index, entry.tokens, source)) continue;
    return {
      term: entry.term,
      tokenCount: entry.tokens.length,
      start: tokens[index].start,
      end: tokens[index + entry.tokens.length - 1].end,
    };
  }

  return null;
}

function doesTermMatch(tokens, index, termTokens, source) {
  if (index + termTokens.length > tokens.length) return false;

  for (let offset = 0; offset < termTokens.length; offset += 1) {
    const token = tokens[index + offset];
    if (token.norm !== termTokens[offset]) return false;

    if (offset > 0) {
      const previous = tokens[index + offset - 1];
      const separator = source.slice(previous.end, token.start);
      if (!/^[\s-]+$/.test(separator)) return false;
    }
  }

  return true;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

elements.dialogClose.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) {
    elements.dialog.close();
  }
});

document.addEventListener("click", (event) => {
  const speakTarget = event.target.closest("[data-speak]");
  if (speakTarget) {
    event.preventDefault();
    event.stopPropagation();
    speakEnglish(speakTarget.dataset.speak);
    return;
  }

  const readingTarget = event.target.closest("[data-speak-reading]");
  if (readingTarget) {
    event.preventDefault();
    const reading = state.active?.longReadings?.[0];
    speakEnglish(reading?.text || "");
    return;
  }

  const stopTarget = event.target.closest("[data-stop-speaking]");
  if (stopTarget) {
    event.preventDefault();
    stopSpeaking();
    return;
  }

  const target = event.target.closest(".inlineWord");
  if (!target) return;
  event.preventDefault();
  event.stopPropagation();
  openTerm(target.dataset.term);
});

elements.refreshButton.addEventListener("click", () => {
  stopSpeaking();
  const url = new URL(window.location.href);
  url.searchParams.set("refresh", Date.now().toString());
  window.location.replace(url.toString());
});

elements.dialogSpeakTerm.addEventListener("click", () => {
  speakEnglish(elements.dialog.dataset.term || elements.dialogTerm.textContent);
});

elements.dialogSpeakExample.addEventListener("click", () => {
  speakEnglish(elements.dialog.dataset.example || elements.dialogExample.textContent);
});

function speakEnglish(text = "") {
  const cleanText = String(text).trim();
  if (!cleanText || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "en-US";
  utterance.rate = cleanText.split(/\s+/).length > 12 ? 0.88 : 0.82;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

const BASIC_WORDS = [
  ["the", "/ðə/", "这个/该；英语中最常见的定冠词，用来指已知或特定对象。", "The system should explain the next action.", "系统应该解释下一步动作。"],
  ["a", "/ə/", "一个；不定冠词，用来指单个但不特定的对象。", "A prompt should be easy to understand.", "一个提示应该容易理解。"],
  ["an", "/ən/", "一个；用于元音音素前的不定冠词。", "An alert should match the risk level.", "一个提醒应该匹配风险等级。"],
  ["and", "/ænd/", "和；用于连接并列信息。", "The screen shows speed and navigation.", "屏幕显示车速和导航。"],
  ["or", "/ɔːr/", "或者；用于表示选择。", "The driver can confirm or cancel the action.", "驾驶员可以确认或取消该动作。"],
  ["of", "/əv/", "……的；表示所属、组成或关系。", "The level of detail should match the task.", "细节程度应该匹配任务。"],
  ["to", "/tuː/", "到；用于表示方向、目的或动作目标。", "The interface guides the driver to the next step.", "界面引导驾驶员进入下一步。"],
  ["in", "/ɪn/", "在……中；表示位置、状态或场景。", "The warning appears in the driver display.", "警告出现在驾驶员显示区。"],
  ["on", "/ɑːn/", "在……上；表示位置、设备或状态。", "The message appears on the center display.", "消息出现在中控屏上。"],
  ["for", "/fɔːr/", "为了；表示目的、对象或适用场景。", "The flow is designed for quick confirmation.", "这个流程是为快速确认设计的。"],
  ["from", "/frʌm/", "来自；表示来源、起点或差异。", "Feedback from the system should be clear.", "来自系统的反馈应该清晰。"],
  ["with", "/wɪð/", "带有；和……一起；表示方式或伴随。", "The prompt works with voice feedback.", "该提示配合语音反馈工作。"],
  ["by", "/baɪ/", "通过；表示方式、原因或执行者。", "The driver can respond by voice.", "驾驶员可以通过语音回应。"],
  ["as", "/æz/", "作为；当……时；用于角色或比较。", "The alert acts as a safety reminder.", "该提醒作为安全提示。"],
  ["is", "/ɪz/", "是；be 动词现在时，用于说明状态。", "The message is short and clear.", "这条消息简短清晰。"],
  ["are", "/ɑːr/", "是；be 动词复数形式。", "The controls are easy to reach.", "这些控制项容易触达。"],
  ["be", "/biː/", "是；成为；be 动词原形。", "The feedback should be noticeable.", "反馈应该能被注意到。"],
  ["it", "/ɪt/", "它；指代前面提到的事物或系统。", "It should not distract the driver.", "它不应该分散驾驶员注意力。"],
  ["this", "/ðɪs/", "这个；指当前正在讨论的对象。", "This flow reduces visual demand.", "这个流程降低视觉需求。"],
  ["that", "/ðæt/", "那个；也可引导从句。", "The system shows that the command was recognized.", "系统显示指令已被识别。"],
  ["these", "/ðiːz/", "这些；this 的复数。", "These cues help the driver recover.", "这些提示帮助驾驶员恢复状态。"],
  ["they", "/ðeɪ/", "它们/他们；指代多个对象。", "They should appear only when relevant.", "它们应该只在相关时出现。"],
  ["not", "/nɑːt/", "不；用于否定。", "The alert should not feel aggressive.", "提醒不应该让人感觉强硬。"],
  ["if", "/ɪf/", "如果；用于表达条件。", "If the risk increases, the warning should escalate.", "如果风险增加，警告应该升级。"],
  ["but", "/bʌt/", "但是；用于转折。", "The feature is useful, but it needs clear consent.", "这个功能有用，但需要清晰授权。"],
  ["only", "/ˈoʊnli/", "只；仅仅。", "Only critical information should interrupt the driver.", "只有关键信息才应该打断驾驶员。"],
  ["also", "/ˈɔːlsoʊ/", "也；此外。", "The system also provides voice feedback.", "系统也提供语音反馈。"],
  ["because", "/bɪˈkɔːz/", "因为；用于说明原因。", "The prompt is delayed because the driver is turning.", "提示被延后，因为驾驶员正在转弯。"],
  ["whether", "/ˈweðər/", "是否；用于表达不确定选择或判断。", "The cockpit decides whether to show the prompt now.", "座舱判断是否现在显示提示。"],
  ["what", "/wʌt/", "什么；用于询问信息或引导从句。", "The driver should know what the system understood.", "驾驶员应该知道系统理解了什么。"],
  ["why", "/waɪ/", "为什么；用于询问或说明原因。", "The message explains why the alert appeared.", "消息解释警告为什么出现。"],
  ["which", "/wɪtʃ/", "哪一个；用于选择或限定。", "The UI shows which option is selected.", "界面显示哪个选项被选中。"],
  ["may", "/meɪ/", "可能；可以；表示可能性或许可。", "The driver may miss a subtle warning.", "驾驶员可能会错过不明显的警告。"],
  ["make", "/meɪk/", "使；制作；让某事发生。", "Clear labels make the flow easier to follow.", "清晰标签让流程更容易理解。"],
  ["help", "/help/", "帮助；支持用户完成目标。", "Good feedback helps the driver recover.", "好的反馈帮助驾驶员恢复。"],
  ["decide", "/dɪˈsaɪd/", "决定；在多个选项中作出判断。", "The system must decide when to interrupt.", "系统必须决定何时打断。"],
  ["reduce", "/rɪˈduːs/", "减少；降低负荷、风险或干扰。", "Voice feedback can reduce visual demand.", "语音反馈可以降低视觉需求。"],
  ["keep", "/kiːp/", "保持；使某状态持续。", "The layout should keep key information visible.", "布局应该保持关键信息可见。"],
  ["ask", "/æsk/", "询问；请求用户确认或输入。", "The assistant can ask for confirmation.", "助手可以请求确认。"],
  ["show", "/ʃoʊ/", "显示；把信息呈现给用户。", "The display should show the current mode.", "显示区应该显示当前模式。"],
  ["use", "/juːz/", "使用；采用某种方式或功能。", "The driver can use voice control.", "驾驶员可以使用语音控制。"],
  ["provide", "/prəˈvaɪd/", "提供；向用户给出信息或能力。", "The cockpit should provide clear feedback.", "座舱应该提供清晰反馈。"],
  ["support", "/səˈpɔːrt/", "支持；帮助某任务或目标完成。", "The interface should support safe driving.", "界面应该支持安全驾驶。"],
  ["clear", "/klɪr/", "清晰的；容易理解或识别的。", "A clear prompt reduces hesitation.", "清晰提示能减少犹豫。"],
  ["simple", "/ˈsɪmpl/", "简单的；不复杂、易理解。", "Simple wording works better under pressure.", "压力下简单措辞效果更好。"],
  ["short", "/ʃɔːrt/", "短的；简短的。", "A short message is easier to scan.", "简短消息更容易扫视。"],
  ["good", "/ɡʊd/", "好的；有效、合适或高质量的。", "Good timing makes feedback more acceptable.", "好的时机让反馈更容易被接受。"],
  ["useful", "/ˈjuːsfl/", "有用的；能帮助完成任务。", "The suggestion is useful only in the right context.", "建议只有在合适情境下才有用。"],
  ["critical", "/ˈkrɪtɪkl/", "关键的；对安全或任务结果非常重要。", "Critical warnings need higher visual priority.", "关键警告需要更高视觉优先级。"],
  ["current", "/ˈkɜːrənt/", "当前的；现在的。", "The current mode should be visible.", "当前模式应该可见。"],
  ["same", "/seɪm/", "相同的；同一个。", "The same warning can feel different in another context.", "同一个警告在不同情境中感受会不同。"],
  ["every", "/ˈevri/", "每一个；全部个体。", "Every interaction should have a clear purpose.", "每个交互都应该有清晰目的。"],
  ["one", "/wʌn/", "一个；用于指代单个对象。", "One clear choice is better than many unclear options.", "一个清晰选择比多个模糊选项更好。"],
  ["long", "/lɔːŋ/", "长的；持续时间或内容较多。", "A long explanation should not appear while driving.", "驾驶时不应出现长解释。"],
  ["road", "/roʊd/", "道路；驾驶环境中的行驶空间。", "The driver should keep attention on the road.", "驾驶员应该把注意力保持在道路上。"],
  ["task", "/tæsk/", "任务；用户要完成的目标或操作。", "The task should require as few steps as possible.", "任务应尽量少步骤完成。"],
  ["action", "/ˈækʃn/", "动作；用户或系统执行的行为。", "The next action should be predictable.", "下一步动作应该可预测。"],
  ["flow", "/floʊ/", "流程；用户完成任务的步骤路径。", "The flow should support quick recovery.", "流程应该支持快速恢复。"],
  ["level", "/ˈlevl/", "级别；强度、层级或程度。", "The alert level should match the risk.", "提醒级别应该匹配风险。"],
  ["need", "/niːd/", "需要；必要条件或用户需求。", "Drivers need clear feedback during transitions.", "驾驶员在切换期间需要清晰反馈。"],
  ["enough", "/ɪˈnʌf/", "足够；达到需要的程度。", "The cue should be strong enough to notice.", "提示应该足够明显，能被注意到。"],
  ["still", "/stɪl/", "仍然；表示状态持续。", "The feature should still work if cloud sync is off.", "云同步关闭时，该功能仍应可用。"],
  ["before", "/bɪˈfɔːr/", "在……之前。", "The system should warn before the risk becomes critical.", "系统应在风险变关键前提醒。"],
  ["after", "/ˈæftər/", "在……之后。", "Detailed information can appear after control is regained.", "详细信息可在重新控制后出现。"],
  ["during", "/ˈdʊrɪŋ/", "在……期间。", "Noncritical prompts should be delayed during lane changes.", "变道期间应延后非关键提示。"],
  ["while", "/waɪl/", "当……期间；同时。", "The interface should stay simple while driving.", "驾驶时界面应保持简单。"],
  ["more", "/mɔːr/", "更多；更……。", "More information is not always better.", "更多信息并不总是更好。"],
  ["high", "/haɪ/", "高的；强度、优先级或数量较高。", "High-priority alerts should be easy to notice.", "高优先级提醒应该容易被注意到。"],
  ["low", "/loʊ/", "低的；强度、优先级或数量较低。", "Low-risk reminders can stay quiet.", "低风险提醒可以保持安静。"],
  ["important", "/ɪmˈpɔːrtnt/", "重要的；值得优先考虑的。", "Important information should appear first.", "重要信息应该优先出现。"]
];

const COMMON_WORDS = [
  {
    term: "interface",
    phonetic: "/ˈɪntərfeɪs/",
    meaning: "界面；用户与系统交互的可见或可操作层。",
    example: "The interface should keep critical driving information easy to scan.",
    chineseExample: "界面应让关键驾驶信息易于扫视。"
  },
  {
    term: "vehicle",
    phonetic: "/ˈviːəkl/",
    meaning: "车辆；汽车或交通工具。",
    example: "The vehicle status should be visible without extra navigation.",
    chineseExample: "车辆状态应无需额外跳转就能看见。"
  },
  {
    term: "driver",
    phonetic: "/ˈdraɪvər/",
    meaning: "驾驶员。",
    example: "The driver needs clear feedback after each command.",
    chineseExample: "驾驶员在每次指令后都需要清晰反馈。"
  },
  {
    term: "screen",
    phonetic: "/skriːn/",
    meaning: "屏幕；车机、中控、仪表或 HUD 的显示区域。",
    example: "The screen should not show too many choices while driving.",
    chineseExample: "驾驶时屏幕不应显示过多选项。"
  },
  {
    term: "system",
    phonetic: "/ˈsɪstəm/",
    meaning: "系统；由界面、功能、反馈和逻辑组成的整体。",
    example: "The system adapts its layout to the driving context.",
    chineseExample: "系统会根据驾驶情境调整布局。"
  },
  {
    term: "feedback",
    phonetic: "/ˈfiːdbæk/",
    meaning: "反馈；系统对用户操作给出的回应。",
    example: "Immediate feedback helps the user confirm the action.",
    chineseExample: "即时反馈帮助用户确认操作。"
  },
  {
    term: "navigation",
    phonetic: "/ˌnævɪˈɡeɪʃn/",
    meaning: "导航；路线、转向、车道和目的地相关信息。",
    example: "Navigation prompts should be glanceable at intersections.",
    chineseExample: "路口处的导航提示应具备一瞥可读性。"
  },
  {
    term: "control",
    phonetic: "/kənˈtroʊl/",
    meaning: "控制项；用于调节或操作功能的入口。",
    example: "Frequently used controls should be easy to reach.",
    chineseExample: "高频控制项应容易触达。"
  },
  {
    term: "attention",
    phonetic: "/əˈtenʃn/",
    meaning: "注意力；驾驶员用于观察、判断和操作的心理资源。",
    example: "The design should protect the driver's attention.",
    chineseExample: "设计应保护驾驶员注意力。"
  },
  {
    term: "safety",
    phonetic: "/ˈseɪfti/",
    meaning: "安全；避免风险、误操作和注意力分散的设计目标。",
    example: "Safety should guide the priority of cockpit alerts.",
    chineseExample: "安全应指导座舱提醒的优先级。"
  },
  {
    term: "design",
    phonetic: "/dɪˈzaɪn/",
    meaning: "设计；为用户目标、使用情境和系统能力组织体验方案。",
    example: "The design should make the next action clear.",
    chineseExample: "设计应让下一步动作清晰。"
  },
  {
    term: "context",
    phonetic: "/ˈkɑːntekst/",
    meaning: "情境；道路、任务、用户状态和系统状态的组合。",
    example: "Context changes how the same message should be presented.",
    chineseExample: "情境会改变同一消息的呈现方式。"
  },
  {
    term: "risk",
    phonetic: "/rɪsk/",
    meaning: "风险；可能影响安全、理解或操作结果的情况。",
    example: "The interface should make high-risk states easy to notice.",
    chineseExample: "界面应让高风险状态容易被注意到。"
  },
  {
    term: "alert",
    phonetic: "/əˈlɜːrt/",
    meaning: "提醒；用于引起注意或提示风险的信息。",
    example: "An alert should explain what the driver should do next.",
    chineseExample: "提醒应说明驾驶员下一步该做什么。"
  },
  {
    term: "prompt",
    phonetic: "/prɑːmpt/",
    meaning: "提示；引导用户理解状态或完成下一步动作的信息。",
    example: "The prompt should be short enough to understand at a glance.",
    chineseExample: "提示应足够简短，能一眼理解。"
  },
  {
    term: "confirm",
    phonetic: "/kənˈfɜːrm/",
    meaning: "确认；让用户明确同意、核对或完成某个动作。",
    example: "The driver can confirm the destination by voice.",
    chineseExample: "驾驶员可以通过语音确认目的地。"
  },
  {
    term: "should",
    phonetic: "/ʃʊd/",
    meaning: "应该；用于表达设计建议、原则或评审结论。",
    example: "The message should appear only when it is relevant.",
    chineseExample: "这条消息应该只在相关时出现。"
  },
  {
    term: "can",
    phonetic: "/kæn/",
    meaning: "可以；用于说明能力、可能性或设计效果。",
    example: "Voice feedback can reduce visual demand.",
    chineseExample: "语音反馈可以降低视觉需求。"
  },
  {
    term: "when",
    phonetic: "/wen/",
    meaning: "当……时；用于连接场景条件和设计动作。",
    example: "The system should simplify choices when the vehicle is moving.",
    chineseExample: "车辆行驶时，系统应简化选项。"
  },
  {
    term: "without",
    phonetic: "/wɪˈðaʊt/",
    meaning: "在不……的情况下；常用于表达设计约束。",
    example: "The alert should create urgency without causing panic.",
    chineseExample: "提醒应制造紧迫感，但不引发恐慌。"
  },
  ...BASIC_WORDS.map(([term, phonetic, meaning, example, chineseExample]) => ({
    term,
    phonetic,
    meaning,
    example,
    chineseExample,
  }))
];

loadNotes().then(() => {
  mountReview({ notes: state.notes, escapeHtml, renderClickableText, speakEnglish, stopSpeaking });
  const review = document.querySelector("#reviewPanel");
  const lesson = document.querySelector("#lessonPanel");
  function selectView(isReview) {
    stopSpeaking();
    review.hidden = !isReview;
    lesson.hidden = isReview;
    document.querySelector("#reviewTab").setAttribute("aria-pressed", String(isReview));
    document.querySelector("#lessonTab").setAttribute("aria-pressed", String(!isReview));
    elements.dateSelect.hidden = isReview;
  }
  document.querySelector("#reviewTab").addEventListener("click", () => selectView(true));
  document.querySelector("#lessonTab").addEventListener("click", () => selectView(false));
  selectView(true);
}).catch((error) => {
  document.body.innerHTML = `<main class="layout"><section class="hero"><h1>内容加载失败</h1><p>${escapeHtml(error.message)}</p></section></main>`;
});
