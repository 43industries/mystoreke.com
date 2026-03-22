/**
 * Site image paths — files in `public/` or Unsplash URLs.
 */

/** Delivery van — parcel / deliveries */
const PARCEL_VAN =
  "https://images.unsplash.com/photo-1768393775846-6d0bd756a847?w=1200&q=85&auto=format&fit=crop";

/** Home garage — residential storage */
const RESIDENTIAL_GARAGE =
  "https://images.unsplash.com/photo-1704833414862-ee79382c146f?w=1200&q=85&auto=format&fit=crop";

/** Hero / warehouse — sharp, well-lit distribution-style photo */
const WAREHOUSE_HERO =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=90&auto=format&fit=crop";

export const IMAGES = {
  hero: WAREHOUSE_HERO,

  storage: {
    commercial: "/storage-commercial.svg",
    residential: RESIDENTIAL_GARAGE,
    yard: "/storage-yard.svg",
    shelf: "/storage-shelf.svg",
    parcel: PARCEL_VAN,
  },

  pages: {
    storage: WAREHOUSE_HERO,
    listYourSpace: RESIDENTIAL_GARAGE,
    becomeDriver: PARCEL_VAN,
    about: WAREHOUSE_HERO,
    howItWorks: "/storage-shelf.svg",
    contact: WAREHOUSE_HERO,
    parcelDropOff: PARCEL_VAN,
  },
} as const;
