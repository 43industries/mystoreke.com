-- Reference schema for Mystore (run in Supabase SQL editor when setting up or migrating).
-- API routes use the service role and bypass RLS; the anon client still needs policies for direct reads.

-- Profiles (synced from the app via POST /api/profile after sign-up / log-in)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'renter' check (role in ('renter', 'host', 'driver')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_SELECT_own" on public.profiles;
create policy "profiles_SELECT_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_INSERT_own" on public.profiles;
create policy "profiles_INSERT_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_UPDATE_own" on public.profiles;
create policy "profiles_UPDATE_own" on public.profiles
  for update using (auth.uid() = id);

-- Driver application document columns (base64 data URLs or storage URLs)
alter table public.driver_applications
  add column if not exists vehicle_photo_url text;

alter table public.driver_applications
  add column if not exists logbook_photo_url text;

-- M-Pesa STK (Daraja). Requires public.bookings. Rows created on initiate; callback updates status.
create table if not exists public.mpesa_payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  renter_id uuid not null references auth.users (id) on delete cascade,
  amount_kes numeric not null,
  phone_normalized text not null,
  merchant_request_id text,
  checkout_request_id text unique,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed')),
  result_code int,
  result_desc text,
  mpesa_receipt_number text,
  callback_raw jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mpesa_payments_booking_id_idx on public.mpesa_payments (booking_id);
create index if not exists mpesa_payments_checkout_idx on public.mpesa_payments (checkout_request_id);

-- Parcel / delivery jobs (draft flow; expand for drivers later).
create table if not exists public.delivery_jobs (
  id uuid primary key default gen_random_uuid(),
  renter_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'draft'
    check (status in ('draft', 'quoted', 'assigned', 'in_transit', 'delivered', 'cancelled')),
  pickup_address text,
  dropoff_address text,
  parcel_description text,
  preferred_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists delivery_jobs_renter_idx on public.delivery_jobs (renter_id);
create index if not exists delivery_jobs_status_idx on public.delivery_jobs (status);

-- Optional overrides for public storage-type explainer copy (see /api/storage-type-details, /admin).
create table if not exists public.storage_service_copy (
  slug text primary key,
  description text not null,
  ideal_use text not null,
  updated_at timestamptz not null default now()
);

create index if not exists storage_service_copy_updated_idx on public.storage_service_copy (updated_at desc);
