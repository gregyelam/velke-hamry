import { test } from "node:test";
import assert from "node:assert/strict";
import { isSpam, validate } from "./lib.mjs";

test("isSpam true when honeypot filled", () => {
  assert.equal(isSpam({ _gotcha: "bot" }), true);
});
test("isSpam false when honeypot empty/absent", () => {
  assert.equal(isSpam({ _gotcha: "" }), false);
  assert.equal(isSpam({}), false);
});
test("validate ok for complete valid input", () => {
  const r = validate({ name: "Jan", email: "jan@example.com", arrival: "2026-08-01", departure: "2026-08-03" });
  assert.equal(r.ok, true);
  assert.deepEqual(r.errors, []);
});
test("validate fails on missing name", () => {
  const r = validate({ name: "", email: "jan@example.com", arrival: "2026-08-01", departure: "2026-08-03" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.includes("name"));
});
test("validate fails on bad email", () => {
  const r = validate({ name: "Jan", email: "nope", arrival: "2026-08-01", departure: "2026-08-03" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.includes("email"));
});
test("validate fails on missing dates", () => {
  const r = validate({ name: "Jan", email: "jan@example.com", arrival: "", departure: "" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.includes("arrival"));
  assert.ok(r.errors.includes("departure"));
});
