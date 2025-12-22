import "server-only";

export function getServerTimestamp() {
  return new Date().toISOString();
}
