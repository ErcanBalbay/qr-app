"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { buildQrPayload } from "@/lib/qr/builders";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language, translations } from "@/lib/i18n/translations";
import { createQrSchemas } from "@/lib/qr/schemas";
import type { QrType } from "@/lib/qr/types";

type Translation = (typeof translations)[Language];

type GeneratorFormProps = {
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDataChange: (data: string, raw: any) => void;
};

const fieldClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-950 dark:focus:border-indigo-500";
const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";

export function GeneratorForm({ type, onDataChange }: GeneratorFormProps) {
  const { t } = useLanguage();
  const schemas = useMemo(() => createQrSchemas(t), [t]);
  const schema = schemas[type];

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
      onDataChange("", null);
      return;
    }
    onDataChange(buildQrPayload(type, parsed.data), parsed.data);
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
      onChange={submitAndBuild}
      onBlur={submitAndBuild}
    >
      {renderFields(type, form, t)}
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

function renderFields(
  type: QrType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: ReturnType<typeof useForm<any>>,
  t: Translation,
) {
  const { register, formState } = form;
  const errors = formState.errors;
  const f = t.forms;

  switch (type) {
    case "url":
      return (
        <Field label={f.url.label} error={errors.url?.message as string}>
          <input {...register("url")} className={fieldClass} placeholder={f.url.placeholder} />
        </Field>
      );
    case "text":
      return (
        <Field label={f.text.label} error={errors.text?.message as string}>
          <textarea {...register("text")} className={fieldClass} rows={4} placeholder={f.text.placeholder} />
        </Field>
      );
    case "vcard":
      return (
        <>
          <Field label={f.vcard.firstName} error={errors.firstName?.message as string}>
            <input {...register("firstName")} className={fieldClass} />
          </Field>
          <Field label={f.vcard.lastName}>
            <input {...register("lastName")} className={fieldClass} />
          </Field>
          <Field label={f.vcard.phone}>
            <input {...register("phone")} className={fieldClass} />
          </Field>
          <Field label={f.vcard.email} error={errors.email?.message as string}>
            <input {...register("email")} className={fieldClass} />
          </Field>
          <Field label={f.vcard.company}>
            <input {...register("company")} className={fieldClass} />
          </Field>
        </>
      );
    case "wifi":
      return (
        <>
          <Field label={f.wifi.ssid} error={errors.ssid?.message as string}>
            <input {...register("ssid")} className={fieldClass} />
          </Field>
          <Field label={f.wifi.password}>
            <input {...register("password")} className={fieldClass} />
          </Field>
          <Field label={f.wifi.security}>
            <select {...register("security")} className={fieldClass}>
              <option value="WPA">{f.wifi.wpa}</option>
              <option value="WEP">{f.wifi.wep}</option>
              <option value="nopass">{f.wifi.nopass}</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("hidden")} />
            {f.wifi.hidden}
          </label>
        </>
      );
    case "email":
      return (
        <>
          <Field label={f.email.to} error={errors.to?.message as string}>
            <input {...register("to")} className={fieldClass} />
          </Field>
          <Field label={f.email.subject}>
            <input {...register("subject")} className={fieldClass} />
          </Field>
          <Field label={f.email.body}>
            <textarea {...register("body")} className={fieldClass} rows={3} />
          </Field>
        </>
      );
    case "sms":
      return (
        <>
          <Field label={f.sms.phone} error={errors.phone?.message as string}>
            <input {...register("phone")} className={fieldClass} />
          </Field>
          <Field label={f.sms.message}>
            <textarea {...register("message")} className={fieldClass} rows={3} />
          </Field>
        </>
      );
    case "tel":
      return (
        <Field label={f.tel.phone} error={errors.phone?.message as string}>
          <input {...register("phone")} className={fieldClass} />
        </Field>
      );
    case "geo":
      return (
        <>
          <Field label={f.geo.latitude} error={errors.latitude?.message as string}>
            <input {...register("latitude")} className={fieldClass} placeholder="41.0082" />
          </Field>
          <Field label={f.geo.longitude} error={errors.longitude?.message as string}>
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
