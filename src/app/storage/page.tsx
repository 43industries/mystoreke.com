import Link from "next/link";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import { IMAGES } from "../images";
import StorageSearch from "./StorageSearch";

export const metadata = {
  title: "Find Storage — Mystore",
  description:
    "Search storage spaces and parcel drop-off points. Filter by location and type.",
};

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-white/90">
            <Link href="/list-your-space" className="hover:text-white">List Your Space</Link>
            <Link href="/become-a-driver" className="hover:text-white">Become Driver/Rider</Link>
          </nav>
        </div>
      </header>
      <PageHero
        title="Find Storage"
        subtitle="Search by location and type. Compare options and book with confidence."
        imageSrc={IMAGES.pages.storage}
        imageAlt="Warehouse and storage space"
      />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 text-[var(--muted)]">Loading storage…</div>}>
        <StorageSearch />
      </Suspense>
    </div>
  );
}
