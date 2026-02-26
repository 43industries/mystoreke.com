import Link from "next/link";
import StorageSearch from "./StorageSearch";

export const metadata = {
  title: "Find Storage — MyStoreKE",
  description: "Search storage spaces and parcel drop-off points. Filter by location and type.",
};

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--primary)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/list-your-space" className="hover:text-[var(--foreground)]">List Your Space</Link>
            <Link href="/become-a-driver" className="hover:text-[var(--foreground)]">Become a Driver</Link>
          </nav>
        </div>
      </header>
      <StorageSearch />
    </div>
  );
}
