/**
 * Site image paths — change these to switch photos.
 * Put your image files in the `public/` folder and use paths like "/your-photo.jpg"
 */

export const IMAGES = {
  /** Hero section (first blue block) — big warehouse photo */
  hero: "/warehouse-hero.png",

  /** Service cards on homepage — real photos for yard & shelf; SVGs for the rest until you add more */
  storage: {
    commercial: "/storage-commercial.svg",
    residential: "/storage-residential.svg",
    yard: "/storage-yard.png",
    shelf: "/storage-shelf.png",
    parcel: "/storage-parcel.svg",
  },
} as const;
