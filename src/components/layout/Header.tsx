"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, QrCode } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/lib/i18n/translations";
import { isQrType } from "@/lib/qr/types";

type Crumb = { label: string; href?: string };

function useBreadcrumbs(pathname: string): Crumb[] {
  const { t } = useLanguage();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: t.header.home, href: "/" }];

  if (segments[0] === "generate") {
    crumbs.push({ label: t.header.types, href: "/generate" });
    const type = segments[1];
    if (type && isQrType(type)) {
      crumbs.push({ label: t.qrTypeLabels[type] });
    }
  }

  return crumbs;
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center overflow-hidden rounded-full border border-gray-200 text-xs font-medium dark:border-gray-700">
      {LANGUAGES.map((lang: Language) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-2.5 py-1 transition-colors ${
            language === lang
              ? "bg-indigo-600 text-white"
              : "text-gray-500 hover:text-indigo-600 dark:text-gray-400"
          }`}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const crumbs = useBreadcrumbs(pathname);
  const showBreadcrumbs = crumbs.length > 1;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
        >
          <QrCode className="h-5 w-5 text-indigo-600" />
          {t.home.title}
        </Link>
        <div className="flex items-center gap-4">
          {showBreadcrumbs && (
            <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              {crumbs.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-1">
                  {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-900 dark:text-gray-100">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
