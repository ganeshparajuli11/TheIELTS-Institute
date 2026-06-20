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

      <section className="bg-white section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Mission</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Why The IELTS Institute exists
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {aboutContent.mission}
            </p>
          </div>
          <div className="grid gap-3">
            {aboutContent.whyUs.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-lg bg-muted p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{point}</span>
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
                  <div className="flex size-14 items-center justify-center rounded-lg bg-icon-bg text-primary">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {value.description}
                  </p>
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
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {aboutContent.team.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <p className="text-4xl font-extrabold text-primary">UK</p>
              <h3 className="mt-3 text-xl font-bold">Single destination</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Focused exclusively on UK higher education so guidance stays
                specific, relevant, and current.
              </p>
            </div>
            <div className="premium-card p-6">
              <p className="text-4xl font-extrabold text-primary">NPL</p>
              <h3 className="mt-3 text-xl font-bold">Nepal-based team</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Based in Bagbazar, Kathmandu, with direct accessibility for
                students across Nepal.
              </p>
            </div>
            <div className="premium-card p-6 sm:col-span-2">
              <ShieldCheck className="size-9 text-primary" />
              <h3 className="mt-5 text-xl font-bold">Compliance-first language</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {siteConfig.legalNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
