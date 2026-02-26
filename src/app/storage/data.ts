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
