import { readFile } from "node:fs/promises";

const requiredNoteFields = [
  "id",
  "date",
  "title",
  "topic",
  "suggestedTime",
  "summary",
  "words",
  "longReadings",
  "sentenceBreakdowns",
  "practiceSteps",
];

const requiredWordFields = ["term", "phonetic", "meaning", "example", "chineseExample"];

const raw = await readFile(new URL("../data/hmi-notes.json", import.meta.url), "utf8");
const notes = JSON.parse(raw);

if (!Array.isArray(notes) || notes.length === 0) {
  throw new Error("data/hmi-notes.json must contain at least one note.");
}

for (const note of notes) {
  for (const field of requiredNoteFields) {
    if (!note[field]) {
      throw new Error(`${note.id || "Unknown note"} is missing ${field}.`);
    }
  }

  if (!Array.isArray(note.words) || note.words.length < 8) {
    throw new Error(`${note.id} must include at least 8 words.`);
  }

  for (const word of note.words) {
    for (const field of requiredWordFields) {
      if (!word[field]) {
        throw new Error(`${note.id} has an incomplete word item.`);
      }
    }
  }

  if (!Array.isArray(note.longReadings) || !note.longReadings[0]?.text || !note.longReadings[0]?.translation) {
    throw new Error(`${note.id} must include a bilingual long reading.`);
  }

  if (!Array.isArray(note.sentenceBreakdowns) || note.sentenceBreakdowns.length < 3) {
    throw new Error(`${note.id} must include at least 3 sentence breakdowns.`);
  }

  if (!Array.isArray(note.practiceSteps) || note.practiceSteps.length < 4) {
    throw new Error(`${note.id} must include at least 4 practice steps.`);
  }
}

console.log(`Validated ${notes.length} HMI English note(s).`);
