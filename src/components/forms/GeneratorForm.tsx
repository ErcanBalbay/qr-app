"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  buildEmailPayload,
  buildGeoPayload,
  buildSmsPayload,
  buildTelPayload,
  buildTextPayload,
  buildUrlPayload,
  buildVcardPayload,
  buildWifiPayload,
} from "@/lib/qr/builders";
import { qrSchemas } from "@/lib/qr/schemas";
import type { QrType } from "@/lib/qr/types";

type GeneratorFormProps = {
  type: QrType;
  onDataChange: (data: string) => void;
};

const fieldClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900";
const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";

export function GeneratorForm({ type, onDataChange }: GeneratorFormProps) {
  const schema = qrSchemas[type];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(schema as never),
    mode: "onChange",
    defaultValues: getDefaultValues(type),
  });

  const values = form.watch();

  function submitAndBuild() {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      onDataChange("");
      return;
    }
    onDataChange(buildPayload(type, parsed.data));
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
      onChange={submitAndBuild}
      onBlur={submitAndBuild}
    >
      {renderFields(type, form)}
    </form>
  );
}

function getDefaultValues(type: QrType) {
  switch (type) {
    case "wifi":
      return { ssid: "", password: "", security: "WPA", hidden: false };
    case "vcard":
      return { firstName: "", lastName: "", phone: "", email: "", company: "" };
    case "email":
      return { to: "", subject: "", body: "" };
    case "sms":
      return { phone: "", message: "" };
    case "geo":
      return { latitude: "", longitude: "" };
    default:
      return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPayload(type: QrType, data: any): string {
  switch (type) {
    case "url":
      return buildUrlPayload(data);
    case "text":
      return buildTextPayload(data);
    case "vcard":
      return buildVcardPayload(data);
    case "wifi":
      return buildWifiPayload(data);
    case "email":
      return buildEmailPayload(data);
    case "sms":
      return buildSmsPayload(data);
    case "tel":
      return buildTelPayload(data);
    case "geo":
      return buildGeoPayload(data);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderFields(type: QrType, form: ReturnType<typeof useForm<any>>) {
  const { register, formState } = form;
  const errors = formState.errors;

  switch (type) {
    case "url":
      return (
        <Field label="URL" error={errors.url?.message as string}>
          <input {...register("url")} className={fieldClass} placeholder="https://ornek.com" />
        </Field>
      );
    case "text":
      return (
        <Field label="Metin" error={errors.text?.message as string}>
          <textarea {...register("text")} className={fieldClass} rows={4} placeholder="Metninizi girin" />
        </Field>
      );
    case "vcard":
      return (
        <>
          <Field label="Ad" error={errors.firstName?.message as string}>
            <input {...register("firstName")} className={fieldClass} />
          </Field>
          <Field label="Soyad">
            <input {...register("lastName")} className={fieldClass} />
          </Field>
          <Field label="Telefon">
            <input {...register("phone")} className={fieldClass} />
          </Field>
          <Field label="E-posta" error={errors.email?.message as string}>
            <input {...register("email")} className={fieldClass} />
          </Field>
          <Field label="Şirket">
            <input {...register("company")} className={fieldClass} />
          </Field>
        </>
      );
    case "wifi":
      return (
        <>
          <Field label="Ağ Adı (SSID)" error={errors.ssid?.message as string}>
            <input {...register("ssid")} className={fieldClass} />
          </Field>
          <Field label="Şifre">
            <input {...register("password")} className={fieldClass} />
          </Field>
          <Field label="Güvenlik">
            <select {...register("security")} className={fieldClass}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Şifresiz</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("hidden")} />
            Gizli ağ
          </label>
        </>
      );
    case "email":
      return (
        <>
          <Field label="Alıcı e-posta" error={errors.to?.message as string}>
            <input {...register("to")} className={fieldClass} />
          </Field>
          <Field label="Konu">
            <input {...register("subject")} className={fieldClass} />
          </Field>
          <Field label="Mesaj">
            <textarea {...register("body")} className={fieldClass} rows={3} />
          </Field>
        </>
      );
    case "sms":
      return (
        <>
          <Field label="Telefon numarası" error={errors.phone?.message as string}>
            <input {...register("phone")} className={fieldClass} />
          </Field>
          <Field label="Mesaj">
            <textarea {...register("message")} className={fieldClass} rows={3} />
          </Field>
        </>
      );
    case "tel":
      return (
        <Field label="Telefon numarası" error={errors.phone?.message as string}>
          <input {...register("phone")} className={fieldClass} />
        </Field>
      );
    case "geo":
      return (
        <>
          <Field label="Enlem" error={errors.latitude?.message as string}>
            <input {...register("latitude")} className={fieldClass} placeholder="41.0082" />
          </Field>
          <Field label="Boylam" error={errors.longitude?.message as string}>
            <input {...register("longitude")} className={fieldClass} placeholder="28.9784" />
          </Field>
        </>
      );
  }
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className={labelClass}>{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
