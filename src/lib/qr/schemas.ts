import { z } from "zod";

import type { Language, translations } from "@/lib/i18n/translations";

type Translation = (typeof translations)[Language];

export function createQrSchemas(t: Translation) {
  const urlSchema = z.object({
    url: z.string().url(t.forms.url.error),
  });

  const textSchema = z.object({
    text: z.string().min(1, t.forms.text.error),
  });

  const vcardSchema = z.object({
    firstName: z.string().min(1, t.forms.vcard.firstNameError),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email(t.forms.vcard.emailError).optional().or(z.literal("")),
    company: z.string().optional(),
  });

  const wifiSchema = z.object({
    ssid: z.string().min(1, t.forms.wifi.ssidError),
    password: z.string().optional(),
    security: z.enum(["WPA", "WEP", "nopass"]),
    hidden: z.boolean(),
  });

  const emailSchema = z.object({
    to: z.string().email(t.forms.email.toError),
    subject: z.string().optional(),
    body: z.string().optional(),
  });

  const smsSchema = z.object({
    phone: z.string().min(1, t.forms.sms.phoneError),
    message: z.string().optional(),
  });

  const telSchema = z.object({
    phone: z.string().min(1, t.forms.tel.phoneError),
  });

  const geoSchema = z.object({
    latitude: z.string().min(1, t.forms.geo.latitudeError),
    longitude: z.string().min(1, t.forms.geo.longitudeError),
  });

  return {
    url: urlSchema,
    text: textSchema,
    vcard: vcardSchema,
    wifi: wifiSchema,
    email: emailSchema,
    sms: smsSchema,
    tel: telSchema,
    geo: geoSchema,
  };
}

export type QrSchemas = ReturnType<typeof createQrSchemas>;
export type UrlFormValues = z.infer<QrSchemas["url"]>;
export type TextFormValues = z.infer<QrSchemas["text"]>;
export type VcardFormValues = z.infer<QrSchemas["vcard"]>;
export type WifiFormValues = z.infer<QrSchemas["wifi"]>;
export type EmailFormValues = z.infer<QrSchemas["email"]>;
export type SmsFormValues = z.infer<QrSchemas["sms"]>;
export type TelFormValues = z.infer<QrSchemas["tel"]>;
export type GeoFormValues = z.infer<QrSchemas["geo"]>;
