import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url("Geçerli bir URL girin (https:// ile başlamalı)"),
});

export const textSchema = z.object({
  text: z.string().min(1, "Metin boş olamaz"),
});

export const vcardSchema = z.object({
  firstName: z.string().min(1, "Ad gerekli"),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta girin").optional().or(z.literal("")),
  company: z.string().optional(),
});

export const wifiSchema = z.object({
  ssid: z.string().min(1, "Ağ adı (SSID) gerekli"),
  password: z.string().optional(),
  security: z.enum(["WPA", "WEP", "nopass"]),
  hidden: z.boolean(),
});

export const emailSchema = z.object({
  to: z.string().email("Geçerli bir e-posta girin"),
  subject: z.string().optional(),
  body: z.string().optional(),
});

export const smsSchema = z.object({
  phone: z.string().min(1, "Telefon numarası gerekli"),
  message: z.string().optional(),
});

export const telSchema = z.object({
  phone: z.string().min(1, "Telefon numarası gerekli"),
});

export const geoSchema = z.object({
  latitude: z.string().min(1, "Enlem gerekli"),
  longitude: z.string().min(1, "Boylam gerekli"),
});

export const qrSchemas = {
  url: urlSchema,
  text: textSchema,
  vcard: vcardSchema,
  wifi: wifiSchema,
  email: emailSchema,
  sms: smsSchema,
  tel: telSchema,
  geo: geoSchema,
};

export type UrlFormValues = z.infer<typeof urlSchema>;
export type TextFormValues = z.infer<typeof textSchema>;
export type VcardFormValues = z.infer<typeof vcardSchema>;
export type WifiFormValues = z.infer<typeof wifiSchema>;
export type EmailFormValues = z.infer<typeof emailSchema>;
export type SmsFormValues = z.infer<typeof smsSchema>;
export type TelFormValues = z.infer<typeof telSchema>;
export type GeoFormValues = z.infer<typeof geoSchema>;
