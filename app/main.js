const state = {
  notes: [],
  active: null,
  dictionary: new Map(),
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
        <b>例句</b>
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
        <p><strong>Structure</strong>：${escapeHtml(item.structure)}</p>
        <p><strong>Focus</strong>：${escapeHtml(item.focus)}</p>
        <p><strong>Pattern</strong>：${escapeHtml(item.pattern)}</p>
      </article>
    `)
    .join("");

  elements.practiceList.innerHTML = note.practiceSteps
    .map((step) => `<li><strong>${escapeHtml(step.title)}｜${escapeHtml(step.time)}</strong><br>${escapeHtml(step.detail)}</li>`)
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
  elements.dialogExample.textContent = word.example || "This word will be added to the daily glossary when it appears in a key sentence.";
  elements.dialogChineseExample.textContent = word.chineseExample || "当这个词出现在重点句中时，会补充到每日词库。";
  elements.dialog.dataset.term = word.term || "";
  elements.dialog.dataset.example = word.example || "";
  elements.dialog.showModal();
}

function openTerm(term) {
  const key = normalizeTerm(term);
  const word = state.dictionary.get(key) || buildFallbackWord(term);
  openWord(word);
}

function buildDictionary(note) {
  const dictionary = new Map();
  [...(note.words || []), ...(note.glossary || [])].forEach((entry) => {
    if (!entry?.term) return;
    addEntry(dictionary, entry.term, entry);
    entry.term
      .split(/[\s/-]+/)
      .filter((part) => part.length > 2)
      .forEach((part) => addEntry(dictionary, part, {
        ...entry,
        term: part,
        meaning: `${part}：来自短语 “${entry.term}”。${entry.meaning}`,
      }));
  });
  COMMON_WORDS.forEach((entry) => addEntry(dictionary, entry.term, entry));
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

function buildFallbackWord(term) {
  return {
    term,
    phonetic: "/待补充/",
    meaning: "这个词暂未收录在今天的详细词库里。每日更新任务会优先补充长文和例句里的重点词。",
    example: `${term} appears in today's HMI learning context.`,
    chineseExample: `${term} 出现在今天的 HMI 学习语境中。`,
  };
}

function renderClickableText(text = "") {
  const source = String(text);
  const parts = [];
  let cursor = 0;
  const pattern = /[A-Za-z][A-Za-z'-]*/g;
  let match;

  while ((match = pattern.exec(source))) {
    parts.push(escapeHtml(source.slice(cursor, match.index)));
    const word = match[0];
    parts.push(`<button class="inlineWord" type="button" data-term="${escapeHtml(word)}">${escapeHtml(word)}</button>`);
    cursor = match.index + word.length;
  }

  parts.push(escapeHtml(source.slice(cursor)));
  return parts.join("");
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
  }
];

loadNotes().catch((error) => {
  document.body.innerHTML = `<main class="layout"><section class="hero"><h1>内容加载失败</h1><p>${escapeHtml(error.message)}</p></section></main>`;
});
