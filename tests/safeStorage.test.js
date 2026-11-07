const test = require("node:test");
const assert = require("node:assert/strict");
import { parseStoredJson, isValidDonsProgress } from "../src/utils/safeStorage.mjs";

test("parseStoredJson returns parsed JSON", () => {
  assert.deepEqual(parseStoredJson('{"active":true}', {}), { active: true });
});

test("parseStoredJson uses fallback for malformed or missing values", () => {
  const fallback = [];
  assert.equal(parseStoredJson("{invalid", fallback), fallback);
  assert.equal(parseStoredJson(null, fallback), fallback);
});

test("isValidDonsProgress accepts a valid saved progress", () => {
  assert.equal(isValidDonsProgress({
    index: 2,
    scores: { faith: 4, service: 8 },
    finished: false
  }, 10, ["faith", "service"]), true);
});

test("isValidDonsProgress rejects invalid indexes and malformed scores", () => {
  const valid = { index: 2, scores: { faith: 4 }, finished: false };
  assert.equal(isValidDonsProgress({ ...valid, index: -1 }, 10, ["faith"]), false);
  assert.equal(isValidDonsProgress({ ...valid, scores: { faith: "4" } }, 10, ["faith"]), false);
  assert.equal(isValidDonsProgress({ ...valid, finished: "false" }, 10, ["faith"]), false);
});

test("isValidDonsProgress rejects missing gift scores", () => {
  assert.equal(isValidDonsProgress({
    index: 0,
    scores: { faith: 1 },
    finished: false
  }, 10, ["faith", "service"]), false);
});
