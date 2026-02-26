import Link from "next/link";
import HostListingForm from "./HostListingForm";

export const metadata = {
  title: "List Your Space — MyStoreKE",
  description: "List your storage space or parcel drop-off point. Earn by renting or receiving parcels.",
};

export default function ListYourSpacePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--primary)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/storage" className="hover:text-[var(--foreground)]">Find Storage</Link>
            <Link href="/become-a-driver" className="hover:text-[var(--foreground)]">Become a Driver</Link>
          </nav>
        </div>
      </header>
      <HostListingForm />
    </div>
  );
}
