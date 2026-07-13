const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isSpam(fields) {
  return typeof fields._gotcha === "string" && fields._gotcha.trim().length > 0;
}

export function validate(fields) {
  const errors = [];
  if (!fields.name || !fields.name.trim()) errors.push("name");
  if (!fields.email || !EMAIL_RE.test(fields.email.trim())) errors.push("email");
  if (!fields.arrival || !fields.arrival.trim()) errors.push("arrival");
  if (!fields.departure || !fields.departure.trim()) errors.push("departure");
  return { ok: errors.length === 0, errors };
}

export function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const BRAND = { bg: "#F1EEE7", ink: "#23221F", accent: "#BF562E", dark: "#2B2B28" };

export function ownerEmail(fields) {
  const g = fields.guests || "?";
  const subject = `INGOT poptávka: ${fields.arrival}-${fields.departure}, ${fields.name}`;
  const rows = [
    ["Příjezd", fields.arrival],
    ["Odjezd", fields.departure],
    ["Hostů", g],
    ["Jméno", fields.name],
    ["E-mail", fields.email],
    ["Telefon", fields.phone || "-"],
    ["Poznámka", fields.note || "-"],
    ["Jazyk formuláře", fields._language || "cs"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:${BRAND.ink};">
<h2>Nová poptávka - INGOT</h2>
<table cellpadding="6" style="border-collapse:collapse;">
${rows.map(([k, v]) => `<tr><td style="color:#7a766c;">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
</table>
<p style="color:#7a766c;font-size:13px;">Odpovězte na tento e-mail a napíšete přímo hostovi.</p>
</div>`;
  return { subject, html, text, replyTo: fields.email };
}

export function guestEmail(fields) {
  const en = fields._language === "en";
  const g = escapeHtml(fields.guests || "?");
  const arr = escapeHtml(fields.arrival);
  const dep = escapeHtml(fields.departure);
  const name = escapeHtml(fields.name);
  const t = en
    ? {
        subject: "INGOT - thank you for your enquiry",
        h: "Thank you for your enquiry",
        greet: "Hi",
        intro: "we're so glad INGOT caught your eye. Here's a quick summary of what you sent us:",
        ack: "We'll personally get back to you very soon - we'll confirm the dates are free and send you our best price directly. Usually within 24 hours.",
        reply: "If you need anything or have a special request, just reply to this e-mail. We're always happy to help.",
        sign: "We look forward to welcoming you to the mountains!",
        labels: { arr: "Arrival", dep: "Departure", g: "Guests" },
      }
    : {
        subject: "INGOT - děkujeme za vaši poptávku",
        h: "Děkujeme za vaši poptávku",
        greet: "Dobrý den,",
        intro: "moc nás těší váš zájem o pobyt v apartmánu INGOT. Tady je shrnutí toho, co jste nám poslali:",
        ack: "Ozveme se vám co nejdříve osobně - potvrdíme, že je termín volný, a pošleme vám cenu napřímo. Většinou to stihneme do 24 hodin.",
        reply: "Kdybyste cokoli potřebovali nebo měli zvláštní přání, klidně nám odpovězte na tento e-mail. Rádi pomůžeme.",
        sign: "Těšíme se na vás v Jizerkách!",
        labels: { arr: "Příjezd", dep: "Odjezd", g: "Hostů" },
      };
  const greetLine = `${t.greet} ${name},`;
  const text = `${t.h}\n\n${greetLine}\n\n${t.intro}\n${t.labels.arr}: ${fields.arrival}\n${t.labels.dep}: ${fields.departure}\n${t.labels.g}: ${fields.guests || "?"}\n\n${t.ack}\n\n${t.reply}\n\n${t.sign}\n\n- INGOT · Velké Hamry, Jizerské hory`;
  const html = `<div style="background:${BRAND.bg};padding:28px;font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e7e3d9;">
    <div style="background:${BRAND.dark};color:${BRAND.bg};padding:22px 28px;letter-spacing:.18em;font-weight:700;">INGOT</div>
    <div style="padding:28px;">
      <h1 style="font-size:22px;margin:0 0 14px;color:${BRAND.ink};">${t.h}</h1>
      <p style="margin:0 0 16px;line-height:1.6;">${greetLine}</p>
      <p style="margin:0 0 12px;line-height:1.6;">${t.intro}</p>
      <table cellpadding="4" style="margin:0 0 16px;border-collapse:collapse;">
        <tr><td style="color:#7a766c;">${t.labels.arr}</td><td><strong>${arr}</strong></td></tr>
        <tr><td style="color:#7a766c;">${t.labels.dep}</td><td><strong>${dep}</strong></td></tr>
        <tr><td style="color:#7a766c;">${t.labels.g}</td><td><strong>${g}</strong></td></tr>
      </table>
      <p style="margin:0 0 12px;line-height:1.6;">${t.ack}</p>
      <p style="margin:0 0 20px;line-height:1.6;">${t.reply}</p>
      <p style="margin:0 0 24px;line-height:1.6;font-weight:600;color:${BRAND.ink};">${t.sign}</p>
      <p style="margin:0;color:#7a766c;font-size:13px;border-top:1px solid #e7e3d9;padding-top:16px;">INGOT · Velké Hamry, Jizerské hory · <a href="https://ingot-hamry.cz" style="color:${BRAND.accent};">ingot-hamry.cz</a></p>
    </div>
  </div>
</div>`;
  return { subject: t.subject, html, text };
}
