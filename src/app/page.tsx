import Link from "next/link";
import HeroSearchForm from "./HeroSearchForm";
import Logo from "@/components/Logo";
import { IMAGES } from "./images";

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
    title: "Shelf Storage",
    description:
      "Pay‑per‑shelf and rack space inside shops and warehouses, ideal for cartons, product samples, and fast‑moving e‑commerce inventory.",
    href: "/storage?type=shelf",
    tagline: "For small merchants and e‑commerce",
    highlights: [
      "Pay only for the shelf space you actually use",
      "Perfect for smaller boxes and fast‑moving stock",
    ],
    image: IMAGES.storage.shelf,
  },
  {
    title: "Drop‑Off Points",
    description:
      "Verified counters and kiosks where customers and business owners can leave or collect parcels and goods — from small packages to loads moved by lorries across the country.",
    href: "/storage?type=parcel",
    tagline: "For nationwide parcel movement",
    highlights: [
      "Supports customer and business parcel drop‑off for delivery across Kenya",
      "Works with riders, vans, and lorries for regional and national transport",
    ],
    image: IMAGES.storage.parcel,
  },
  {
    title: "Deliveries",
    description:
      "Door-to-door parcel pick-up and drop-at services coordinated with verified drivers on the MyStoreKE network.",
    href: "/become-a-driver",
    tagline: "For pick-up and drop-at",
    highlights: [
      "Request parcel pick-up from your location",
      "Coordinate drop-at with trusted drivers and hosts",
    ],
    image: IMAGES.storage.parcel,
  },
];

const WHY_CHOOSE = [
  {
    label: "Properties",
    value: "150+",
    desc: "Storage spaces and parcel points across Kenya.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4.5l9 5.25M4.5 10.5v9A1.5 1.5 0 006 21h12a1.5 1.5 0 001.5-1.5v-9" />
      </svg>
    ),
  },
  {
    label: "Customers",
    value: "5,000+",
    desc: "Renters and hosts who have used modern storage options.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.125A3.375 3.375 0 0018.375 15.75M12 14.25a3.375 3.375 0 10-3.375-3.375A3.375 3.375 0 0012 14.25zm0 0c-2.899 0-5.25 1.57-5.25 3.5V19.5h10.5v-1.75c0-1.93-2.351-3.5-5.25-3.5z" />
      </svg>
    ),
  },
  {
    label: "Locations",
    value: "20+",
    desc: "Neighborhoods and towns with verified spaces and hosts.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Average rating",
    value: "4.8",
    desc: "Hosts and drivers rated highly for reliability and service.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5a.75.75 0 011.04 0l2.122 2.122a.75.75 0 00.53.22H18a.75.75 0 01.53 1.28l-1.592 1.592a.75.75 0 00-.22.53v2.828a.75.75 0 01-1.28.53L12 11.25l-3.438 3.437a.75.75 0 01-1.28-.53V11.33a.75.75 0 00-.22-.53L5.47 8.622A.75.75 0 016 7.342h2.828a.75.75 0 00.53-.22L11.48 3.5z" />
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
    desc: "Get paid securely. Optional parcel drop-off income",
  },
];

const DRIVER_STEPS: Step[] = [
  {
    step: 1,
    title: "Apply",
    desc: "Submit details and documents",
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
      "Flexible hours and fair pay. MyStoreKE handles the bookings; I just deliver.",
    author: "Peter O.",
    role: "Driver",
  },
] as const;

export default function Home() {

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header - navy with logo and nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
          <Logo variant="header" className="h-10 shrink-0 md:h-12" />
          <nav className="flex shrink-0 gap-6 text-sm font-medium text-white/90">
            <Link href="/storage" className="hover:text-white">
              Find Storage
            </Link>
            <Link href="/list-your-space" className="hover:text-white">
              List Your Space
            </Link>
            <Link href="/become-a-driver" className="hover:text-white">
              Become a Driver
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero - 1st Blue Page: big warehouse photo, headline, tagline, then search */}
      <section className="relative overflow-hidden bg-[var(--primary)] px-4 pb-20 pt-12 text-[var(--white)] md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Big warehouse photo */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.hero}
              alt="Modern warehouse — secure storage, shelving, and logistics"
              className="h-48 w-full object-cover md:h-64 lg:h-80"
              fetchPriority="high"
            />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Smart Storage for Every Need
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg opacity-95 md:text-xl">
              Find secure storage space, and your goods and parcels dropped all in one Mystore platform.
            </p>
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
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Welcome to MyStoreKE Storage Network
              </h2>
              <p className="mt-2 max-w-2xl text-[var(--muted)]">
                Five core services — each clearly structured so renters, hosts, and drivers know
                exactly what to expect from MyStoreKE before they book or list.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>Swipe to explore all services</span>
            </div>
          </div>
          <div className="mt-8 flex gap-6 overflow-x-auto pb-3 pt-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FOCUS_BOXES.map((box) => (
              <Link
                key={box.title}
                href={box.href}
                className="group flex min-w-[260px] max-w-xs flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-md hover:ring-[var(--accent)]/20 md:min-w-[280px] lg:min-w-[300px]"
              >
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-[var(--border)] md:h-44 lg:h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={box.image}
                    alt={box.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {box.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {box.tagline}
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{box.description}</p>
                <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
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
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">For Goods & Parcel Deliveries</h3>
              <ul className="mt-6 space-y-4">
                {DRIVER_STEPS.map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-medium text-white">
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
          </div>
        </div>
      </section>

      {/* Why Choose MyStoreKE - metrics row */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            Why Choose MyStoreKE
          </h2>
          <p className="mt-2 text-center text-[var(--muted)]">
            Clear numbers behind our storage and parcel network.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ label, value, desc, icon }) => (
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
                <p className="mt-2 text-xs text-[var(--muted)]">
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
                List your residential, commercial, warehouse, yard, shelf, or budget storage. Add parcel drop-off and earn more. Set your own pricing and availability.
              </p>
              <Link
                href="/list-your-space"
                className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                List Your Space
              </Link>
            </div>
            <div className="rounded-2xl bg-[var(--primary)] px-8 py-12 text-[var(--white)] md:px-12">
              <h2 className="text-2xl font-semibold">For Deliveries</h2>
              <p className="mt-3 max-w-xl opacity-95">
                Become a verified delivery agent. Handle parcel pickup and drop-off on your schedule. Get paid per delivery with secure, on-time payouts.
              </p>
              <Link
                href="/become-a-driver"
                className="mt-6 inline-block rounded-lg bg-[var(--white)] px-6 py-3 font-medium text-[var(--primary)] transition-opacity hover:opacity-90"
              >
                Become a Driver
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
            Trusted by renters, hosts, and drivers across Kenya
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
                <li><Link href="/parcel-drop-off" className="hover:text-white">Parcel Drop-Off</Link></li>
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
              <h4 className="font-semibold">Deliveries</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/become-a-driver" className="hover:text-white">Become a Driver</Link></li>
                <li><Link href="/parcel-drop-off" className="hover:text-white">Parcel Drop-Off</Link></li>
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
            © {new Date().getFullYear()} MyStoreKE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
