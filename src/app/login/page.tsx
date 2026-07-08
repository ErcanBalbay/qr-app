"use client";

import { useState } from "react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{t.auth.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.auth.subtitle}</p>
      </div>

      {status === "sent" ? (
        <p className="rounded-md bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {t.auth.checkEmail}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.auth.emailLabel}
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.auth.emailPlaceholder}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-950"
            />
          </label>
          {status === "error" && <p className="text-xs text-red-600">{t.auth.error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {status === "sending" ? t.auth.sending : t.auth.submit}
          </button>
        </form>
      )}
    </div>
  );
}
