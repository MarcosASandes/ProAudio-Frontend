export function cleanSerial(serial) {
  return serial
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 20);
}

export function cleanPdfName(name) {
  return name
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40);
}