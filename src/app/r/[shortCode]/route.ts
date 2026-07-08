import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;
  const supabase = createAdminClient();

  const { data: qrCode } = await supabase
    .from("qr_codes")
    .select("id, target_url")
    .eq("short_code", shortCode)
    .eq("is_dynamic", true)
    .maybeSingle();

  if (!qrCode?.target_url) {
    return new Response("Not found", { status: 404 });
  }

  await supabase.from("qr_scans").insert({
    qr_code_id: qrCode.id,
    user_agent: request.headers.get("user-agent"),
  });

  return NextResponse.redirect(qrCode.target_url);
}
