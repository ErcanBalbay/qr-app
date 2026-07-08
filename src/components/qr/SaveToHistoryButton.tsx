"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import type { QrType } from "@/lib/qr/types";

type SaveToHistoryButtonProps = {
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
};

export function SaveToHistoryButton({ type, raw }: SaveToHistoryButtonProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
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
    const { error } = await supabase
      .from("qr_codes")
      .insert({ user_id: user!.id, type, payload: raw });
    setStatus(error ? "error" : "saved");
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={!raw || status === "saving"}
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 dark:border-gray-600"
    >
      {status === "saving" ? t.save.saving : status === "saved" ? t.save.saved : t.save.button}
    </button>
  );
}
