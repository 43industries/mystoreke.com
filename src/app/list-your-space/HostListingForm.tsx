"use client";

import { useState } from "react";
import Link from "next/link";

const STORAGE_TYPES = [
  "Residential Storage",
  "Commercial Storage",
  "Warehouse Storage",
  "Open Yard Storage",
  "Shelf Storage",
  "Budget Units",
  "Parcel Drop-Off Points",
];

const STEPS = [
  "Basic Information",
  "Space Details",
  "Pricing",
  "Photos",
  "Location",
  "Parcel Drop-Off (Optional)",
];

export default function HostListingForm() {
  const [step, setStep] = useState(1);
  const [offerParcelDropOff, setOfferParcelDropOff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    storageType: "",
    description: "",
    size: "",
    sizeUnit: "sqft",
    accessHours: "",
    securityCCTV: false,
    securityGuard: false,
    securityLockedUnit: false,
    securityGatedArea: false,
    securityAlarm: false,
    rentalMinDays: "",
    rentalMaxDays: "",
    pricePerDay: "",
    pricePerWeek: "",
    pricePerMonth: "",
    securityDeposit: "",
    longTermDiscount: false,
    photos: [] as File[],
    address: "",
    city: "",
    county: "",
    mapPin: "",
    parcelMaxSize: "",
    parcelOperatingHours: "",
    parcelNotificationSms: false,
    parcelNotificationApp: false,
    parcelNotificationEmail: false,
    parcelIdRequired: false,
    parcelMaxPerDay: "",
    parcelFeePerDay: "",
  });

  const update = (key: string, value: string | number | boolean | File[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const totalSteps = offerParcelDropOff ? 6 : 5;
  const canNext = step < totalSteps;
  const canPrev = step > 1;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Listing submitted</h2>
          <p className="mt-3 text-[var(--muted)]">
            Your space will be reviewed and go live shortly. We’ll notify you once it’s approved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Back to MyStoreKE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-sm font-medium text-[var(--primary)] hover:underline">
          ← Back to MyStoreKE
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
          List Your Space
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Step {step} of {totalSteps}: {STEPS[step - 1]}
        </p>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i + 1 <= step ? "bg-[var(--primary)]" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          if (canNext) {
            setStep(step + 1);
            return;
          }
          setSubmitError("");
          setLoading(true);
          try {
            const res = await fetch("/api/listings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: formData.title,
                storageType: formData.storageType,
                description: formData.description,
                size: formData.size || undefined,
                sizeUnit: formData.sizeUnit,
                accessHours: formData.accessHours,
                securityCCTV: formData.securityCCTV,
                securityGuard: formData.securityGuard,
                securityLockedUnit: formData.securityLockedUnit,
                securityGatedArea: formData.securityGatedArea,
                securityAlarm: formData.securityAlarm,
                rentalMinDays: formData.rentalMinDays || undefined,
                rentalMaxDays: formData.rentalMaxDays || undefined,
                pricePerDay: formData.pricePerDay || undefined,
                pricePerWeek: formData.pricePerWeek || undefined,
                pricePerMonth: formData.pricePerMonth || undefined,
                securityDeposit: formData.securityDeposit || undefined,
                longTermDiscount: formData.longTermDiscount,
                address: formData.address,
                city: formData.city,
                county: formData.county,
                mapPin: formData.mapPin || undefined,
                offerParcelDropOff,
                parcelMaxSize: formData.parcelMaxSize || undefined,
                parcelOperatingHours: formData.parcelOperatingHours || undefined,
                parcelNotificationSms: formData.parcelNotificationSms,
                parcelNotificationApp: formData.parcelNotificationApp,
                parcelNotificationEmail: formData.parcelNotificationEmail,
                parcelIdRequired: formData.parcelIdRequired,
                parcelMaxPerDay: formData.parcelMaxPerDay || undefined,
                parcelFeePerDay: formData.parcelFeePerDay || undefined,
                photoCount: formData.photos.length,
              }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
              setSubmitError(data.message || "Submission failed. Please try again.");
              return;
            }
            setSubmitted(true);
          } catch {
            setSubmitError("Network error. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
      >
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Basic Information</h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                Storage Title <span className="text-[var(--muted)]">(max 60 characters)</span>
              </label>
              <input
                type="text"
                maxLength={60}
                value={formData.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Secure 100 sqft unit in Industrial Area"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
              <p className="mt-1 text-xs text-[var(--muted)]">{formData.title.length}/60</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                Storage Type
              </label>
              <select
                value={formData.storageType}
                onChange={(e) => update("storageType", e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              >
                <option value="">Select type</option>
                {STORAGE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                Description <span className="text-[var(--muted)]">(min 100 words, 3 paragraphs)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Paragraph 1: Overview and location&#10;Paragraph 2: Features and access&#10;Paragraph 3: Ideal use and terms"
                rows={6}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
              <p className="mt-1 text-xs text-[var(--muted)]">
                ~{formData.description.trim().split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Space Details */}
        {step === 2 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Space Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Size</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={formData.size}
                    onChange={(e) => update("size", e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                  />
                  <select
                    value={formData.sizeUnit}
                    onChange={(e) => update("sizeUnit", e.target.value)}
                    className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="sqft">sqft</option>
                    <option value="sqm">sqm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Access Hours</label>
                <input
                  type="text"
                  value={formData.accessHours}
                  onChange={(e) => update("accessHours", e.target.value)}
                  placeholder="e.g. 6am - 8pm daily"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Security Features</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: "securityCCTV", label: "CCTV" },
                  { key: "securityGuard", label: "Guard" },
                  { key: "securityLockedUnit", label: "Locked Unit" },
                  { key: "securityGatedArea", label: "Gated Area" },
                  { key: "securityAlarm", label: "Alarm" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData[key as keyof typeof formData] as boolean}
                      onChange={(e) => update(key, e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Min Rental (days)</label>
                <input
                  type="number"
                  min={1}
                  value={formData.rentalMinDays}
                  onChange={(e) => update("rentalMinDays", e.target.value)}
                  placeholder="e.g. 7"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Max Rental (days)</label>
                <input
                  type="number"
                  min={1}
                  value={formData.rentalMaxDays}
                  onChange={(e) => update("rentalMaxDays", e.target.value)}
                  placeholder="e.g. 365 or leave blank"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Pricing</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Price per Day (KES)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.pricePerDay}
                  onChange={(e) => update("pricePerDay", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Price per Week (KES)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.pricePerWeek}
                  onChange={(e) => update("pricePerWeek", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Price per Month (KES)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.pricePerMonth}
                  onChange={(e) => update("pricePerMonth", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Security Deposit (KES)</label>
              <input
                type="number"
                min={0}
                value={formData.securityDeposit}
                onChange={(e) => update("securityDeposit", e.target.value)}
                placeholder="Optional"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.longTermDiscount}
                onChange={(e) => update("longTermDiscount", e.target.checked)}
                className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">Offer long-term discount</span>
            </label>
          </div>
        )}

        {/* Step 4: Photos */}
        {step === 4 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Photos</h2>
            <p className="text-sm text-[var(--muted)]">Minimum 3 photos. First image = cover. Drag and drop or click to upload.</p>
            <div
              className="rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
                setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
              }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photo-upload"
                onChange={(e) => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
                }}
              />
              <label htmlFor="photo-upload" className="cursor-pointer text-sm font-medium text-[var(--primary)] hover:underline">
                Click to upload
              </label>
              <p className="mt-1 text-xs text-[var(--muted)]">or drag and drop</p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                {formData.photos.length} photo(s) — first is cover. Min 3 required.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Location */}
        {step === 5 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Location</h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Street address"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">County</label>
                <input
                  type="text"
                  value={formData.county}
                  onChange={(e) => update("county", e.target.value)}
                  placeholder="e.g. Nairobi"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Google Map pin (optional)</label>
              <input
                type="text"
                value={formData.mapPin}
                onChange={(e) => update("mapPin", e.target.value)}
                placeholder="Paste map link or coordinates"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            {step === 5 && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={offerParcelDropOff}
                  onChange={(e) => setOfferParcelDropOff(e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm font-medium text-[var(--foreground)]">I also want to offer parcel drop-off at this location</span>
              </label>
            )}
          </div>
        )}

        {/* Step 6: Parcel Drop-Off (Optional) */}
        {step === 6 && (
          <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Parcel Drop-Off Details</h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Max parcel size</label>
              <input
                type="text"
                value={formData.parcelMaxSize}
                onChange={(e) => update("parcelMaxSize", e.target.value)}
                placeholder="e.g. 50cm x 50cm x 80cm"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Operating hours (parcel)</label>
              <input
                type="text"
                value={formData.parcelOperatingHours}
                onChange={(e) => update("parcelOperatingHours", e.target.value)}
                placeholder="e.g. 8am - 6pm Mon-Sat"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Notification method</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: "parcelNotificationSms", label: "SMS" },
                  { key: "parcelNotificationApp", label: "App" },
                  { key: "parcelNotificationEmail", label: "Email" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData[key as keyof typeof formData] as boolean}
                      onChange={(e) => update(key, e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.parcelIdRequired}
                onChange={(e) => update("parcelIdRequired", e.target.checked)}
                className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">ID required at pickup</span>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Max parcels per day</label>
                <input
                  type="number"
                  min={1}
                  value={formData.parcelMaxPerDay}
                  onChange={(e) => update("parcelMaxPerDay", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">Parcel storage fee per day (KES)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.parcelFeePerDay}
                  onChange={(e) => update("parcelFeePerDay", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>
        )}

        {submitError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
            {submitError}
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={!canPrev || loading}
            className="rounded-lg border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] disabled:opacity-50"
          >
            Previous
          </button>
          {canNext ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit Listing"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
