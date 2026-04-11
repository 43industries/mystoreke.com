import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import HeroSearchForm from "./HeroSearchForm";
import Logo from "@/components/Logo";
import SiteHeader from "@/components/SiteHeader";
import { IMAGES } from "./images";

export const metadata: Metadata = {
  title: "Mystore — Smart Storage & Parcel Pickup / Drop-Off",
  description:
    "Find secure storage, parcel pickup and drop-off points, and drivers or riders across Kenya.",
  openGraph: {
    title: "Mystore — Smart Storage & Parcel Pickup / Drop-Off",
    description:
      "Find secure storage, parcel pickup and drop-off points, and drivers or riders across Kenya.",
    url: "https://mystoreke.com",
    siteName: "Mystore",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mystore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystore — Smart Storage & Parcel Pickup / Drop-Off",
    description:
      "Find secure storage, parcel pickup and drop-off points, and drivers or riders across Kenya.",
    images: ["/logo.png"],
  },
};

type Step = {
  step: number;
  title: string;
  desc: string;
};

type FocusBox = {
  title: string;
  description: string;
  href: string;
  tagline: string;
  highlights: string[];
  image: string;
};

const FOCUS_BOXES: FocusBox[] = [
  {
    title: "Residential Storage",
    description:
      "Spare rooms, garages, and outbuildings in trusted homes where you can keep furniture, boxes, and personal items safely for weeks or months at a time.",
    href: "/storage?type=residential",
    tagline: "For individuals and families",
    highlights: [
      "Ideal when moving, renovating, or decluttering",
      "Lockable rooms and garages in trusted homes",
    ],
    image: IMAGES.storage.residential,
  },
  {
    title: "Commercial Storage",
    description:
      "Dedicated back‑room and off‑site space for shops, SMEs, and offices that need extra room for stock, equipment, or records without paying for a full warehouse.",
    href: "/storage?type=commercial",
    tagline: "For shops, SMEs, and businesses",
    highlights: [
      "Near business districts for faster restocking",
      "Works well for retail, e‑commerce, and offices",
    ],
    image: IMAGES.storage.commercial,
  },
  {
    title: "Warehouse Storage",
    description:
      "Larger spaces in industrial and logistics areas with truck and pallet access — ideal for bulk inventory, dispatch, and longer-term business storage.",
    href: "/storage?type=warehouse",
    tagline: "For bulk stock and logistics",
    highlights: [
      "Industrial locations with loading access",
      "Suited to pallets and high-volume inventory",
    ],
    image: IMAGES.storage.warehouse,
  },
  {
    title: "Open Yard Storage",
    description:
      "Wide, gated outdoor yards where you can park trucks, containers, machinery, and construction materials that do not need an indoor unit.",
    href: "/storage?type=yard",
    tagline: "For vehicles and heavy materials",
    highlights: [
      "Fenced and gated outdoor spaces",
      "Truck‑friendly access for loading and off‑loading",
    ],
    image: IMAGES.storage.yard,
  },
  {
    title: "Shared Shop/Shelf Space",
    description:
      "Pay-per-shelf and rack space inside active shops and mini-warehouses, ideal for cartons, samples, and fast-moving e-commerce inventory.",
    href: "/storage?type=shelf",
    tagline: "For small merchants and e‑commerce",
    highlights: [
      "Pay only for the shelf space you actually use",
      "Perfect for smaller boxes and fast‑moving stock",
    ],
    image: IMAGES.storage.shelf,
  },
  {
    title: "Budget Units",
    description:
      "Lower-priced units with essential security for cost-conscious renters — practical when you need dependable space without premium extras.",
    href: "/storage?type=budget",
    tagline: "Affordable locked space",
    highlights: [
      "Straightforward pricing for everyday storage needs",
      "Great for students, overflow, and short stays",
    ],
    image: IMAGES.storage.budget,
  },
  {
    title: "Pickup & Drop-Off Point Vendor",
    description:
      "Verified counters and shops that act as pickup and drop-off points — clear hours for handoffs between customers, hosts, drivers, and third-party couriers.",
    href: "/storage?type=parcel",
    tagline: "For parcel pickup & drop-off",
    highlights: [
      "Nationwide parcel movement with riders, vans, and lorries",
      "Hosts coordinate safely with drivers and senders",
    ],
    image: IMAGES.storage.parcel,
  },
  {
    title: "Pickup & Deliveries",
    description:
      "Door-to-door pickup and delivery coordinated with verified drivers and riders on the Mystore network.",
    href: "/become-a-driver",
    tagline: "For drivers, riders, and senders",
    highlights: [
      "Pick up and drop at: your address, a host point, or the receiver",
      "Book pickup and drop-off in one flow as we roll out deliveries",
    ],
    image: IMAGES.storage.deliveries,
  },
];

