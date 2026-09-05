import { dayKey } from "./review-engine.mjs?v=20260905b";

export function mountLibrary({ deck, getData, esc }) {
  const root = document.querySelector("#libraryPanel");
  let query = "", type = "all", filter = "all", sort = "default", page = 0;
  const status = card => !card ? "未学习" : card.lastGrade === "forgot" ? "待重学" : card.lastGrade === "vague" ? "模糊" : card.level >= 3 ? "较熟悉" : "认识";
  const date = value => value ? new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
  function render(keepFocus = false) {
    const cursor = keepFocus ? root.querySelector("#librarySearch")?.selectionStart : null;
    const data = getData();
    let items = deck.filter(item => (type === "all" || item.type === type) && `${item.text} ${item.answer} ${item.topic}`.toLowerCase().includes(query.toLowerCase()));
    items = items.filter(item => filter === "all" || (filter === "new" ? !data.cards[item.id] : filter === "due" ? data.cards[item.id]?.due <= Date.now() : data.cards[item.id]?.lastGrade === filter));
    if (sort !== "default") items.sort((a,b) => (data.stats[b.id]?.[sort] || 0) - (data.stats[a.id]?.[sort] || 0));
    page = Math.min(page, Math.max(0, Math.ceil(items.length / 20) - 1));
    const learned = deck.filter(item => data.cards[item.id]).length;
    root.innerHTML = `<div class="reviewHeading"><div><p class="eyebrow">${dayKey()}</p><h2>我的词库</h2><p class="reviewSub">全部 ${deck.length} 项 · 已学习 ${learned} 项 · 待学习 ${deck.length - learned} 项</p></div></div>
      <div class="libraryFilters"><input id="librarySearch" type="search" aria-label="搜索词库" placeholder="搜索英文、中文、主题" value="${esc(query)}">
      <select id="libraryType" aria-label="词库类型">${options({all:"全部类型",word:"词组与单词",sentence:"句子"},type)}</select>
      <select id="libraryFilter" aria-label="记忆状态">${options({all:"全部状态",new:"未学习",due:"到期复习",forgot:"忘记",vague:"模糊",known:"认识"},filter)}</select>
      <select id="librarySort" aria-label="排序">${options({default:"课程顺序",forgot:"忘记次数最多",shown:"出现次数最多",lastSeen:"最近出现"},sort)}</select></div>
      <p class="libraryNote">次数从本次更新起记录；出现次数按复习出题计，刷新与查看词库不重复计数。旧记录保留记忆状态。</p>
      <div class="libraryTableWrap"><table class="libraryTable"><thead><tr><th>学习内容</th><th>记忆状态</th><th>出现</th><th>忘记</th><th>模糊</th><th>认识</th><th>出现频率</th><th>最近出现 / 下次复习</th></tr></thead><tbody>${items.slice(page*20,page*20+20).map(item => {
        const card = data.cards[item.id], stats = data.stats[item.id];
        const days = stats?.firstSeen ? Math.max(1, Math.floor((Date.now() - stats.firstSeen) / 86400000) + 1) : 0;
        return `<tr><td><strong>${esc(item.text)}</strong><p>${esc(item.answer)}</p><button class="iconTextButton" type="button" data-speak="${esc(item.text)}">朗读</button>${stats?.partial ? '<small>含旧版学习记录</small>' : ""}</td><td><span class="memoryState">${status(card)}</span>${card ? `<small>记忆等级 ${card.level}/5</small>` : ""}</td>${["shown","forgot","vague","known"].map(key => `<td>${stats?.[key] || 0}</td>`).join("")}<td>${days ? (stats.shown / days).toFixed(1) + " 次/天" : "—"}</td><td>${date(stats?.lastSeen)}<small>${card ? card.due <= Date.now() ? "已到期" : dayKey(new Date(card.due)) : "尚未安排"}</small></td></tr>`;
      }).join("") || '<tr><td colspan="8">没有找到符合条件的内容。</td></tr>'}</tbody></table></div>
      <div class="libraryPager"><button type="button" class="iconTextButton" id="libraryPrev" ${page === 0 ? "disabled" : ""}>上一页</button><span>共 ${items.length} 项 · ${page + 1} / ${Math.max(1,Math.ceil(items.length/20))} 页</span><button type="button" class="iconTextButton" id="libraryNext" ${(page+1)*20 >= items.length ? "disabled" : ""}>下一页</button></div>`;
    const search = root.querySelector("#librarySearch");
    const updateSearch = event => { if (event.isComposing) return; query = event.target.value; page = 0; render(true); };
    search.addEventListener("input", updateSearch);
    search.addEventListener("compositionend", updateSearch);
    root.querySelector("#libraryType").addEventListener("change", event => { type = event.target.value; page = 0; render(); });
    root.querySelector("#libraryFilter").addEventListener("change", event => { filter = event.target.value; page = 0; render(); });
    root.querySelector("#librarySort").addEventListener("change", event => { sort = event.target.value; page = 0; render(); });
    root.querySelector("#libraryPrev").addEventListener("click", () => { page--; render(); });
    root.querySelector("#libraryNext").addEventListener("click", () => { page++; render(); });
    if (keepFocus) { search.focus(); if (cursor !== null) search.setSelectionRange(cursor, cursor); }
  }
  function options(values, selected) { return Object.entries(values).map(([value,label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`).join(""); }
  document.querySelector("#libraryTab").addEventListener("click", () => render());
  window.addEventListener("storage", () => { if (!root.hidden) render(); });
}
