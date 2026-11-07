import test from "node:test";
import assert from "node:assert/strict";
import { parseStoredJson, isValidDonsProgress, removeLegacyPasswords } from "../src/utils/safeStorage.js";

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

test("removeLegacyPasswords strips credentials without changing other account data", () => {
  const values = new Map([
    ["users", JSON.stringify([{ email: "person@example.test", senha: "plain-text", username: "Person" }])],
    ["currentUser", JSON.stringify({ email: "person@example.test", senha: "plain-text", username: "Person" })]
  ]);
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };

  assert.equal(removeLegacyPasswords(storage), true);
  assert.deepEqual(JSON.parse(values.get("users")), [{ email: "person@example.test", username: "Person" }]);
  assert.deepEqual(JSON.parse(values.get("currentUser")), { email: "person@example.test", username: "Person" });
});

test("removeLegacyPasswords leaves storage unchanged when no credentials exist", () => {
  const values = new Map([["users", JSON.stringify([{ email: "person@example.test" }])]]);
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };

  assert.equal(removeLegacyPasswords(storage), false);
  assert.equal(values.get("users"), JSON.stringify([{ email: "person@example.test" }]));
});
