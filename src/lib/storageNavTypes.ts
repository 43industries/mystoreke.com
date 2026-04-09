/**
 * URL slugs for /storage?type=… — must match keys in STORAGE_TYPE_DETAILS.
 */
export const FIND_STORAGE_MENU = [
  { slug: "residential", label: "Residential Storage" },
  { slug: "commercial", label: "Commercial Storage" },
  { slug: "warehouse", label: "Warehouse Storage" },
  { slug: "yard", label: "Open Yard Storage" },
  { slug: "shelf", label: "Shared Shop/Shelf Space" },
  { slug: "budget", label: "Budget Units" },
  { slug: "parcel", label: "Pickup & Drop-Off Point Vendor" },
] as const;
