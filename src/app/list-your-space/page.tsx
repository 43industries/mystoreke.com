import PageHero from "@/components/PageHero";
import SiteHeader from "@/components/SiteHeader";
import { IMAGES } from "../images";
import HostListingForm from "./HostListingForm";

export const metadata = {
  title: "List Your Space — Mystore",
  description: "List your storage space or parcel drop-off point. Earn by renting or receiving parcels.",
};

export default function ListYourSpacePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <PageHero
        title="List Your Space"
        subtitle="Earn by renting out your space or offering parcel drop-off."
        imageSrc={IMAGES.pages.listYourSpace}
        imageAlt="Residential storage and hosting"
      />
      <HostListingForm />
    </div>
  );
}
