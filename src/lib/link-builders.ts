/** Shared link-generation logic reused by the homepage hero widget and dedicated tool pages. */

/** Build a wa.me click-to-chat URL. Returns "" when the phone number is missing/invalid. */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  // Needs at least a country code + subscriber number to be a valid wa.me target.
  if (digits.length < 8) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
