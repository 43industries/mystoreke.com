import PageHero from "@/components/PageHero";
import SiteHeader from "@/components/SiteHeader";
import { IMAGES } from "../images";

export const metadata = {
  title: "Contact Mystore",
  description: "Get in touch with the Mystore team for support, partnerships, or questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <PageHero
        title="Contact Us"
        subtitle="We're here to help with storage, hosting, or driving."
        imageSrc={IMAGES.pages.contact}
        imageAlt="Mystore — get in touch"
      />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="mt-4 text-[var(--muted)]">
          Have a question about storage, hosting, or driving with Mystore? Reach out and we’ll
          respond as soon as possible.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Support</h2>
            <p className="text-sm text-[var(--muted)]">
              For help with bookings, listings, or issues on the platform.
            </p>
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">Email:</span>{" "}
              support@mystoreke.com
            </p>
          </div>
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Partnerships</h2>
            <p className="text-sm font-medium text-[var(--foreground)]">
              We partner with:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
              <li>Commercial storage space owners</li>
              <li>Residential storage space owners</li>
              <li>Open yard space owners</li>
              <li>Shared shop/shelf space owners</li>
              <li>Pickup/drop-off point vendors</li>
              <li>Drivers</li>
              <li>Riders</li>
            </ul>
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">Email:</span>{" "}
              partnerships@mystoreke.com
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Quick message</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Share a short message and how we can reach you. We’ll follow up with more details.
          </p>
          <form className="mt-4 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label htmlFor="contact-reach" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                  Email or phone
                </label>
                <input
                  id="contact-reach"
                  type="text"
                  placeholder="How we can reach you"
                  autoComplete="email"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Tell us how we can help"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <p className="text-xs text-[var(--muted)]">
              This form is for demonstration only. For production, connect it to your preferred
              support inbox or CRM.
            </p>
            <button
              type="button"
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
            >
              Send message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

