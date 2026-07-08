"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {t.home.title}
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">{t.home.subtitle}</p>
      <Link
        href="/generate"
        className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-500"
      >
        {t.home.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
