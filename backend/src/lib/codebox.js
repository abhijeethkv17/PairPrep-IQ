import axios from "axios";
import { ENV } from "./env.js";

if (!ENV.CODEBOX_API_URL) {
  console.error("CODEBOX_API_URL is not set in environment variables");
}

const client = axios.create({
  baseURL: ENV.CODEBOX_API_URL,
  headers: {
    "X-Auth-Token": ENV.CODEBOX_AUTH_TOKEN,
    "Content-Type": "application/json",
  },
});

const LANGUAGE_IDS = { JAVASCRIPT: 63, PYTHON: 71, JAVA: 62 };
const BATCH_LIMIT = 20;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getLanguageId = (lang) => LANGUAGE_IDS[lang.toUpperCase()];

export async function submitBatch(submissions) {
  const results = [];
  for (const batch of chunk(submissions, BATCH_LIMIT)) {
    const { data } = await client.post("/submissions/batch", {
      submissions: batch,
    });
    results.push(...data);
  }
  return results;
}

const MAX_POLL_ATTEMPTS = 30; // ~30s total at 1s between rounds

export async function pollBatchResults(tokens) {
  const resultsByToken = new Map();
  let pending = [...tokens];
  let attempts = 0;

  while (pending.length > 0) {
    if (attempts++ >= MAX_POLL_ATTEMPTS) {
      throw new Error("Judge0 polling timed out waiting for results");
    }
    const stillPending = [];
    for (const tokenChunk of chunk(pending, BATCH_LIMIT)) {
      const { data } = await client.get("/submissions/batch", {
        params: { tokens: tokenChunk.join(",") },
      });
      for (const result of data.submissions) {
        if (result.status && [1, 2].includes(result.status.id))
          stillPending.push(result.token);
        else resultsByToken.set(result.token, result);
      }
    }
    pending = stillPending;
    if (pending.length > 0) await sleep(1000);
  }

  return tokens.map((token) => resultsByToken.get(token));
}
