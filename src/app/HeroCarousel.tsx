"use client";

import { useEffect, useState } from "react";
import { IMAGES } from "./images";

const SLIDES: { src: string; alt: string }[] = [
  {
    src: IMAGES.hero,
    alt: "Warehouse and logistics — secure storage",
  },
  {
    src: IMAGES.storage.commercial,
    alt: "Commercial storage space",
  },
  {
    src: IMAGES.storage.residential,
    alt: "Residential and garage storage",
  },
  {
    src: IMAGES.storage.yard,
    alt: "Open yard storage for vehicles and materials",
  },
  {
    src: IMAGES.storage.shelf,
    alt: "Shelf and rack storage",
  },
  {
    src: IMAGES.storage.parcel,
    alt: "Parcel pickup and deliveries",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5500);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <div className="relative aspect-[21/9] w-full min-h-[12rem] md:min-h-[16rem] lg:min-h-[18rem]">
        {SLIDES.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        ))}
      </div>
      <div
        className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
