import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { BrandStatement } from "@/components/home/BrandStatement";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { TrustPillars } from "@/components/home/TrustPillars";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutUsSection />
      <CategoriesSection />
      <TrustPillars />
      <CollectionPreview />
      <Newsletter />
    </>
  );
}
