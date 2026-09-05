export const STORAGE_KEY = "hmi-review-v1";
const intervals = [1, 3, 7, 14, 30];

export function dayKey(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function emptyProgress() {
  return { version: 1, settings: { word: 8, sentence: 2 }, cards: {}, sessions: {}, history: {} };
}

export function parseProgress(raw) {
  if (!raw) return emptyProgress();
  const data = JSON.parse(raw);
  if (data.version !== 1 || !data.settings || !data.cards || !data.sessions || !data.history) throw new Error("Invalid progress");
  for (const type of ["word", "sentence"]) {
    if (!Number.isInteger(data.settings[type]) || data.settings[type] < 1 || data.settings[type] > 30) throw new Error("Invalid daily goal");
    const session = data.sessions[type];
    if (session && (!Array.isArray(session.queue) || !Array.isArray(session.ids) || typeof session.day !== "string")) throw new Error("Invalid session");
  }
  for (const card of Object.values(data.cards)) {
    if (!Number.isInteger(card.level) || card.level < 0 || card.level > 5 || !Number.isFinite(card.due)) throw new Error("Invalid card");
  }
  return data;
}

export function buildDeck(notes) {
  const cards = new Map();
  const normalize = text => text.toLowerCase().replace(/\s+/g, " ").trim();
  for (const note of notes) {
    for (const word of note.words || []) {
      const id = `word:${normalize(word.term)}`;
      if (!cards.has(id)) cards.set(id, { ...word, id, type: "word", text: word.term, answer: word.meaning, topic: note.topic });
    }
    // Examples already have human-authored translations, including older lessons.
    for (const item of [...(note.sentenceBreakdowns || []).filter(item => item.translation).map(item => ({ text: item.sentence, answer: item.translation })), ...(note.words || []).map(word => ({ text: word.example, answer: word.chineseExample }))]) {
      if (!item.text || !item.answer) continue;
      const id = `sentence:${normalize(item.text)}`;
      if (!cards.has(id)) cards.set(id, { ...item, id, type: "sentence", topic: note.topic });
    }
  }
  return [...cards.values()];
}

export function ensureSession(data, deck, type, now = new Date()) {
  const day = dayKey(now);
  if (data.sessions[type]?.day === day) return data.sessions[type];
  const available = deck.filter(card => card.type === type);
  const due = available.filter(card => data.cards[card.id]?.due <= now.getTime()).sort((a, b) => data.cards[a.id].due - data.cards[b.id].due);
  const fresh = available.filter(card => !data.cards[card.id]).slice(0, data.settings[type]);
  const ids = [...due, ...fresh].map(card => card.id);
  data.sessions[type] = { day, ids, queue: [...ids] };
  return data.sessions[type];
}

export function rateCard(data, type, grade, now = new Date()) {
  if (!["known", "vague", "forgot"].includes(grade)) throw new Error("Invalid rating");
  const session = data.sessions[type];
  if (!session || session.day !== dayKey(now) || !session.queue.length) return;
  const id = session.queue.shift();
  const previous = data.cards[id] || { level: 0, due: 0 };
  const level = grade === "known" ? Math.min(previous.level + 1, 5) : grade === "forgot" ? 0 : Math.max(0, previous.level - 1);
  const due = grade === "known" ? Date.parse(`${dayKey(now)}T00:00:00+08:00`) + intervals[level - 1] * 86400000 : now.getTime();
  data.cards[id] = { level, due, lastGrade: grade };
  if (grade !== "known") session.queue.splice(Math.min(grade === "forgot" ? 2 : 4, session.queue.length), 0, id);
  const log = data.history[dayKey(now)] ||= { rated: 0, completed: [] };
  log.rated += 1;
  if (grade === "known" && !log.completed.includes(id)) log.completed.push(id);
}