const WHY_CHOOSE = [
  {
    label: "Verified listings",
    value: "Trust",
    detail: "Verified hosts and drivers",
    desc: "Hosts and drivers are reviewed so storage and deliveries stay safe and transparent. Real profiles and clear expectations before you book.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: "Clear pricing",
    value: "KES",
    detail: "Transparent rates before booking",
    desc: "See storage and parcel fees before you book — no hidden charges on listed rates. Compare day, week, and month options side by side.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m0-12.75H21" />
      </svg>
    ),
  },
  {
    label: "All in one place",
    value: "3-in-1",
    detail: "Storage + parcel + delivery",
    desc: "Storage units, pickup & drop-off points, and driver/rider deliveries on a single platform. One account for renting, hosting, or moving parcels.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Built for Kenya",
    value: "24/7",
    detail: "Local logistics ready",
    desc: "List, book, and track jobs from your phone — ready for M-Pesa and local logistics. Built for Kenyan cities, towns, and growing e-commerce volumes.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
] as const;

const RENTER_STEPS: Step[] = [
  {
    step: 1,
    title: "Search",
    desc: "Enter location, storage type, and rental duration",
  },
  {
    step: 2,
    title: "Compare",
    desc: "Browse listings, photos, and reviews",
  },
  {
    step: 3,
    title: "Book & Pay",
    desc: "Secure payment. Get confirmation instantly",
  },
  {
    step: 4,
    title: "Access",
    desc: "Use your space or drop parcels as agreed",
  },
];

const HOST_STEPS: Step[] = [
  {
    step: 1,
    title: "List Your Space",
    desc: "Add details, photos, and pricing",
  },
  {
    step: 2,
    title: "Get Verified",
    desc: "Quick verification for trust and visibility",
  },
  {
    step: 3,
    title: "Receive Bookings",
    desc: "Renters find you. You get notified",
  },
  {
    step: 4,
    title: "Earn",
    desc: "Get paid securely. Optional parcel pickup & drop-off income",
  },
];

const DRIVER_STEPS: Step[] = [
  {
    step: 1,
    title: "Apply",
    desc: "Submit details, ID, and a current photo (camera supported)",
  },
  {
    step: 2,
    title: "Get Verified",
    desc: "Background check and approval",
  },
  {
    step: 3,
    title: "Accept Jobs",
    desc: "Pick up and deliver parcels on your schedule",
  },
  {
    step: 4,
    title: "Get Paid",
    desc: "Earn per delivery. Payouts on time",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Found a secure warehouse in Nairobi within a day. Pricing was clear and the process was smooth.",
    author: "James K.",
    role: "Renter",
  },
  {
    quote:
      "Listing my garage was easy. I earn extra every month and now offer parcel drop-off too.",
    author: "Mary W.",
    role: "Host",
  },
  {
    quote:
      "Flexible hours and fair pay. Mystore handles the bookings; I just deliver.",
    author: "Peter O.",
    role: "Driver / Rider",
  },
] as const;

