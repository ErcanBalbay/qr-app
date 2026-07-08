import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { DashboardClient, type QrCodeRow } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("qr_codes")
    .select("id, type, payload, is_dynamic, target_url, short_code, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as QrCodeRow[];
  const dynamicIds = rows.filter((row) => row.is_dynamic).map((row) => row.id);

  const scanCounts: Record<string, number> = {};
  if (dynamicIds.length > 0) {
    const { data: scans } = await supabase
      .from("qr_scans")
      .select("qr_code_id")
      .in("qr_code_id", dynamicIds);
    for (const scan of scans ?? []) {
      scanCounts[scan.qr_code_id] = (scanCounts[scan.qr_code_id] ?? 0) + 1;
    }
  }

  return <DashboardClient rows={rows} scanCounts={scanCounts} />;
}
