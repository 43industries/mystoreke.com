-- Listings table for MyStoreKE
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
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

-- Driver applications table
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
  submitted_at timestamptz not null default now()
);

