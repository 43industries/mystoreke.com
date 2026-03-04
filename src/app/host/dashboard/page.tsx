import Link from "next/link";

export const metadata = {
  title: "Host Dashboard — MyStoreKE",
  description:
    "A simple placeholder dashboard for MyStoreKE hosts to review their listings and activity.",
};

export default function HostDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-white/90">
            <Link href="/storage" className="hover:text-white">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-white">List Your Space</Link>
            <Link href="/become-a-driver" className="hover:text-white">Become a Driver</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Host Dashboard</h1>
        <p className="mt-4 text-[var(--muted)]">
          This is a simple placeholder view for hosts. In a full product, this is where you would
          see your active listings, upcoming bookings, and payout summaries.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Listings</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              View and manage your storage spaces and parcel drop-off points.
            </p>
            <Link
              href="/list-your-space"
              className="mt-3 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Create a new listing →
            </Link>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Activity</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              In a full version, see recent enquiries and bookings from renters.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Payouts</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Track what you&apos;ve earned and when your next payout is due.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

