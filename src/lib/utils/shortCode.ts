export function generateShortCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}
