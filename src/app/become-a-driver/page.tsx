import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteHeader from "@/components/SiteHeader";
import { IMAGES } from "../images";
import DriverApplicationForm from "./DriverApplicationForm";

export const metadata = {
  title: "Become Driver/Rider — Mystore",
  description: "Join as a verified delivery agent. Handle parcel pickup and drop-off. Earn on your schedule.",
};

export default function BecomeADriverPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <PageHero
        title="Become Driver/Rider"
        subtitle="Join our network of verified delivery agents. Earn on your schedule."
        imageSrc={IMAGES.pages.becomeDriver}
        imageAlt="Parcel and delivery"
      />

      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Become Driver/Rider
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Join our network of verified delivery agents. Pick up and drop off parcels for renters and hosts. Set your availability and get paid per delivery.
        </p>
        <ul className="mt-8 space-y-3 text-[var(--foreground)]">
          <li className="flex gap-3">
            <span className="text-[var(--accent)]">✓</span>
            Current photo required — take one live with your camera or upload
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--accent)]">✓</span>
            Vehicle photo and logbook copy photo required for faster verification
          </li>
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
          ← Back to Mystore
        </Link>
      </main>
    </div>
  );
}
