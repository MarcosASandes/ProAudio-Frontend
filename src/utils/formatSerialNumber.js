export function cleanSerial(serial) {
  return serial
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 20);
}