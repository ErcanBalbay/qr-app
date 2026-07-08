import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
        QR Kod Üretici
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        Link, WiFi, kişi kartı ve daha fazlası için saniyeler içinde özelleştirilebilir QR kod
        oluştur.
      </p>
      <Link
        href="/generate"
        className="rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        QR Kod Oluştur
      </Link>
    </div>
  );
}
