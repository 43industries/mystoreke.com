export const STORAGE_TYPES = [
  "Residential Storage",
  "Commercial Storage",
  "Warehouse Storage",
  "Open Yard Storage",
  "Shelf Storage",
  "Budget Units",
  "Parcel Drop-Off Points",
] as const;

export type StorageType = (typeof STORAGE_TYPES)[number];

// Simple in-memory "database" for storage type descriptions
export const STORAGE_TYPE_DETAILS: Record<
  string,
  {
    label: StorageType;
    description: string;
    idealUse: string;
  }
> = {
  residential: {
    label: "Residential Storage",
    description:
      "Secure spare rooms, garages, and home units suitable for boxes, furniture, and household items. Great when you are moving, renovating, or decluttering and need a clean, locked space close to home.",
    idealUse: "Household items, seasonal items, personal belongings.",
  },
  commercial: {
    label: "Commercial Storage",
    description:
      "Dedicated space for shops, SMEs, and businesses that need extra back‑room or off‑site storage for stock, equipment, or documents. Often closer to business districts with better loading access.",
    idealUse: "Retail stock, documents, small equipment, business supplies.",
  },
  warehouse: {
    label: "Warehouse Storage",
    description:
      "Larger spaces in industrial or logistics areas with better access for trucks and pallets. Ideal for businesses with pallets, bulk inventory, or frequent dispatch and delivery needs.",
    idealUse: "Bulk inventory, pallets, long‑term business storage.",
  },
  yard: {
    label: "Open Yard Storage",
    description:
      "Open, usually fenced outdoor areas for vehicles, containers, construction material, or other weather‑tolerant items. Often accessible for trucks with flexible access hours.",
    idealUse: "Vehicles, containers, machinery, and construction materials.",
  },
  shelf: {
    label: "Shelf Storage",
    description:
      "Smaller shelf or rack space inside shops or warehouses. Pay only for the shelf or pallet space you need instead of a whole unit. Great for small merchants and e‑commerce sellers.",
    idealUse: "Small boxes, e‑commerce inventory, documents, light stock.",
  },
  budget: {
    label: "Budget Units",
    description:
      "Lower‑priced units with basic features for cost‑conscious renters. May be slightly smaller or in less central locations but still secure and locked.",
    idealUse: "Price‑sensitive storage, students, short‑term overflow.",
  },
  parcel: {
    label: "Parcel Drop-Off Points",
    description:
      "Verified locations where customers can drop or pick up parcels. Hosts handle check‑in and short‑term holding of parcels, often integrated with local delivery routes.",
    idealUse: "Short‑term parcel holding and pickup/drop‑off.",
  },
};

export interface StorageListing {
  id: string;
  title: string;
  storageType: StorageType;
  city: string;
  county: string;
  size: number;
  sizeUnit: "sqft" | "sqm";
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  rating: number;
  reviewCount: number;
  security: string[];
  parcelDropOff: boolean;
}

export const MOCK_LISTINGS: StorageListing[] = [
  {
    id: "1",
    title: "Secure 120 sqft unit — Industrial Area",
    storageType: "Warehouse Storage",
    city: "Nairobi",
    county: "Nairobi",
    size: 120,
    sizeUnit: "sqft",
    pricePerDay: 800,
    pricePerWeek: 4800,
    pricePerMonth: 18000,
    rating: 4.8,
    reviewCount: 24,
    security: ["CCTV", "Guard", "Locked Unit", "Gated Area"],
    parcelDropOff: true,
  },
  {
    id: "2",
    title: "Residential garage — Kilimani",
    storageType: "Residential Storage",
    city: "Nairobi",
    county: "Nairobi",
    size: 200,
    sizeUnit: "sqft",
    pricePerDay: 500,
    pricePerWeek: 3000,
    pricePerMonth: 10000,
    rating: 4.9,
    reviewCount: 12,
    security: ["CCTV", "Locked Unit"],
    parcelDropOff: false,
  },
  {
    id: "3",
    title: "Commercial shelf space — Westlands",
    storageType: "Shelf Storage",
    city: "Nairobi",
    county: "Nairobi",
    size: 50,
    sizeUnit: "sqft",
    pricePerDay: 300,
    pricePerWeek: 1800,
    pricePerMonth: 6000,
    rating: 4.6,
    reviewCount: 8,
    security: ["CCTV", "Alarm"],
    parcelDropOff: true,
  },
  {
    id: "4",
    title: "Budget unit — Mombasa Road",
    storageType: "Budget Units",
    city: "Nairobi",
    county: "Nairobi",
    size: 80,
    sizeUnit: "sqft",
    pricePerDay: 350,
    pricePerWeek: 2100,
    pricePerMonth: 7000,
    rating: 4.4,
    reviewCount: 31,
    security: ["Locked Unit", "Gated Area"],
    parcelDropOff: false,
  },
  {
    id: "5",
    title: "Open yard — Athi River",
    storageType: "Open Yard Storage",
    city: "Athi River",
    county: "Machakos",
    size: 500,
    sizeUnit: "sqft",
    pricePerDay: 1500,
    pricePerWeek: 8000,
    pricePerMonth: 28000,
    rating: 4.7,
    reviewCount: 15,
    security: ["Guard", "Gated Area"],
    parcelDropOff: false,
  },
  {
    id: "6",
    title: "Parcel drop-off point — CBD",
    storageType: "Parcel Drop-Off Points",
    city: "Nairobi",
    county: "Nairobi",
    size: 0,
    sizeUnit: "sqft",
    pricePerDay: 100,
    pricePerWeek: 600,
    pricePerMonth: 2000,
    rating: 4.9,
    reviewCount: 45,
    security: ["CCTV", "Guard", "Locked Unit"],
    parcelDropOff: true,
  },
  {
    id: "7",
    title: "Commercial storefront storage — Kisumu",
    storageType: "Commercial Storage",
    city: "Kisumu",
    county: "Kisumu",
    size: 300,
    sizeUnit: "sqft",
    pricePerDay: 1200,
    pricePerWeek: 7000,
    pricePerMonth: 25000,
    rating: 4.5,
    reviewCount: 6,
    security: ["CCTV", "Guard", "Alarm"],
    parcelDropOff: true,
  },
  {
    id: "8",
    title: "Small residential unit — Mombasa",
    storageType: "Residential Storage",
    city: "Mombasa",
    county: "Mombasa",
    size: 60,
    sizeUnit: "sqft",
    pricePerDay: 400,
    pricePerWeek: 2400,
    pricePerMonth: 8000,
    rating: 4.8,
    reviewCount: 18,
    security: ["CCTV", "Locked Unit", "Gated Area"],
    parcelDropOff: false,
  },
];
