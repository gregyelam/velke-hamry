import { isSpam, validate, ownerEmail, guestEmail } from "./lib.mjs";

const FROM = "INGOT <reservation@ingot-hamry.cz>";

async function sendResend(apiKey, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

async function parseFields(request) {
  const ct = request.headers.get("content-type") || "";
  const out = {};
  if (ct.includes("application/json")) {
    Object.assign(out, await request.json());
  } else {
    const fd = await request.formData();
    for (const [k, v] of fd.entries()) out[k] = typeof v === "string" ? v : "";
  }
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/enquiry") {
      let fields;
      try {
        fields = await parseFields(request);
      } catch {
        return Response.json({ ok: false, errors: ["parse"] }, { status: 400 });
      }
      if (isSpam(fields)) return Response.json({ ok: true }); // silently drop
      const v = validate(fields);
      if (!v.ok) return Response.json({ ok: false, errors: v.errors }, { status: 400 });

      const owner = ownerEmail(fields);
      const ownerOk = await sendResend(env.RESEND_API_KEY, {
        from: FROM,
        to: [env.OWNER_EMAIL],
        reply_to: owner.replyTo,
        subject: owner.subject,
        html: owner.html,
        text: owner.text,
      });
      if (!ownerOk) return Response.json({ ok: false }, { status: 502 });

      const guest = guestEmail(fields);
      await sendResend(env.RESEND_API_KEY, {
        from: FROM,
        to: [fields.email],
        reply_to: "reservation@ingot-hamry.cz",
        subject: guest.subject,
        html: guest.html,
        text: guest.text,
      }); // best-effort; do not fail the request on guest-mail error

      return Response.json({ ok: true });
    }
    return env.ASSETS.fetch(request);
  },
};
