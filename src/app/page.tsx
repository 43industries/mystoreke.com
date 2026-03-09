import Link from "next/link";
import Image from "next/image";
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
];

const WHY_CHOOSE = [
  {
    title: "Secure & Verified",
    desc: "All spaces and drivers are verified. Your items and parcels are safe.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Flexible Terms",
    desc: "Rent by day, week, or month. Choose what works for you.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden fees. See total cost before you book.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75m15.75 0h.75a.75.75 0 01.75.75v.75m0 0h-3.375c-.621 0-1.125-.504-1.125-1.125" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock customer support when you need it.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
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
      {/* Header - navy with gold logo, white nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
<Logo variant="header" width={260} height={80} className="h-14 md:h-16" />
          <nav className="flex gap-6 text-sm font-medium text-white/90">
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
            <Image
              src={IMAGES.hero}
              alt="Modern warehouse — secure storage, shelving, and logistics"
              width={1200}
              height={520}
              priority
              className="h-48 w-full object-cover md:h-64 lg:h-80"
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
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    sizes="(max-width: 768px) 260px, 300px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
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

      {/* Why Choose Mystore - with graphics */}
      <section className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
            Why Choose MyStoreKE
          </h2>
          <p className="mt-2 text-center text-[var(--muted)]">
            Secure, modern, and built for trust
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ title, desc, icon }) => (
              <div
                key={title}
                className="rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  {icon}
                </div>
                <h3 className="mt-4 font-semibold text-[var(--foreground)]">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
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
            <Logo variant="footer" width={300} height={96} className="h-16 md:h-20" />
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
