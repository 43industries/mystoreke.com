"use client";

import { useState } from "react";
import Link from "next/link";

const VEHICLE_TYPES = ["Motorcycle", "Car", "Van", "Pickup"];

export default function DriverApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idType: "National ID",
    idNumber: "",
    vehicleType: "",
    licensePlate: "",
    areasServed: "",
    availability: "",
    message: "",
    photoDataUrl: "" as string,
    vehiclePhotoDataUrl: "" as string,
    logbookCopyDataUrl: "" as string,
  });

  const update = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\+?\d[\d\s+()-]{8,}$/.test(formData.phone.trim())) {
      setError("Please enter a valid phone number (e.g. +254 7XX XXX XXX).");
      return;
    }
    if (!formData.photoDataUrl || formData.photoDataUrl.length < 100) {
      setError("Please add a current photo of yourself (use your camera or upload an image).");
      return;
    }
    if (!formData.vehiclePhotoDataUrl || formData.vehiclePhotoDataUrl.length < 100) {
      setError("Please upload a clear photo of your vehicle.");
      return;
    }
    if (!formData.logbookCopyDataUrl || formData.logbookCopyDataUrl.length < 100) {
      setError("Please upload a copy photo of your vehicle logbook.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          photoDataUrl: formData.photoDataUrl,
          vehiclePhotoDataUrl: formData.vehiclePhotoDataUrl,
          logbookCopyDataUrl: formData.logbookCopyDataUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Application failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Application received
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          We’ll review your details and get back to you within 2–3 business days for verification and next steps.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
        >
          Back to Mystore
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-6 space-y-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Your details</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Current photo (required) *
          </label>
          <p className="mb-2 text-xs text-[var(--muted)]">
            Clear face photo for verification. On a phone you can use your camera; on desktop, upload a recent image.
          </p>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                update("photoDataUrl", "");
                return;
              }
              if (file.size > 500_000) {
                setError("Photo must be under 500 KB. Try a smaller image.");
                return;
              }
              setError("");
              const reader = new FileReader();
              reader.onload = () => {
                const url = typeof reader.result === "string" ? reader.result : "";
                update("photoDataUrl", url);
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-[var(--foreground)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          {formData.photoDataUrl ? (
            <img
              src={formData.photoDataUrl}
              alt="Your preview"
              className="mt-3 h-32 w-32 rounded-lg border border-[var(--border)] object-cover"
            />
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Vehicle photo (required) *
          </label>
          <p className="mb-2 text-xs text-[var(--muted)]">
            Upload a clear photo showing the full vehicle and plate area.
          </p>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                update("vehiclePhotoDataUrl", "");
                return;
              }
              if (file.size > 700_000) {
                setError("Vehicle photo must be under 700 KB.");
                return;
              }
              setError("");
              const reader = new FileReader();
              reader.onload = () => {
                const url = typeof reader.result === "string" ? reader.result : "";
                update("vehiclePhotoDataUrl", url);
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-[var(--foreground)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          {formData.vehiclePhotoDataUrl ? (
            <img
              src={formData.vehiclePhotoDataUrl}
              alt="Vehicle preview"
              className="mt-3 h-32 w-32 rounded-lg border border-[var(--border)] object-cover"
            />
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Logbook copy photo (required) *
          </label>
          <p className="mb-2 text-xs text-[var(--muted)]">
            Upload a readable photo of your logbook copy page for verification.
          </p>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                update("logbookCopyDataUrl", "");
                return;
              }
              if (file.size > 700_000) {
                setError("Logbook copy photo must be under 700 KB.");
                return;
              }
              setError("");
              const reader = new FileReader();
              reader.onload = () => {
                const url = typeof reader.result === "string" ? reader.result : "";
                update("logbookCopyDataUrl", url);
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-[var(--foreground)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          {formData.logbookCopyDataUrl ? (
            <img
              src={formData.logbookCopyDataUrl}
              alt="Logbook copy preview"
              className="mt-3 h-32 w-32 rounded-lg border border-[var(--border)] object-cover"
            />
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Full name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
              placeholder="e.g. +254 7XX XXX XXX"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">ID type *</label>
            <select
              value={formData.idType}
              onChange={(e) => update("idType", e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="National ID">National ID</option>
              <option value="Passport">Passport</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">ID number *</label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) => update("idNumber", e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-6 space-y-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Vehicle & availability</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Vehicle type *</label>
            <select
              value={formData.vehicleType}
              onChange={(e) => update("vehicleType", e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Select</option>
              {VEHICLE_TYPES.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">License plate *</label>
            <input
              type="text"
              value={formData.licensePlate}
              onChange={(e) => update("licensePlate", e.target.value)}
              required
              placeholder="e.g. KCA 123A"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Areas you can serve (cities/regions) *</label>
            <input
              type="text"
              value={formData.areasServed}
              onChange={(e) => update("areasServed", e.target.value)}
              required
              placeholder="e.g. Nairobi, Kiambu, Thika"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Availability (e.g. Mon–Sat 8am–6pm) *</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => update("availability", e.target.value)}
              required
              placeholder="e.g. Weekdays 9am - 5pm"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Additional message (optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => update("message", e.target.value)}
              rows={3}
              placeholder="Any other details for our team"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        By applying you agree to our Terms and that we may verify your ID and license. Document upload for verification will be requested after initial review.
      </p>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit application"}
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[var(--border)] bg-[var(--white)] px-5 py-3 text-sm font-medium text-[var(--foreground)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
