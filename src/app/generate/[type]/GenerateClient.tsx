"use client";

import { useState } from "react";

import { GeneratorForm } from "@/components/forms/GeneratorForm";
import { QrPreview } from "@/components/qr/QrPreview";
import type { QrType } from "@/lib/qr/types";

export function GenerateClient({ type }: { type: QrType }) {
  const [data, setData] = useState("");

  return (
    <div className="grid items-start gap-6 sm:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <GeneratorForm type={type} onDataChange={setData} />
      </div>
      <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <QrPreview data={data} />
      </div>
    </div>
  );
}
