import Link from "next/link";

export const metadata = {
  title: "Terms of Use — MyStoreKE",
  description: "Key terms for using the MyStoreKE platform as a renter, host, or driver.",
};

export default function TermsPage() {
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

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Terms of Use</h1>
        <p className="mt-4 text-[var(--muted)]">
          These simplified terms describe how you may use the MyStoreKE platform. For a production
          system, replace this copy with legal-reviewed terms tailored to your business.
        </p>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">1. Platform role</h2>
          <p className="text-sm text-[var(--muted)]">
            MyStoreKE is a marketplace that connects renters, hosts, and drivers. We do not own or
            operate the storage spaces or vehicles listed on the platform.
          </p>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">2. Your responsibilities</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>Provide accurate information when creating an account or listing.</li>
            <li>Comply with local laws, safety regulations, and property rules.</li>
            <li>Use written agreements and inventories for longer-term storage.</li>
          </ul>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">3. Payments and disputes</h2>
          <p className="text-sm text-[var(--muted)]">
            Payment and dispute processes depend on how you integrate MyStoreKE with your payment
            provider. Make sure you clearly communicate refund and cancellation policies to users.
          </p>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">4. Changes</h2>
          <p className="text-sm text-[var(--muted)]">
            These terms may evolve as the product grows. When you update them, make the effective
            date and key changes clear to users.
          </p>
        </section>
      </main>
    </div>
  );
}

