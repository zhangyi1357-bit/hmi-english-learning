import { STORAGE_KEY, emptyProgress, parseProgress, buildDeck, ensureSession, rateCard, dayKey } from "./review-engine.mjs";

export function mountReview({ notes, escapeHtml: esc, renderClickableText, speakEnglish, stopSpeaking }) {
  const root = document.querySelector("#reviewPanel");
  const deck = buildDeck(notes);
  const lookup = new Map(deck.map(card => [card.id, card]));
  let data;
  let warning = "";
  let damaged = false;
  try { data = parseProgress(localStorage.getItem(STORAGE_KEY)); }
  catch { data = emptyProgress(); damaged = true; warning = "学习记录暂时无法读取，本次进度不会覆盖原记录。"; }
  let type = "word";
  let revealed = false;
  let undo = null;
  let currentDay = dayKey();

  function save() {
    if (damaged) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch { warning = "浏览器未能保存进度，请保持此页面打开。"; }
  }

  function render() {
    if (currentDay !== dayKey()) { currentDay = dayKey(); revealed = false; undo = null; }
    const session = ensureSession(data, deck, type);
    save();
    const card = lookup.get(session.queue[0]);
    const completed = session.ids.length - session.queue.length;
    const learned = data.history[currentDay]?.completed.length || 0;
    const count = deck.filter(item => item.type === type).length;
    root.innerHTML = `
      <div class="reviewHeading"><div><p class="eyebrow">${currentDay}</p><h2>今天，也记住一点</h2><p class="reviewSub">今日已完成 ${learned} 项 · 累计学习 ${Object.keys(data.cards).length} 项</p></div>
      <label class="goalLabel">每日新${type === "word" ? "词" : "句"}<select id="dailyGoal" aria-label="每日新学习数量">${[2, 5, 8, 10, 15, 20, 30].map(n => `<option value="${n}" ${data.settings[type] === n ? "selected" : ""}>${n} ${type === "word" ? "个" : "句"}</option>`).join("")}</select><small>下次生成任务时生效</small></label></div>
      <div class="reviewToolbar"><div class="modeTabs" aria-label="复习类型"><button type="button" data-mode="word" aria-pressed="${type === "word"}">单词</button><button type="button" data-mode="sentence" aria-pressed="${type === "sentence"}">句子</button></div><span>词库 ${count} 项 · 本轮剩余 ${session.queue.length}</span></div>
      <progress max="${session.ids.length || 1}" value="${session.ids.length ? completed : 1}" aria-label="本轮学习进度"></progress>
      ${warning ? `<p role="alert" class="storageWarning">${warning}</p>` : ""}
      <article class="studyCard" aria-label="学习卡片">
        ${card ? `<div class="studyTop"><span>${data.cards[card.id] ? "复习" : "新内容"} · ${esc(card.topic)}</span><button type="button" class="audioControl" id="reviewSpeak" aria-label="朗读当前内容" title="朗读当前内容">▶</button></div>
          <div class="studyQuestion"><h3>${revealed ? renderClickableText(card.text) : esc(card.text)}</h3>${card.phonetic ? `<p class="phonetic">${esc(card.phonetic)}</p>` : ""}</div>
          <div class="studyAnswer">${revealed ? `<p class="answerMeaning">${esc(card.answer)}</p>${card.type === "word" ? `<p class="studyExample">${renderClickableText(card.example)}</p><p class="translation">${esc(card.chineseExample)}</p><button class="iconTextButton" type="button" data-speak="${esc(card.example)}">朗读例句</button>` : ""}` : '<button class="revealButton" id="revealAnswer" type="button">查看答案</button>'}</div>
          ${revealed ? '<div class="ratingButtons"><button type="button" data-grade="forgot">忘记<small>尽快再学</small></button><button type="button" data-grade="vague">模糊<small>本轮再练</small></button><button type="button" data-grade="known">认识<small>下次复习</small></button></div>' : ""}` : `<div class="studyComplete"><p class="eyebrow">今日任务完成</p><h3>${type === "word" ? "单词" : "句子"}复习完成了</h3><p>已完成 ${completed} 项，明天继续。</p><button type="button" class="revealButton" data-mode="${type === "word" ? "sentence" : "word"}">去学${type === "word" ? "句子" : "单词"}</button></div>`}
      </article>
      <div class="reviewFooter"><button class="iconTextButton" type="button" id="undoRating" ${undo ? "" : "disabled"}>撤销上次选择</button><span>进度仅保存在此浏览器 · 无需登录</span></div>`;
    root.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => { stopSpeaking(); type = button.dataset.mode; revealed = false; undo = null; render(); }));
    root.querySelector("#dailyGoal").addEventListener("change", event => { data.settings[type] = Number(event.target.value); save(); render(); });
    root.querySelector("#reviewSpeak")?.addEventListener("click", () => speakEnglish(card.text));
    root.querySelector("#revealAnswer")?.addEventListener("click", () => { revealed = true; render(); root.querySelector("[data-grade]")?.focus(); });
    root.querySelectorAll("[data-grade]").forEach(button => button.addEventListener("click", () => {
      if (currentDay !== dayKey()) { render(); return; }
      undo = structuredClone(data);
      rateCard(data, type, button.dataset.grade);
      revealed = false;
      stopSpeaking();
      render();
      root.querySelector("#revealAnswer")?.focus();
    }));
    root.querySelector("#undoRating").addEventListener("click", () => { if (!undo) return; data = undo; undo = null; revealed = true; stopSpeaking(); render(); });
  }

  window.addEventListener("storage", event => {
    if (event.key !== STORAGE_KEY) return;
    try { data = parseProgress(event.newValue); revealed = false; undo = null; render(); }
    catch { warning = "另一页面的学习记录无法读取，请刷新后重试。"; damaged = true; render(); }
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && currentDay !== dayKey()) render(); });
  render();
}
