"use client";

import { useState } from "react";

import { GeneratorForm } from "@/components/forms/GeneratorForm";
import { QrPreview } from "@/components/qr/QrPreview";
import { SaveToHistoryButton } from "@/components/qr/SaveToHistoryButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { QR_TYPE_ICONS } from "@/lib/qr/icons";
import type { QrType } from "@/lib/qr/types";

export function GenerateClient({ type }: { type: QrType }) {
  const { t } = useLanguage();
  const [data, setData] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [raw, setRaw] = useState<any>(null);
  const Icon = QR_TYPE_ICONS[type];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
          <Icon className="h-5 w-5" />
        </span>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {t.generateType.heading(t.qrTypeLabels[type])}
        </h1>
      </div>
      <div className="grid items-start gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <GeneratorForm
            type={type}
            onDataChange={(nextData, nextRaw) => {
              setData(nextData);
              setRaw(nextRaw);
            }}
          />
        </div>
        <div className="sticky top-24 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <QrPreview data={data} />
          <div className="flex justify-center">
            <SaveToHistoryButton type={type} raw={raw} />
          </div>
        </div>
      </div>
    </div>
  );
}
