"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "./images";

const SLIDES: { src: string; title: string; alt: string }[] = [
  {
    src: IMAGES.storage.warehouse,
    title: "Warehouse Storage",
    alt: "Warehouse and pallet storage",
  },
  {
    src: IMAGES.storage.commercial,
    title: "Commercial Storage",
    alt: "Commercial storage space",
  },
  {
    src: IMAGES.storage.residential,
    title: "Residential Storage",
    alt: "Residential and garage storage",
  },
  {
    src: IMAGES.storage.yard,
    title: "Open Yard Storage",
    alt: "Open yard storage for vehicles and materials",
  },
  {
    src: IMAGES.storage.shelf,
    title: "Shared Shop/Shelf Space",
    alt: "Shared shop and shelf storage",
  },
  {
    src: IMAGES.storage.budget,
    title: "Budget Units",
    alt: "Affordable budget storage units",
  },
  {
    src: IMAGES.storage.parcel,
    title: "Pickup & Drop-Off Point Vendor",
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
          <Image
            key={slide.src + slide.title}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            priority={i === 0}
            className={`absolute inset-0 object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 z-[15] flex items-end justify-center pb-6 md:pb-10">
          <p
            key={SLIDES[index].title}
            className="max-w-[90%] text-center text-lg font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] md:text-2xl lg:text-3xl"
          >
            {SLIDES[index].title}
          </p>
        </div>
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
