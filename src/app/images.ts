/**
 * Site imagery.
 *
 * Storage-category photos use local files in `public/` so the homepage never
 * depends on a remote CDN (Unsplash occasionally retires photo IDs, which was
 * blanking out yard / parcel / deliveries cards previously).
 *
 * Page heroes still use Unsplash; the IDs below have all been verified to
 * return HTTP 200. Swap any value for a file in `public/` to host it locally.
 * Unsplash License: https://unsplash.com/license
 */

function unsplash(photoId: string) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1920&q=82`;
}

const WAREHOUSE = "/warehouse-hero.png";
const COMMERCIAL = "/storage-commercial.jpg";
const RESIDENTIAL = "/storage-residential.jpg";
const YARD = "/storage-yard.jpg";
const SHELF = "/storage-shelf.jpg";
const PARCEL = "/storage-parcel.jpg";
/** Budget — self-storage corridor (no local copy yet) */
const BUDGET = unsplash("photo-1527515637462-cff94eecc1ac");
/** Deliveries — logistics / van (no local copy yet) */
const DELIVERIES = unsplash("photo-1580674684081-7617fbf3d745");

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
    listYourSpace: unsplash("photo-1568605114967-8130f3a36994"),
    becomeDriver: unsplash("photo-1601584115197-04ecc0da31d7"),
    about: unsplash("photo-1522071820081-009f0129c71c"),
    howItWorks: unsplash("photo-1556761175-5973dc0f32e7"),
    contact: unsplash("photo-1423666639041-f56000c27a9a"),
    parcelDropOff: unsplash("photo-1607082348824-0a96f2a4b9da"),
  },
} as const;
