import Link from "next/link";

import { QR_TYPES, QR_TYPE_LABELS } from "@/lib/qr/types";

export default function GenerateIndexPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Ne tür bir QR kod oluşturmak istersin?</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QR_TYPES.map((type) => (
          <Link
            key={type}
            href={`/generate/${type}`}
            className="rounded-lg border border-gray-200 px-4 py-6 text-center text-sm font-medium hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
          >
            {QR_TYPE_LABELS[type]}
          </Link>
        ))}
      </div>
    </div>
  );
}
