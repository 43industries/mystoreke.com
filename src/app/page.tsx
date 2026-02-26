import Link from "next/link";
import Image from "next/image";
import HeroSearchForm from "./HeroSearchForm";

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

const STORAGE_TYPES_NAV = [
  {
    name: "Residential Storage",
    href: "/storage?type=residential",
    image: "/storage-residential.jpg",
    description: "Spare rooms, garages, and lockable units near you.",
  },
  {
    name: "Commercial Storage",
    href: "/storage?type=commercial",
    image: "/storage-commercial.jpg",
    description: "Stock rooms and business storage for SMEs and shops.",
  },
  {
    name: "Warehouse Storage",
    href: "/storage?type=warehouse",
    image: "/storage-warehouse.jpg",
    description: "Pallet bays and industrial warehouse space.",
  },
  {
    name: "Open Yard Storage",
    href: "/storage?type=yard",
    image: "/storage-yard.jpg",
    description: "Gated yards for vehicles, containers, and materials.",
  },
  {
    name: "Shelf Storage",
    href: "/storage?type=shelf",
    image: "/storage-shelf.jpg",
    description: "Pay-per-shelf space for cartons and inventory.",
  },
  {
    name: "Budget Units",
    href: "/storage?type=budget",
    image: "/storage-budget.jpg",
    description: "Affordable units for boxes, luggage, and more.",
  },
  {
    name: "Parcel Drop-Off Points",
    href: "/parcel-drop-off",
    image: "/storage-parcel.jpg",
    description: "Verified parcel drop-off and pick-up locations.",
  },
] as const;

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
    image: "/storage-commercial.jpg",
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
    image: "/storage-residential.jpg",
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
    image: "/storage-yard.jpg",
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
    image: "/storage-shelf.jpg",
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
    image: "/storage-parcel.jpg",
  },
];

const WHY_CHOOSE = [
  {
    title: "Secure & Verified",
    desc: "All spaces and drivers are verified. Your items and parcels are safe.",
  },
  {
    title: "Flexible Terms",
    desc: "Rent by day, week, or month. Choose what works for you.",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden fees. See total cost before you book.",
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock customer support when you need it.",
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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-[var(--primary)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-[var(--muted)]">
            <Link href="/storage" className="hover:text-[var(--foreground)]">
              Find Storage
            </Link>
            <Link href="/list-your-space" className="hover:text-[var(--foreground)]">
              List Your Space
            </Link>
            <Link href="/become-a-driver" className="hover:text-[var(--foreground)]">
              Become a Driver
            </Link>
            <Link href="/contact" className="hover:text-[var(--foreground)]">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--primary)] px-4 pb-20 pt-16 text-[var(--white)] md:pt-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Warehouse & Smart Storage for Every Need.
            </h1>
            <p className="mt-5 text-lg opacity-95 md:text-xl">
              Find secure warehouse bays, residential units, open yards, shelves, and parcel
              drop‑off points — all in one MyStoreKE platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Link
                href="/storage"
                className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Find Storage
              </Link>
              <Link
                href="/list-your-space"
                className="rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                List Your Space
              </Link>
              <Link
                href="/become-a-driver"
                className="rounded-lg border-2 border-white/80 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Become a Driver
              </Link>
            </div>
          </div>
          {/* Warehouse image card */}
          <div className="w-full max-w-md rounded-2xl bg-black/20 p-4 shadow-lg backdrop-blur md:self-stretch">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <Image
                src="/warehouse.svg"
                alt="Modern warehouse storage with secure bays"
                width={800}
                height={480}
                priority
                className="h-56 w-full object-cover md:h-64"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm opacity-90">
                Welcome to modern warehouse storage. Reserve secure bays with CCTV, guards, and
                gated access for pallets, inventory, and bulk goods.
              </p>
              <p className="mt-2 text-xs opacity-80">
                From small warehouse corners to full industrial spaces — choose the capacity that fits
                your business.
              </p>
              <Link
                href="/storage?type=warehouse"
                className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                Explore warehouse storage →
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <HeroSearchForm />
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
                <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-[var(--border)] md:h-44 lg:h-48">
                  <Image
                    src={box.image}
                    alt={box.title}
                    width={640}
                    height={360}
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
            Whether you need storage, have space to rent, or want to deliver — we’ve got you.
          </p>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
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
              <h3 className="text-lg font-semibold text-[var(--accent)]">For Hosts</h3>
              <ul className="mt-6 space-y-4">
                {HOST_STEPS.map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-white">
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">For Drivers</h3>
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

      {/* Storage Types Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Storage Types
              </h2>
              <p className="mt-2 text-[var(--muted)]">
                From small units to warehouses and parcel drop-off points.
              </p>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Scroll to explore options tailored to renters, hosts, and e‑commerce.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STORAGE_TYPES_NAV.map(({ name, href, image, description }) => (
              <Link
                key={name}
                href={href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--white)] shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-1 hover:border-[var(--primary)]/20 hover:shadow-lg hover:ring-[var(--primary)]/15"
              >
                <div className="relative h-32 w-full overflow-hidden bg-[var(--border)]">
                  <Image
                    src={image}
                    alt={name}
                    width={480}
                    height={260}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-80" />
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px]">
                      {name.charAt(0)}
                    </span>
                    <span>Storage Type</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] md:text-base">
                    {name}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--muted)] md:text-sm">{description}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-medium text-[var(--accent)] group-hover:text-[var(--accent-hover)] md:text-sm">
                    View available spaces
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            Why Choose MyStoreKE
          </h2>
          <p className="mt-2 text-center text-[var(--muted)]">
            Secure, modern, and built for trust
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-[var(--border)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Hosts CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-[var(--accent)] px-8 py-12 text-[var(--white)] md:px-12">
            <h2 className="text-2xl font-semibold">For Hosts</h2>
            <p className="mt-3 max-w-2xl opacity-95">
              List your residential, commercial, warehouse, yard, shelf, or budget storage. Add parcel drop-off and earn more. Set your own pricing and availability.
            </p>
            <Link
              href="/list-your-space"
              className="mt-6 inline-block rounded-lg bg-[var(--white)] px-6 py-3 font-medium text-[var(--accent)] transition-opacity hover:opacity-90"
            >
              List Your Space
            </Link>
          </div>
        </div>
      </section>

      {/* For Drivers CTA */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-[var(--primary)] px-8 py-12 text-[var(--white)] md:px-12">
            <h2 className="text-2xl font-semibold">For Drivers</h2>
            <p className="mt-3 max-w-2xl opacity-95">
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

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--foreground)] px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-semibold">Renters</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/storage" className="hover:text-white">Find Storage</Link></li>
                <li><Link href="/parcel-drop-off" className="hover:text-white">Parcel Drop-Off</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Hosts</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/list-your-space" className="hover:text-white">List Your Space</Link></li>
                <li><Link href="/host/dashboard" className="hover:text-white">Host Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Drivers</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/become-a-driver" className="hover:text-white">Become a Driver</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
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
