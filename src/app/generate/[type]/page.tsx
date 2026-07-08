import { notFound } from "next/navigation";

import { isQrType } from "@/lib/qr/types";
import { GenerateClient } from "./GenerateClient";

export default async function GenerateTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isQrType(type)) notFound();

  return <GenerateClient type={type} />;
}
