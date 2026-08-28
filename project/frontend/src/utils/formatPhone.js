// Example utility — formats a 10-digit string as (XXX) XXX-XXXX.
// Add other shared helpers (date formatting, validators, etc.) here.
function formatPhone(digits) {
  const cleaned = String(digits).replace(/\D/g, "");
  if (cleaned.length !== 10) return digits;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

// Formats raw digits as (XXX) XXX-XXXX progressively as the user types.
// Works whether they type digits only or paste a formatted number —
// non-digit characters are stripped first.
export function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Factory: takes the component's setForm and returns an onChange handler
// bound to it. This is what lets the handler itself live outside the
// component -- it just needs setForm passed in once.
export function createPhoneChangeHandler(setForm) {
  return function handlePhoneChange(e) {
    setForm((f) => ({ ...f, phone: formatPhoneInput(e.target.value) }));
  };
}