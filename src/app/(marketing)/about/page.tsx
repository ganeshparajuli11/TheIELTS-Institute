import type { Metadata } from "next";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About The IELTS Institute",
  description: siteConfig.fullDescription,
  path: "/about",
  keywords: ["The IELTS Institute Nepal", "UK education consultancy in Nepal"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A UK-focused consultancy foundation for students in Nepal"
        description={siteConfig.fullDescription}
      />
      <section className="container-page section-padding">
        <SectionHeading
          eyebrow="Brand system"
          title="Professional, academic, and future CMS-ready"
          description="The frontend is organized around reusable content records, consistent layout components, and compliance-aware language."
        />
      </section>
      <CtaSection />
    </>
  );
}
