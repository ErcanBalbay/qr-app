"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";

import { useLanguage } from "@/lib/i18n/LanguageContext";

type QrPreviewProps = {
  data: string;
};

export function QrPreview({ data }: QrPreviewProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!data) {
      if (containerRef.current) containerRef.current.innerHTML = "";
      qrRef.current = null;
      return;
    }

    async function render() {
      const { default: QRCodeStylingCtor } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;

      if (!qrRef.current) {
        qrRef.current = new QRCodeStylingCtor({
          width: 240,
          height: 240,
          type: "svg",
          data,
          dotsOptions: { color: "#4338ca", type: "rounded" },
          cornersSquareOptions: { type: "extra-rounded", color: "#111827" },
          backgroundOptions: { color: "#ffffff" },
        });
        containerRef.current.innerHTML = "";
        qrRef.current.append(containerRef.current);
      } else {
        qrRef.current.update({ data });
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [data]);

  function handleDownload(extension: "png" | "svg") {
    qrRef.current?.download({ extension, name: "qr-code" });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="self-start text-sm font-medium text-gray-700 dark:text-gray-300">
        {t.preview.label}
      </span>
      <div className="flex h-[272px] w-[272px] items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-700">
        {data ? (
          <div ref={containerRef} />
        ) : (
          <p className="text-center text-xs text-gray-400">{t.preview.placeholder}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleDownload("png")}
          disabled={!data}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600"
        >
          {t.preview.downloadPng}
        </button>
        <button
          type="button"
          onClick={() => handleDownload("svg")}
          disabled={!data}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-current dark:border-gray-600"
        >
          {t.preview.downloadSvg}
        </button>
      </div>
    </div>
  );
}
