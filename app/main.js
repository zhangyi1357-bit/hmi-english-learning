const state = {
  notes: [],
  active: null,
};

const elements = {
  dateSelect: document.querySelector("#dateSelect"),
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
    const button = document.createElement("button");
    button.className = "wordButton";
    button.type = "button";
    button.innerHTML = `
      <strong>${escapeHtml(word.term)}</strong>
      <span>${escapeHtml(word.phonetic)}</span>
      <p>${escapeHtml(word.meaning)}</p>
    `;
    button.addEventListener("click", () => openWord(word));
    elements.wordGrid.append(button);
  });

  const reading = note.longReadings[0];
  elements.readingMeta.textContent = reading.source?.label || "原创跟读文本";
  elements.readingBlock.innerHTML = `
    <p class="readingText">${escapeHtml(reading.text)}</p>
    <p class="translation">${escapeHtml(reading.translation)}</p>
    ${renderSource(reading.source)}
  `;

  elements.breakdownList.innerHTML = note.sentenceBreakdowns
    .map((item) => `
      <article class="breakdownItem">
        <p><strong>Sentence</strong>：${escapeHtml(item.sentence)}</p>
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
  elements.dialogPhonetic.textContent = word.phonetic;
  elements.dialogMeaning.textContent = word.meaning;
  elements.dialogExample.textContent = word.example;
  elements.dialogChineseExample.textContent = word.chineseExample;
  elements.dialog.showModal();
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

loadNotes().catch((error) => {
  document.body.innerHTML = `<main class="layout"><section class="hero"><h1>内容加载失败</h1><p>${escapeHtml(error.message)}</p></section></main>`;
});
