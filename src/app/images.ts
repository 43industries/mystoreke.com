/**
 * Site image paths — change these to switch photos.
 * Use paths like "/your-photo.jpg" for files in public/, or full URLs for external images.
 */

/** Delivery van — parcel / drop-off (Unsplash: Autotrader UK) */
const PARCEL_VAN =
  "https://images.unsplash.com/photo-1768393775846-6d0bd756a847?w=1200&q=80";

/** Home garage — residential storage (Unsplash: Parker Coffman) */
const RESIDENTIAL_GARAGE =
  "https://images.unsplash.com/photo-1704833414862-ee79382c146f?w=1200&q=80";

export const IMAGES = {
  /** Hero section (first blue block) — big warehouse photo */
  hero: "/warehouse-hero.png",

  /** Service cards on homepage */
  storage: {
    commercial: "/storage-commercial.jpg",
    residential: RESIDENTIAL_GARAGE,
    yard: "/storage-yard.png",
    shelf: "/storage-shelf.png",
    parcel: PARCEL_VAN,
  },

  /** Page hero banners — used on Find Storage, List Your Space, etc. */
  pages: {
    storage: "/warehouse-hero.png",
    listYourSpace: RESIDENTIAL_GARAGE,
    becomeDriver: PARCEL_VAN,
    about: "/warehouse-hero.png",
    howItWorks: "/storage-shelf.png",
    contact: "/storage-commercial.jpg",
    parcelDropOff: PARCEL_VAN,
  },
} as const;
