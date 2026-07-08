import { test } from "node:test";
import assert from "node:assert/strict";
import { isSpam, validate, ownerEmail, guestEmail, escapeHtml } from "./lib.mjs";

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

const F = { name: "Jan Novak", email: "jan@example.com", arrival: "2026-08-01", departure: "2026-08-03", guests: "2", phone: "+420 111", note: "Pozdni prijezd", _language: "cs" };

test("escapeHtml neutralizes angle brackets", () => {
  assert.equal(escapeHtml("<b>&"), "&lt;b&gt;&amp;");
});
test("ownerEmail replyTo is guest email and body has fields", () => {
  const m = ownerEmail(F);
  assert.equal(m.replyTo, "jan@example.com");
  assert.ok(m.subject.includes("Jan Novak"));
  assert.ok(m.text.includes("2026-08-01"));
  assert.ok(m.text.includes("Pozdni prijezd"));
});
test("guestEmail cs by default, contains dates + acknowledgement", () => {
  const m = guestEmail(F);
  assert.ok(m.html.includes("2026-08-01"));
  assert.ok(m.html.includes("2026-08-03"));
  assert.ok(/Děkujeme/.test(m.html));
  assert.ok(m.text.length > 0);
});
test("guestEmail switches to en", () => {
  const m = guestEmail({ ...F, _language: "en" });
  assert.ok(/Thank you/.test(m.html));
});
test("guestEmail escapes hostile name", () => {
  const m = guestEmail({ ...F, name: "<script>" });
  assert.ok(!m.html.includes("<script>"));
});
