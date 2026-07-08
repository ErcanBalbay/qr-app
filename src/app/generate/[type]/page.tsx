import { notFound } from "next/navigation";

import { QR_TYPE_ICONS } from "@/lib/qr/icons";
import { isQrType, QR_TYPE_LABELS } from "@/lib/qr/types";
import { GenerateClient } from "./GenerateClient";

export default async function GenerateTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isQrType(type)) notFound();

  const Icon = QR_TYPE_ICONS[type];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
          <Icon className="h-5 w-5" />
        </span>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {QR_TYPE_LABELS[type]} QR Kodu Oluştur
        </h1>
      </div>
      <GenerateClient type={type} />
    </div>
  );
}
