import type {
  EmailFormValues,
  GeoFormValues,
  SmsFormValues,
  TelFormValues,
  TextFormValues,
  UrlFormValues,
  VcardFormValues,
  WifiFormValues,
} from "./schemas";

// WiFi/vCard alanlarında ayraç olarak kullanılan karakterleri kaçış (escape) yapar.
function escapeSpecialChars(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function buildUrlPayload(values: UrlFormValues): string {
  return values.url;
}

export function buildTextPayload(values: TextFormValues): string {
  return values.text;
}

export function buildVcardPayload(values: VcardFormValues): string {
  const fullName = [values.firstName, values.lastName].filter(Boolean).join(" ");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeSpecialChars(values.lastName ?? "")};${escapeSpecialChars(values.firstName)}`,
    `FN:${escapeSpecialChars(fullName)}`,
  ];

  if (values.phone) lines.push(`TEL:${escapeSpecialChars(values.phone)}`);
  if (values.email) lines.push(`EMAIL:${escapeSpecialChars(values.email)}`);
  if (values.company) lines.push(`ORG:${escapeSpecialChars(values.company)}`);

  lines.push("END:VCARD");
  return lines.join("\n");
}

export function buildWifiPayload(values: WifiFormValues): string {
  const security = values.security === "nopass" ? "nopass" : values.security;
  const password = values.security === "nopass" ? "" : escapeSpecialChars(values.password ?? "");
  return `WIFI:T:${security};S:${escapeSpecialChars(values.ssid)};P:${password};H:${values.hidden ? "true" : "false"};;`;
}

export function buildEmailPayload(values: EmailFormValues): string {
  const params = new URLSearchParams();
  if (values.subject) params.set("subject", values.subject);
  if (values.body) params.set("body", values.body);
  const query = params.toString();
  return `mailto:${values.to}${query ? `?${query}` : ""}`;
}

export function buildSmsPayload(values: SmsFormValues): string {
  return `SMSTO:${values.phone}:${values.message ?? ""}`;
}

export function buildTelPayload(values: TelFormValues): string {
  return `tel:${values.phone}`;
}

export function buildGeoPayload(values: GeoFormValues): string {
  return `geo:${values.latitude},${values.longitude}`;
}