export default function Home() {

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader variant="home" />

      {/* Hero - 1st Blue Page: photos, headline, tagline, then search */}
      <section className="relative overflow-hidden bg-[var(--primary)] px-4 pb-20 pt-12 text-[var(--white)] md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Category slides — warehouse, commercial, residential, yard, shelf, parcel */}
          <HeroCarousel />
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Smart Storage for Every Need
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base opacity-95 md:text-lg">
              Secure storage, parcel pickup and drop-off, and deliveries — all in one Mystore platform.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/storage"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm hover:bg-[var(--accent-hover)]"
              >
                Find storage near me
              </Link>
              <Link
                href="/list-your-space"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                List your space
              </Link>
            </div>
          </div>
          {/* Search box */}
          <HeroSearchForm />
        </div>
      </section>

      {/* Focused welcome boxes for main offerings */}
      <section className="bg-[var(--white)] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">
                Welcome to Mystore Storage Network
              </h2>
              <p className="mt-2 max-w-2xl text-[var(--muted)]">
                Every storage type on Mystore uses the same clear structure — residential, commercial,
                warehouse, yard, shared shop/shelf space, budget units, parcel points, and deliveries —
                so renters, hosts, and drivers know what to expect before they book or list.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-base font-semibold text-[var(--foreground)] md:text-lg">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>Swipe to explore all services</span>
            </div>
          </div>
          <div className="mt-8 flex gap-6 overflow-x-auto pb-3 pt-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FOCUS_BOXES.map((box, index) => (
              <Link
                key={box.title}
                href={box.href}
                className={`group flex max-w-sm flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-md hover:ring-[var(--accent)]/20 ${
                  index === 0 ? "min-w-[340px]" : "min-w-[320px]"
                }`}
              >
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl bg-[var(--border)] md:h-48 lg:h-52">
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-4 pb-4 pt-12 text-center">
                    <h3 className="text-lg font-semibold text-white drop-shadow-md">
                      {box.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/95">
                      {box.tagline}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-base text-[var(--muted)]">{box.description}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
                  {box.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] group-hover:text-[var(--accent-hover)]">
                  View {box.title.toLowerCase()} options
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Renters / Hosts / Drivers */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            How It Works
          </h2>
          <p className="mt-2 text-center text-[var(--muted)]">
            Whether you need storage, have storage space to rent out, or want a parcel delivered — we’ve got you.
          </p>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)]">For Hosts</h3>
              <ul className="mt-6 space-y-4">
                {HOST_STEPS.map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-[var(--accent-foreground)]">
                      {step}
                    </span>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">{title}</div>
                      <div className="text-sm text-[var(--muted)]">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary)]">For Renters</h3>
              <ul className="mt-6 space-y-4">
                {RENTER_STEPS.map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-medium text-white">
                      {step}
                    </span>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">{title}</div>
                      <div className="text-sm text-[var(--muted)]">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--primary)] px-5 py-8 text-[var(--white)] lg:px-6">
              <h3 className="text-lg font-semibold text-white">For Pickup & Deliveries</h3>
              <ul className="mt-6 space-y-4">
                {DRIVER_STEPS.map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-medium text-white">
                      {step}
                    </span>
                    <div>
                      <div className="font-medium text-white">{title}</div>
                      <div className="text-sm text-white/85">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Mystore - metrics row */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            Why Choose Mystore
          </h2>
          <p className="mt-3 text-center text-xl text-[var(--muted)] md:text-2xl">
            Trust, transparent pricing, and a full logistics network in one place — with nationwide
            reach, flexible rental periods, and support when you need it.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ label, value, detail, desc, icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-[var(--border)] bg-[#FFF9F5] p-5 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  {icon}
                </div>
                <div className="text-xl font-semibold text-[var(--foreground)]">
                  {value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                  {label}
                </div>
                <p className="mt-2 text-base font-medium text-[var(--foreground)]">
                  {detail}
                </p>
                <p className="mt-2 text-base text-[var(--muted)]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Hosts & For Deliveries - side by side */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--accent)] px-8 py-12 text-[var(--accent-foreground)] md:px-12">
              <h2 className="text-2xl font-semibold">For Hosts</h2>
              <p className="mt-3 max-w-xl opacity-90">
                List your residential, commercial, warehouse, yard, shelf, or budget storage. Enable drivers and riders to coordinate parcel pickup and drop-off, and earn more. Set your own pricing and availability.
              </p>
              <Link
                href="/list-your-space"
                className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                List Your Space
              </Link>
            </div>
            <div className="rounded-2xl bg-[var(--primary)] px-8 py-12 text-[var(--white)] md:px-12">
              <h2 className="text-2xl font-semibold">Pickup & Deliveries</h2>
              <p className="mt-3 max-w-xl opacity-95">
                Become a verified driver or rider: handle parcel pickup and drop-off on your schedule, with fair pay per trip. Every applicant submits a current photo — you can take one live from your phone when you apply.
              </p>
              <Link
                href="/become-a-driver"
                className="mt-6 inline-block rounded-lg bg-[var(--white)] px-6 py-3 font-medium text-[var(--primary)] transition-opacity hover:opacity-90"
              >
                Become Driver/Rider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Trust */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            What People Say
          </h2>
          <p className="mt-2 text-center text-[var(--muted)]">
            Trusted by renters, hosts, drivers, and riders across Kenya
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, author, role }) => (
              <blockquote
                key={author}
                className="rounded-xl border border-[var(--border)] p-6"
              >
                <p className="text-[var(--foreground)]">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-medium text-[var(--muted)]">
                  — {author}, {role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - bottom blue section, all links populated */}
      <footer className="border-t border-[var(--border)] bg-[var(--primary)] px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Logo variant="footer" width={340} height={108} className="h-20 md:h-24" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-semibold">Renters</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/storage" className="hover:text-white">Find Storage</Link></li>
                <li><Link href="/parcel-drop-off" className="hover:text-white">Parcel Pickup & Drop-Off</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Hosts</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/list-your-space" className="hover:text-white">List Your Space</Link></li>
                <li><Link href="/host/dashboard" className="hover:text-white">Host Dashboard</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Pickup & Deliveries</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/become-a-driver" className="hover:text-white">Become Driver/Rider</Link></li>
                <li><Link href="/parcel-drop-off" className="hover:text-white">Parcel Pickup & Drop-Off</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <p className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/70">
            © {new Date().getFullYear()} Mystore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
