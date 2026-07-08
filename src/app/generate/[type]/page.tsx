import { notFound } from "next/navigation";

import { isQrType, QR_TYPE_LABELS } from "@/lib/qr/types";
import { GenerateClient } from "./GenerateClient";

export default async function GenerateTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isQrType(type)) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <h1 className="text-2xl font-semibold">{QR_TYPE_LABELS[type]} QR Kodu Oluştur</h1>
      <GenerateClient type={type} />
    </div>
  );
}
