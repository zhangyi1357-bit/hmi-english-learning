import { readFile, writeFile } from "node:fs/promises";

const jsonUrl = new URL("../data/hmi-notes.json", import.meta.url);
const jsUrl = new URL("../data/hmi-notes.js", import.meta.url);

const raw = await readFile(jsonUrl, "utf8");
const notes = JSON.parse(raw);

await writeFile(jsUrl, `window.HMI_NOTES = ${JSON.stringify(notes, null, 2)};\n`);

console.log("Synced data/hmi-notes.js");
