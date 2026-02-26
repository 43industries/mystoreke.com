import Link from "next/link";
import DriverApplicationForm from "./DriverApplicationForm";

export const metadata = {
  title: "Become a Driver — MyStoreKE",
  description: "Join as a verified delivery agent. Handle parcel pickup and drop-off. Earn on your schedule.",
};

export default function BecomeADriverPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--primary)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/storage" className="hover:text-[var(--foreground)]">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-[var(--foreground)]">List Your Space</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Become a Driver
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Join our network of verified delivery agents. Pick up and drop off parcels for renters and hosts. Set your availability and get paid per delivery.
        </p>
        <ul className="mt-8 space-y-3 text-[var(--foreground)]">
          <li className="flex gap-3">
            <span className="text-[var(--accent)]">✓</span>
            Flexible hours — work when you want
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--accent)]">✓</span>
            Verified status — build trust with users
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--accent)]">✓</span>
            Secure payouts — on-time payments
          </li>
        </ul>

        <div className="mt-10">
          <DriverApplicationForm />
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
        >
          ← Back to MyStoreKE
        </Link>
      </main>
    </div>
  );
}
