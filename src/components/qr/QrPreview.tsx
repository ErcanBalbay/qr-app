"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";

type QrPreviewProps = {
  data: string;
};

export function QrPreview({ data }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { default: QRCodeStylingCtor } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;

      if (!qrRef.current) {
        qrRef.current = new QRCodeStylingCtor({
          width: 280,
          height: 280,
          type: "svg",
          data: data || " ",
          dotsOptions: { color: "#111827", type: "rounded" },
          cornersSquareOptions: { type: "extra-rounded" },
          backgroundOptions: { color: "#ffffff" },
        });
        containerRef.current.innerHTML = "";
        qrRef.current.append(containerRef.current);
      } else {
        qrRef.current.update({ data: data || " " });
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
      <div ref={containerRef} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700" />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleDownload("png")}
          disabled={!data}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-40 dark:bg-white dark:text-gray-900"
        >
          PNG indir
        </button>
        <button
          type="button"
          onClick={() => handleDownload("svg")}
          disabled={!data}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600"
        >
          SVG indir
        </button>
      </div>
    </div>
  );
}
