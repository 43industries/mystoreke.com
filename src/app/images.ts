/**
 * Site image paths — local files in `public/`.
 * Keeping these local avoids remote host outages/rate-limits.
 */

const PARCEL_VAN = "/storage-parcel.jpg";
const RESIDENTIAL_GARAGE = "/storage-residential.jpg";
const WAREHOUSE_HERO = "/warehouse-hero.png";

export const IMAGES = {
  hero: WAREHOUSE_HERO,

  storage: {
    commercial: "/storage-commercial.jpg",
    residential: RESIDENTIAL_GARAGE,
    yard: "/storage-yard.jpg",
    shelf: "/storage-shelf.jpg",
    parcel: PARCEL_VAN,
  },

  pages: {
    storage: WAREHOUSE_HERO,
    listYourSpace: RESIDENTIAL_GARAGE,
    becomeDriver: PARCEL_VAN,
    about: WAREHOUSE_HERO,
    howItWorks: "/storage-shelf.jpg",
    contact: WAREHOUSE_HERO,
    parcelDropOff: PARCEL_VAN,
  },
} as const;
