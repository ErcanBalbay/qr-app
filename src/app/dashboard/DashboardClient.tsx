"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QrThumbnail } from "@/components/qr/QrThumbnail";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { buildQrPayload } from "@/lib/qr/builders";
import { generateShortCode } from "@/lib/utils/shortCode";
import { QR_TYPE_ICONS } from "@/lib/qr/icons";
import type { QrType } from "@/lib/qr/types";

const UNIQUE_VIOLATION = "23505";
const MAX_SHORT_CODE_ATTEMPTS = 3;

export type QrCodeRow = {
  id: string;
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  is_dynamic: boolean;
  target_url: string | null;
  short_code: string | null;
  created_at: string;
};

export function DashboardClient({
  rows: initialRows,
  scanCounts,
}: {
  rows: QrCodeRow[];
  scanCounts: Record<string, number>;
}) {
  const { t, language } = useLanguage();
  const [rows, setRows] = useState(initialRows);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    // window is unavailable during SSR, so the origin can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("qr_codes").delete().eq("id", id);
    if (!error) setRows((current) => current.filter((row) => row.id !== id));
  }

  function updateRow(id: string, patch: Partial<QrCodeRow>) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
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
            const thumbnailData = row.is_dynamic
              ? `${origin}/r/${row.short_code}`
              : buildQrPayload(row.type, row.payload);

            return (
              <li
                key={row.id}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center"
              >
                <QrThumbnail data={thumbnailData || " "} />
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
                  {row.type === "url" && (
                    <DynamicControls
                      row={row}
                      origin={origin}
                      scanCount={scanCounts[row.id] ?? 0}
                      onUpdate={(patch) => updateRow(row.id, patch)}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  aria-label={t.dashboard.delete}
                  className="self-start rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
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

function DynamicControls({
  row,
  origin,
  scanCount,
  onUpdate,
}: {
  row: QrCodeRow;
  origin: string;
  scanCount: number;
  onUpdate: (patch: Partial<QrCodeRow>) => void;
}) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [targetUrl, setTargetUrl] = useState(row.target_url ?? "");
  const [updateStatus, setUpdateStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [makingDynamic, setMakingDynamic] = useState(false);

  if (!row.is_dynamic) {
    async function handleMakeDynamic() {
      setMakingDynamic(true);
      const supabase = createClient();
      const targetUrl = row.payload?.url as string | undefined;
      if (!targetUrl) {
        setMakingDynamic(false);
        return;
      }

      for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt++) {
        const shortCode = generateShortCode();
        const { error } = await supabase
          .from("qr_codes")
          .update({ is_dynamic: true, target_url: targetUrl, short_code: shortCode })
          .eq("id", row.id);
        if (!error) {
          onUpdate({ is_dynamic: true, target_url: targetUrl, short_code: shortCode });
          setMakingDynamic(false);
          return;
        }
        if (error.code !== UNIQUE_VIOLATION) break;
      }
      setMakingDynamic(false);
    }

    return (
      <button
        type="button"
        onClick={handleMakeDynamic}
        disabled={makingDynamic}
        className="mt-1 self-start text-xs font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
      >
        {t.dashboard.makeDynamic}
      </button>
    );
  }

  const shortLink = `${origin}/r/${row.short_code}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleUpdateTarget() {
    setUpdateStatus("saving");
    const supabase = createClient();
    const { error } = await supabase
      .from("qr_codes")
      .update({ target_url: targetUrl })
      .eq("id", row.id);
    if (!error) {
      onUpdate({ target_url: targetUrl });
      setUpdateStatus("saved");
      setTimeout(() => setUpdateStatus("idle"), 2000);
    } else {
      setUpdateStatus("idle");
    }
  }

  return (
    <div className="mt-1 flex flex-col gap-2 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {t.dashboard.scans(scanCount)}
        </span>
        <span className="text-gray-400">{shortLink}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {copied ? t.dashboard.copied : t.dashboard.copyLink}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={targetUrl}
          onChange={(event) => setTargetUrl(event.target.value)}
          className="w-full min-w-0 rounded-md border border-gray-300 px-2 py-1 text-xs outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-950"
          placeholder={t.dashboard.targetUrlLabel}
        />
        <button
          type="button"
          onClick={handleUpdateTarget}
          disabled={updateStatus === "saving" || !targetUrl}
          className="whitespace-nowrap font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
        >
          {updateStatus === "saved" ? t.dashboard.updated : t.dashboard.updateTarget}
        </button>
      </div>
    </div>
  );
}
