"use client";

import { useCallback, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const SLUGS = [
  "residential",
  "commercial",
  "warehouse",
  "yard",
  "shelf",
  "budget",
  "parcel",
] as const;

type Defaults = Record<
  string,
  { label: string; description: string; idealUse: string }
>;

type Override = { description: string; idealUse: string };

export default function AdminServiceCopyEditor() {
  const [defaults, setDefaults] = useState<Defaults | null>(null);
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [slug, setSlug] = useState<string>(SLUGS[0]);
  const [description, setDescription] = useState("");
  const [idealUse, setIdealUse] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applySlugFields = useCallback(
    (s: string, defs: Defaults, ovr: Record<string, Override>) => {
      const o = ovr[s];
      setDescription(o?.description ?? defs[s]?.description ?? "");
      setIdealUse(o?.idealUse ?? defs[s]?.idealUse ?? "");
    },
    [],
  );

  const load = useCallback(async () => {
    if (!supabaseBrowser) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setError("Log in with an admin account.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/storage-service-copy", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json.message || "Could not load copy.");
      setLoading(false);
      return;
    }
    const defs = json.defaults as Defaults;
    const ovr = (json.overrides ?? {}) as Record<string, Override>;
    setDefaults(defs);
    setOverrides(ovr);
    const initialSlug = SLUGS[0];
    setSlug(initialSlug);
    applySlugFields(initialSlug, defs, ovr);
    setLoading(false);
  }, [applySlugFields]);

  useEffect(() => {
    void load();
  }, [load]);

  const onSave = async () => {
    setMessage(null);
    setError(null);
    if (!supabaseBrowser) return;
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setError("Not signed in.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/storage-service-copy", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug, description, idealUse }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Save failed.");
        return;
      }
      setOverrides((prev) => ({
        ...prev,
        [slug]: { description: description.trim(), idealUse: idealUse.trim() },
      }));
      setMessage("Saved. Public search pages will use this text on next load.");
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="mt-10 text-sm text-[var(--muted)]">Loading service copy…</p>
    );
  }

  if (error && !defaults) {
    return <p className="mt-10 text-sm text-red-600">{error}</p>;
  }

  return (
    <section className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Storage service descriptions
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Edits apply to the &ldquo;About [type]&rdquo; block on Find Storage. Requires the{" "}
        <span className="font-mono text-xs">storage_service_copy</span> table in Supabase (see{" "}
        <span className="font-mono text-xs">supabase/schema.sql</span>).
      </p>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Service (slug)
          </label>
          <select
            value={slug}
            onChange={(e) => {
              const s = e.target.value;
              setSlug(s);
              if (defaults) {
                applySlugFields(s, defaults, overrides);
              }
            }}
            className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {SLUGS.map((s) => (
              <option key={s} value={s}>
                {defaults?.[s]?.label ?? s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Ideal for
          </label>
          <textarea
            value={idealUse}
            onChange={(e) => setIdealUse(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={() => void onSave()}
          className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save description"}
        </button>
      </div>
    </section>
  );
}
