import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SiteHeader from "@/components/SiteHeader";
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
      <SiteHeader />
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
