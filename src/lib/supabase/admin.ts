import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Yalnızca server-only kod (Route Handler'lar) içinde kullanılmalı — RLS'i bypass eder.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
