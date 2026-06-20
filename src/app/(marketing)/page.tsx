import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import { BadgeCheck, TrendingUp, Users } from "lucide-react";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SuccessStoriesSection } from "@/components/sections/success-stories-section";
import { TrustSection } from "@/components/sections/trust-section";
import { UniversitiesSection } from "@/components/sections/universities-section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "UK Education Consultancy in Nepal",
  description: siteConfig.seo.description,
  path: "/",
  keywords: ["UK education consultancy in Nepal", "The IELTS Institute Nepal"],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <section className="container-page section-padding">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
              Why The IELTS Institute?
            </h2>
            <div className="space-y-8">
              <HomeReason
                icon={BadgeCheck}
                title="UK-focused academic guidance"
                description="A focused destination strategy helps students avoid scattered advice and build a clearer study roadmap."
              />
              <HomeReason
                icon={Users}
                title="Expert mentors"
                description="Counselling, IELTS readiness, and application planning are organized around the student's academic profile."
              />
              <HomeReason
                icon={TrendingUp}
                title="Careful document preparation"
                description="Students receive structured support for applications, SOP direction, and visa documentation guidance."
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 size-40 rounded-full bg-primary/10 blur-3xl" />
            <Image
              src="/images/stitch-students.jpg"
              alt="Students walking across a UK university campus"
              width={900}
              height={600}
              className="relative z-10 rounded-lg border border-border shadow-2xl"
            />
          </div>
        </div>
      </section>
      <ServicesSection />
      <ProcessSection />
      <UniversitiesSection />
      <SuccessStoriesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

function HomeReason({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded bg-[#dee8ff] text-primary">
        <Icon className="size-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
