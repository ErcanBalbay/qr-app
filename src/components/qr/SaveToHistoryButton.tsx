"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { generateShortCode } from "@/lib/utils/shortCode";
import type { QrType } from "@/lib/qr/types";

const UNIQUE_VIOLATION = "23505";
const MAX_SHORT_CODE_ATTEMPTS = 3;

type SaveToHistoryButtonProps = {
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
};

export function SaveToHistoryButton({ type, raw }: SaveToHistoryButtonProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isDynamic, setIsDynamic] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  if (!user) {
    return (
      <Link href="/login" className="text-xs text-gray-400 hover:text-indigo-600">
        {t.save.loginToSave}
      </Link>
    );
  }

  async function handleSave() {
    setStatus("saving");
    const supabase = createClient();

    if (!isDynamic) {
      const { error } = await supabase.from("qr_codes").insert({ user_id: user!.id, type, payload: raw });
      setStatus(error ? "error" : "saved");
      return;
    }

    for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt++) {
      const { error } = await supabase.from("qr_codes").insert({
        user_id: user!.id,
        type,
        payload: raw,
        is_dynamic: true,
        target_url: raw.url,
        short_code: generateShortCode(),
      });
      if (!error) {
        setStatus("saved");
        return;
      }
      if (error.code !== UNIQUE_VIOLATION) {
        setStatus("error");
        return;
      }
    }
    setStatus("error");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {type === "url" && (
        <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <input
            type="checkbox"
            checked={isDynamic}
            onChange={(event) => setIsDynamic(event.target.checked)}
          />
          {t.save.saveAsDynamic}
        </label>
      )}
      <button
        type="button"
        onClick={handleSave}
        disabled={!raw || status === "saving"}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 dark:border-gray-600"
      >
        {status === "saving" ? t.save.saving : status === "saved" ? t.save.saved : t.save.button}
      </button>
      {isDynamic && status === "idle" && (
        <p className="max-w-[220px] text-center text-xs text-gray-400">{t.save.dynamicHint}</p>
      )}
    </div>
  );
}
