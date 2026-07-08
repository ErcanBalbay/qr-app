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

export const QR_TYPE_LABELS: Record<QrType, string> = {
  url: "Link",
  text: "Metin",
  vcard: "Kişi (vCard)",
  wifi: "WiFi",
  email: "E-posta",
  sms: "SMS",
  tel: "Telefon",
  geo: "Konum",
};

export function isQrType(value: string): value is QrType {
  return (QR_TYPES as readonly string[]).includes(value);
}
