"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, company }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.message === "string" ? json.message : "Send failed.");
        return;
      }
      setDone(true);
      setName("");
      setContact("");
      setMessage("");
      setCompany("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-6"
        role="status"
      >
        <p className="text-sm font-medium text-[var(--foreground)]">Message sent</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Thanks — we&apos;ll get back to you using the email or phone you provided.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline"
          onClick={() => setDone(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="mt-4 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6"
      onSubmit={handleSubmit}
    >
      <p className="sr-only" aria-hidden>
        Leave this field empty: company
      </p>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-medium text-[var(--foreground)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label
            htmlFor="contact-reach"
            className="mb-1 block text-sm font-medium text-[var(--foreground)]"
          >
            Email or phone
          </label>
          <input
            id="contact-reach"
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="How we can reach you"
            autoComplete="email"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how we can help"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
