"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, QrCode } from "lucide-react";

import { isQrType, QR_TYPE_LABELS } from "@/lib/qr/types";

type Crumb = { label: string; href?: string };

function getBreadcrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "Ana Sayfa", href: "/" }];

  if (segments[0] === "generate") {
    crumbs.push({ label: "QR Türleri", href: "/generate" });
    const type = segments[1];
    if (type && isQrType(type)) {
      crumbs.push({ label: QR_TYPE_LABELS[type] });
    }
  }

  return crumbs;
}

export function Header() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);
  const showBreadcrumbs = crumbs.length > 1;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
        >
          <QrCode className="h-5 w-5 text-indigo-600" />
          QR Kod Üretici
        </Link>
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
      </div>
    </header>
  );
}
