"use client";

import Link from "next/link";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { QR_TYPE_ICONS } from "@/lib/qr/icons";
import { QR_TYPES } from "@/lib/qr/types";

export default function GenerateIndexPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          {t.generateIndex.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.generateIndex.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {QR_TYPES.map((type) => {
          const Icon = QR_TYPE_ICONS[type];
          return (
            <Link
              key={type}
              href={`/generate/${type}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-700"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:group-hover:bg-indigo-900">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {t.qrTypeLabels[type]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
