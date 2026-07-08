-- Profiles: auth.users ile bire bir eşleşir
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Üretilen QR kodları
create table if not exists public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete cascade,
  type text not null,
  payload jsonb not null,
  style jsonb,
  is_dynamic boolean not null default false,
  target_url text,
  short_code text unique,
  created_at timestamptz not null default now()
);

alter table public.qr_codes enable row level security;

create policy "qr_codes_select_own" on public.qr_codes
  for select using (auth.uid() = user_id);

create policy "qr_codes_insert_own" on public.qr_codes
  for insert with check (auth.uid() = user_id);

create policy "qr_codes_update_own" on public.qr_codes
  for update using (auth.uid() = user_id);

create policy "qr_codes_delete_own" on public.qr_codes
  for delete using (auth.uid() = user_id);

create index if not exists qr_codes_short_code_idx on public.qr_codes (short_code);

-- Dinamik QR taramaları
create table if not exists public.qr_scans (
  id uuid primary key default gen_random_uuid(),
  qr_code_id uuid not null references public.qr_codes (id) on delete cascade,
  scanned_at timestamptz not null default now(),
  user_agent text,
  ip_hash text,
  country text
);

alter table public.qr_scans enable row level security;

create policy "qr_scans_select_owner" on public.qr_scans
  for select using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = qr_scans.qr_code_id
        and qr_codes.user_id = auth.uid()
    )
  );

create index if not exists qr_scans_qr_code_id_idx on public.qr_scans (qr_code_id);
