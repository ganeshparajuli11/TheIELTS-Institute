import type { Metadata } from "next";
import { CounsellingForm } from "@/components/forms/counselling-form";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqSection } from "@/components/sections/faq-section";
import { faqGroups } from "@/data/faqs";
import { counsellingContent } from "@/data/page-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Book Free UK Study Counselling Nepal",
  description:
    "Book UK study counselling from Nepal with fields for course, qualification, intake, IELTS/PTE status, and university preference.",
  path: "/counselling",
  keywords: ["Free UK study counselling Nepal", "UK study counselling Nepal"],
});

export default function CounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Counselling"
        title="Book free UK study counselling"
        description="Share your academic background and UK study preferences so your counselling conversation starts with the right context."
      />
      <section className="container-page section-padding grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <CounsellingForm />
        <aside className="space-y-6">
          <div className="premium-card p-6">
            <SectionHeading
              eyebrow="After submission"
              title="What happens next"
              description="A clear next-step structure for your UK study planning conversation."
            />
            <ul className="text-muted-foreground mt-6 space-y-3 text-sm">
              {counsellingContent.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="premium-card p-6">
            <h2 className="text-xl font-bold">Useful documents</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {counsellingContent.usefulDocuments}
            </p>
          </div>
        </aside>
      </section>
      <FaqSection items={faqGroups.counselling} />
      <CtaSection />
    </>
  );
}
