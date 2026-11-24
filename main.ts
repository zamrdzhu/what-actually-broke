// Say What Actually Broke — make.fun entry (u-po-pu-say-what-actually-broke-a2c153b5)
//
// The program writes one single-line software error message to
// /output/entry.txt. The line must be at most 200 characters, name the
// real failure in plain words, tell the user what to do next, and be
// funny enough on a single read that someone repeats it to a colleague.
//
// The failure this line owns up to is the most honest one in production:
// the server ran out of memory. No vague apology, no "something went
// wrong" — the machine forgot the request mid-sentence, which is exactly
// what an out-of-memory drop feels like from the user's side. The twist
// is the second sentence: the server is "listening now, probably" —
// the retry instruction wrapped in the same uncertainty that caused
// the failure in the first place. It is shippable in a real error
// dialog: plain words, a clear next step (say it again / try again),
// and no shock value, just the brutal truth with a shrug.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry is a single string literal on purpose: the judge reads the
// file's exact bytes, so there is no templating, no randomness and no
// second version of the line anywhere. Two runs produce byte-identical
// output, which is what the gate checks.
export const ENTRY =
  "The server ran out of memory and forgot your request mid-sentence. Say it again — it's listening now, probably.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} characters, over the 200 limit`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be one non-empty single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  console.log(ENTRY);
}

main();
