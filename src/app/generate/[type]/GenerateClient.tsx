"use client";

import { useState } from "react";

import { GeneratorForm } from "@/components/forms/GeneratorForm";
import { QrPreview } from "@/components/qr/QrPreview";
import type { QrType } from "@/lib/qr/types";

export function GenerateClient({ type }: { type: QrType }) {
  const [data, setData] = useState("");

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <GeneratorForm type={type} onDataChange={setData} />
      <QrPreview data={data} />
    </div>
  );
}
