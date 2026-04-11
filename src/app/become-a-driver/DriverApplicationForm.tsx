"use client";

import { useState } from "react";
import Link from "next/link";

const VEHICLE_TYPES = ["Motorcycle", "Car", "Van", "Pickup"];

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]";

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
  });
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [logbook, setLogbook] = useState<File | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);

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
    if (!idPhoto || !logbook || !vehiclePhoto) {
      setError(
        "Please add a selfie or ID photo, upload your logbook, and a photo of the vehicle showing the number plate.",
      );
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone.trim());
      fd.append("idType", formData.idType);
      fd.append("idNumber", formData.idNumber);
      fd.append("vehicleType", formData.vehicleType);
      fd.append("licensePlate", formData.licensePlate.trim());
      fd.append("areasServed", formData.areasServed);
      fd.append("availability", formData.availability);
      fd.append("message", formData.message);
      fd.append("idPhoto", idPhoto);
      fd.append("logbook", logbook);
      fd.append("vehiclePhoto", vehiclePhoto);

      const res = await fetch("/api/drivers", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data.message === "string"
            ? data.message
            : "Application failed. Please try again.",
        );
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Full name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              required
              className={inputClass}
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
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">ID type *</label>
            <select
              value={formData.idType}
              onChange={(e) => update("idType", e.target.value)}
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Additional message (optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => update("message", e.target.value)}
              rows={3}
              placeholder="Any other details for our team"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Photos & documents *</h2>
        <p className="text-sm text-[var(--muted)]">
          Take or upload a clear selfie or ID photo, a copy of your vehicle logbook (PDF or photo), and a photo of the vehicle with the number plate visible.
        </p>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Selfie / ID photo
            </label>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => setIdPhoto(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-medium file:text-white"
            />
            {idPhoto && (
              <p className="mt-1 text-xs text-[var(--muted)]">{idPhoto.name}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Logbook (photo or PDF)
            </label>
            <input
              type="file"
              accept="image/*,.pdf,application/pdf"
              onChange={(e) => setLogbook(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-medium file:text-white"
            />
            {logbook && (
              <p className="mt-1 text-xs text-[var(--muted)]">{logbook.name}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Vehicle with number plate
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => setVehiclePhoto(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-medium file:text-white"
            />
            {vehiclePhoto && (
              <p className="mt-1 text-xs text-[var(--muted)]">{vehiclePhoto.name}</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        By applying you agree to our Terms and that we may verify your ID, vehicle, and documents.
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
