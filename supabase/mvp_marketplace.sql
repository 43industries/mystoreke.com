-- Mystore MVP marketplace — run once in Supabase SQL Editor (new project or idempotent refresh).
-- Order respects foreign keys: profiles → listings (host_id) → bookings → mpesa_payments.

-- ---------------------------------------------------------------------------
-- 1. Profiles (anon client RLS; API uses service role for upserts)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 2. Listings (host-owned; matches POST /api/listings + GET shape)
-- ---------------------------------------------------------------------------
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  storage_type text not null,
  description text not null,
  size integer,
  size_unit text not null default 'sqft',
  access_hours text,
  rental_min_days integer,
  rental_max_days integer,
  price_per_day numeric,
  price_per_week numeric,
  price_per_month numeric,
  security_deposit numeric,
  long_term_discount boolean not null default false,
  address text not null,
  city text not null,
  county text not null,
  map_pin text,
  security text[] default '{}',
  parcel_drop_off boolean not null default false,
  parcel_max_size text,
  parcel_operating_hours text,
  parcel_notification_sms boolean not null default false,
  parcel_notification_app boolean not null default false,
  parcel_notification_email boolean not null default false,
  parcel_id_required boolean not null default false,
  parcel_max_per_day integer,
  parcel_fee_per_day numeric,
  rating numeric,
  review_count integer,
  created_at timestamptz not null default now()
);

-- Older installs: add host_id if table existed without it
alter table public.listings
  add column if not exists host_id uuid references auth.users (id) on delete cascade;

create index if not exists listings_host_id_idx on public.listings (host_id);
create index if not exists listings_created_at_idx on public.listings (created_at desc);

-- ---------------------------------------------------------------------------
-- 3. Driver applications (multipart /api/drivers)
-- ---------------------------------------------------------------------------
create table if not exists public.driver_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  id_type text not null,
  id_number text not null,
  vehicle_type text not null,
  license_plate text not null,
  areas_served text not null,
  availability text not null,
  message text,
  submitted_at timestamptz not null default now(),
  id_photo_url text,
  logbook_url text,
  vehicle_photo_url text
);

-- ---------------------------------------------------------------------------
-- 4. Bookings (renter ↔ listing; status flow + M-Pesa callback)
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  renter_id uuid not null references auth.users (id) on delete cascade,
  listing_id uuid not null references public.listings (id) on delete restrict,
  start_date date not null,
  end_date date not null,
  duration_unit text not null
    check (duration_unit in ('day', 'week', 'month')),
  total_price numeric not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_renter_id_idx on public.bookings (renter_id);
create index if not exists bookings_listing_id_idx on public.bookings (listing_id);
create index if not exists bookings_status_idx on public.bookings (status);

-- ---------------------------------------------------------------------------
-- 5. M-Pesa STK rows (requires bookings)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 6. Delivery jobs (draft API)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 7. Optional admin copy overrides
-- ---------------------------------------------------------------------------
create table if not exists public.storage_service_copy (
  slug text primary key,
  description text not null,
  ideal_use text not null,
  updated_at timestamptz not null default now()
);

create index if not exists storage_service_copy_updated_idx on public.storage_service_copy (updated_at desc);

-- ---------------------------------------------------------------------------
-- 8. Contact form (POST /api/contact — server uses service role only)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
