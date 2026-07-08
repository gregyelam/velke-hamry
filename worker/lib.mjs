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
