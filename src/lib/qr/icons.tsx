import { Contact, Link2, Mail, MapPin, MessageSquare, Phone, Type, Wifi } from "lucide-react";

import type { QrType } from "./types";

export const QR_TYPE_ICONS: Record<QrType, typeof Link2> = {
  url: Link2,
  text: Type,
  vcard: Contact,
  wifi: Wifi,
  email: Mail,
  sms: MessageSquare,
  tel: Phone,
  geo: MapPin,
};
