/**
 * Site imagery — curated Unsplash photos (distinct per category, warm/pro look).
 * Swap any value to a file in `public/`, e.g. `/my-warehouse.jpg`, anytime.
 * Unsplash License: https://unsplash.com/license
 */

function unsplash(photoId: string) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1920&q=82`;
}

/** Hero + warehouse — wide aisle, pallets */
const WAREHOUSE = unsplash("photo-1586528116311-ad8dd3c8310d");
/** Commercial — bright workspace / back-office feel */
const COMMERCIAL = unsplash("photo-1497366754035-f200968a6e72");
/** Residential — home / garage-adjacent */
const RESIDENTIAL = unsplash("photo-1600585154340-be6161a56a0c");
/** Open yard — outdoor industrial */
const YARD = unsplash("photo-1504307651254-35680cd356ec");
/** Shop shelf — retail shelving */
const SHELF = unsplash("photo-1441986300917-64674bd600d8");
/** Budget — self-storage corridor */
const BUDGET = unsplash("photo-1527515637462-cff94eecc1ac");
/** Parcels — packages / counter */
const PARCEL = unsplash("photo-1566576721346-728fa0cab8e4");
/** Deliveries — logistics / truck */
const DELIVERIES = unsplash("photo-1578575437130-527eed3b6331");

export const IMAGES = {
  hero: WAREHOUSE,

  storage: {
    commercial: COMMERCIAL,
    residential: RESIDENTIAL,
    warehouse: WAREHOUSE,
    yard: YARD,
    shelf: SHELF,
    budget: BUDGET,
    parcel: PARCEL,
    deliveries: DELIVERIES,
  },

  pages: {
    storage: unsplash("photo-1553413077-190dd305871c"),
    listYourSpace: unsplash("photo-1600607687939-ce8a6c25118c"),
    becomeDriver: unsplash("photo-1449969018861-6c7df73d21a4"),
    about: unsplash("photo-1522071820081-009f0129c71c"),
    howItWorks: unsplash("photo-1454165804606-c868d4b03602"),
    contact: unsplash("photo-1423666639041-f56000c27a9a"),
    parcelDropOff: unsplash("photo-1558618047-3c8c76ca7d13"),
  },
} as const;
