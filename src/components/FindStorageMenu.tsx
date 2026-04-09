"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FIND_STORAGE_MENU } from "@/lib/storageNavTypes";

export default function FindStorageMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Find Storage
        <span className="text-[10px] opacity-80" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[min(100vw-2rem,17rem)] rounded-xl border border-[var(--border)] bg-[var(--white)] py-2 shadow-xl"
        >
          <Link
            role="menuitem"
            href="/storage"
            className="block px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background)]"
            onClick={() => setOpen(false)}
          >
            Browse all storage
          </Link>
          <div className="my-1 border-t border-[var(--border)]" />
          {FIND_STORAGE_MENU.map(({ slug, label }) => (
            <Link
              key={slug}
              role="menuitem"
              href={`/storage?type=${slug}`}
              className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--background)]"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
