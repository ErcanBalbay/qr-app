export const QR_TYPES = [
  "url",
  "text",
  "vcard",
  "wifi",
  "email",
  "sms",
  "tel",
  "geo",
] as const;

export type QrType = (typeof QR_TYPES)[number];

export function isQrType(value: string): value is QrType {
  return (QR_TYPES as readonly string[]).includes(value);
}
