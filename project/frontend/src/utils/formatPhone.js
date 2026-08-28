// Example utility — formats a 10-digit string as (XXX) XXX-XXXX.
// Add other shared helpers (date formatting, validators, etc.) here.
export function formatPhone(digits) {
  const cleaned = String(digits).replace(/\D/g, "");
  if (cleaned.length !== 10) return digits;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}
