import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions — MyStoreKE",
  description: "Answers to common questions from renters, hosts, and drivers using MyStoreKE.",
};

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is MyStoreKE?",
    answer:
      "MyStoreKE is a platform that connects people who need storage or parcel drop-off points with verified hosts and drivers across Kenya.",
  },
  {
    question: "How do I find storage?",
    answer:
      "Use the Find Storage search to filter by location, storage type, and other options. Browse available spaces, then contact the host or follow the booking flow provided.",
  },
  {
    question: "How do I list my space?",
    answer:
      "Go to the List Your Space page and complete the step-by-step form. Provide clear photos, accurate descriptions, and pricing so renters know exactly what to expect.",
  },
  {
    question: "How do drivers get paid?",
    answer:
      "Drivers receive payouts based on completed jobs. Payment terms are agreed in advance and can be settled via mobile money or bank transfer depending on your setup.",
  },
  {
    question: "Is my property or inventory safe?",
    answer:
      "Hosts are encouraged to offer clear security features like CCTV, guards, and gated access. Always review listing details and ratings, and use written agreements for long-term storage.",
  },
];

export default function FAQPage() {
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
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Frequently Asked Questions</h1>
        <p className="mt-4 text-[var(--muted)]">
          Quick answers to the most common questions about using MyStoreKE as a renter, host, or
          driver.
        </p>

        <dl className="mt-8 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5"
            >
              <dt className="text-sm font-semibold text-[var(--foreground)]">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm text-[var(--muted)]">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-sm text-[var(--muted)]">
          Still have questions?{" "}
          <Link href="/contact" className="font-medium text-[var(--primary)] hover:underline">
            Contact us
          </Link>{" "}
          and we’ll be happy to help.
        </p>
      </main>
    </div>
  );
}

