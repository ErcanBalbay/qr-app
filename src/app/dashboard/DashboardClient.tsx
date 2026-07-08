"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QrThumbnail } from "@/components/qr/QrThumbnail";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { buildQrPayload } from "@/lib/qr/builders";
import { QR_TYPE_ICONS } from "@/lib/qr/icons";
import type { QrType } from "@/lib/qr/types";

export type QrCodeRow = {
  id: string;
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  created_at: string;
};

export function DashboardClient({ rows: initialRows }: { rows: QrCodeRow[] }) {
  const { t, language } = useLanguage();
  const [rows, setRows] = useState(initialRows);

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("qr_codes").delete().eq("id", id);
    if (!error) setRows((current) => current.filter((row) => row.id !== id));
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          {t.dashboard.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.dashboard.subtitle}</p>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700">
          <p className="text-sm text-gray-400">{t.dashboard.empty}</p>
          <Link href="/generate" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {t.dashboard.backToGenerate}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => {
            const Icon = QR_TYPE_ICONS[row.type];
            return (
              <li
                key={row.id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <QrThumbnail data={buildQrPayload(row.type, row.payload)} />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {t.qrTypeLabels[row.type]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {t.dashboard.createdAt}:{" "}
                    {new Date(row.created_at).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  aria-label={t.dashboard.delete}
                  className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
