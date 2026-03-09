/**
 * Site image paths — change these to switch photos.
 * Put your image files in the `public/` folder and use paths like "/your-photo.jpg"
 */

export const IMAGES = {
  /** Hero section (first blue block) — big warehouse photo */
  hero: "/warehouse-hero.png",

  /** Service cards on homepage — paths under public/ */
  storage: {
    commercial: "/storage-commercial.jpg",
    residential: "/storage-residential.jpg",
    yard: "/storage-yard.png",
    shelf: "/storage-shelf.png",
    parcel: "/storage-parcel.jpg",
  },
} as const;
