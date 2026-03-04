import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — MyStoreKE",
  description: "Overview of how MyStoreKE handles data and privacy for renters, hosts, and drivers.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Privacy Policy</h1>
        <p className="mt-4 text-[var(--muted)]">
          This is a product-ready placeholder. Replace it with a full privacy policy that reflects
          your actual data flows and regulatory requirements.
        </p>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Information we may collect</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>Contact details such as name, email, and phone number.</li>
            <li>Listing information for storage spaces and parcel points.</li>
            <li>Basic analytics about how the platform is used.</li>
          </ul>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How information is used</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>To match renters with suitable hosts and drivers.</li>
            <li>To communicate about bookings, applications, and support.</li>
            <li>To improve the reliability and usability of the platform.</li>
          </ul>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Your choices</h2>
          <p className="text-sm text-[var(--muted)]">
            Users should be able to request updates or deletion of their data where appropriate. In a
            production setup, include contact methods and clear steps for making such requests.
          </p>
        </section>
      </main>
    </div>
  );
}

