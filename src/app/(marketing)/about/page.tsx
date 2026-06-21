import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Target, Users } from "lucide-react";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/page-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About The IELTS Institute",
  description: siteConfig.fullDescription,
  path: "/about",
  keywords: ["The IELTS Institute Nepal", "UK education consultancy in Nepal"],
});

const valueIcons = [Target, ShieldCheck, Users, CheckCircle2] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A UK-focused consultancy foundation for students in Nepal"
        description={siteConfig.fullDescription}
      />

      <section className="section-padding bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Mission</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Why The IELTS Institute exists
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">{aboutContent.mission}</p>
          </div>
          <div className="grid gap-3">
            {aboutContent.whyUs.map((point) => (
              <div key={point} className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academic-grid section-padding">
        <div className="container-page">
          <SectionHeading
            className="mx-auto text-center"
            eyebrow="Values"
            title="Principles that guide every counselling conversation"
            description="These values shape how The IELTS Institute approaches every student, every service, and every piece of public content."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={value.title}
                  className="premium-card p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="bg-icon-bg text-primary flex size-14 items-center justify-center rounded-lg">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-7">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-lavender py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">{aboutContent.team.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {aboutContent.team.title}
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              {aboutContent.team.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <p className="text-primary text-4xl font-extrabold">UK</p>
              <h3 className="mt-3 text-xl font-bold">Single destination</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Focused exclusively on UK higher education so guidance stays specific, relevant, and
                current.
              </p>
            </div>
            <div className="premium-card p-6">
              <p className="text-primary text-4xl font-extrabold">NPL</p>
              <h3 className="mt-3 text-xl font-bold">Nepal-based team</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Based in Bagbazar, Kathmandu, with direct accessibility for students across Nepal.
              </p>
            </div>
            <div className="premium-card p-6 sm:col-span-2">
              <ShieldCheck className="text-primary size-9" />
              <h3 className="mt-5 text-xl font-bold">Compliance-first language</h3>
              <p className="text-muted-foreground mt-3 leading-7">{siteConfig.legalNote}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
