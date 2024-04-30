import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import PropertyCard from "@/components/PropertyCard";
import FeaturedProperties from "@/components/FeaturedProperties";

import HomeProperties from "@/components/HomeProperties";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <FeaturedProperties />
    </>
  );
}
