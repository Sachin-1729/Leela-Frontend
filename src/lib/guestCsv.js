const NAME_HEADERS = ["name", "guest name", "full name"];
const PHONE_HEADERS = ["mobile", "phone", "mobile number", "phone number", "contact", "whatsapp"];

// Splits CSV text into rows, handling quoted fields ("Doe, John") and escaped quotes ("")
function parseRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/*
 * Parses a guest CSV with "name" and "mobile" columns.
 * Returns { guests, errors } — errors list rows that were skipped.
 */
export function parseGuestCsv(rawText) {
  const text = rawText.replace(/^\uFEFF/, "");
  const rows = parseRows(text);

  if (rows.length === 0) {
    return { guests: [], errors: ["The file is empty."] };
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const nameIndex = header.findIndex((h) => NAME_HEADERS.includes(h));
  const phoneIndex = header.findIndex((h) => PHONE_HEADERS.includes(h));

  if (nameIndex === -1 || phoneIndex === -1) {
    return {
      guests: [],
      errors: ['The CSV must have a header row with "name" and "mobile" columns.'],
    };
  }

  const guests = [];
  const errors = [];
  const seenPhones = new Set();

  rows.slice(1).forEach((row, index) => {
    const line = index + 2;
    const name = (row[nameIndex] || "").trim();
    const rawPhone = (row[phoneIndex] || "").trim();
    const digits = rawPhone.replace(/\D/g, "");
    const phone = rawPhone.startsWith("+") ? `+${digits}` : digits;

    if (!name) {
      errors.push(`Row ${line}: name is missing`);
      return;
    }

    if (digits.length < 7) {
      errors.push(`Row ${line}: invalid mobile number "${rawPhone}"`);
      return;
    }

    if (seenPhones.has(phone)) {
      errors.push(`Row ${line}: duplicate mobile number ${phone}`);
      return;
    }

    seenPhones.add(phone);
    guests.push({ name, phone });
  });

  return { guests, errors };
}
