"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";

type QrThumbnailProps = {
  data: string;
  size?: number;
};

export function QrThumbnail({ data, size = 96 }: QrThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { default: QRCodeStylingCtor } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;

      qrRef.current = new QRCodeStylingCtor({
        width: size,
        height: size,
        type: "svg",
        data,
        dotsOptions: { color: "#4338ca", type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded", color: "#111827" },
        backgroundOptions: { color: "#ffffff" },
      });
      containerRef.current.innerHTML = "";
      qrRef.current.append(containerRef.current);
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [data, size]);

  return <div ref={containerRef} style={{ width: size, height: size }} />;
}
