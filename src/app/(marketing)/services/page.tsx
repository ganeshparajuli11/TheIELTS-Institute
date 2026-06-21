import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  FileCheck,
  GraduationCap,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { buttonVariants } from "@/components/ui/button";
import { faqGroups } from "@/data/faqs";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";
import { iconMap } from "@/lib/icons";

export const metadata: Metadata = createMetadata({
  title: "UK Study Services in Nepal",
  description:
    "Explore UK study counselling, university selection, application support, SOP guidance, visa document guidance, IELTS preparation guidance, and pre-departure support.",
  path: "/services",
  keywords: [
    "UK study counselling Nepal",
    "IELTS preparation Nepal",
    "UK student visa guidance Nepal",
  ],
});

const servicePillars = [
  {
    title: "Counselling-led planning",
    description:
      "Every service begins with the student's academic profile, goals, timing, and preparation needs.",
    icon: MessagesSquare,
  },
  {
    title: "Document discipline",
    description:
      "Application, SOP, financial, and visa documents are handled as an organized preparation workflow.",
    icon: FileCheck,
  },
  {
    title: "Careful compliance",
    description:
      "Guidance is written responsibly, with no guaranteed visa approval or unverified outcome promises.",
    icon: ShieldCheck,
  },
];

const featuredServices = services.slice(0, 4);

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-hero.jpg"
            alt="UK landmark used for study counselling service planning"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="bg-primary/55 absolute inset-0 mix-blend-multiply" />
          <div className="from-primary via-primary/80 to-primary/10 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(88vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              UK study services
            </p>
            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Everything students need for a structured UK study plan
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              From counselling and university selection to IELTS planning, applications, documents,
              and pre-departure support, every service is designed to reduce confusion for students
              in Nepal.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/counselling"
                className={buttonVariants({ variant: "inverted", size: "xl" })}
              >
                Book Free Counselling
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/study-in-uk"
                className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                View Study Guide
              </Link>
            </div>
          </div>

          <div className="text-foreground shadow-primary/30 rounded-xl border border-white/25 bg-white/95 p-6 shadow-2xl backdrop-blur">
            <p className="label-caps text-primary">Service promise</p>
            <h2 className="mt-3 text-2xl font-bold">
              Clear support from first enquiry to pre-departure planning.
            </h2>
            <div className="mt-6 grid gap-3">
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <GraduationCap className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  UK-focused counselling and university selection
                </span>
              </div>
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <BookOpenCheck className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  IELTS readiness and academic English direction
                </span>
              </div>
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <BadgeCheck className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  Careful visa document guidance without outcome promises
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {servicePillars.map((item) => (
            <article
              key={item.title}
              className="border-border hover:border-primary hover:shadow-primary/10 rounded-lg border bg-white p-6 transition hover:shadow-xl"
            >
              <div className="bg-icon-bg text-primary flex size-14 items-center justify-center rounded-lg">
                <item.icon className="size-7" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">{item.title}</h2>
              <p className="text-muted-foreground mt-3 leading-7">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="academic-grid section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-caps text-primary">Premium services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Choose the support your UK study journey needs
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              These service records are ready for future admin management while keeping the public
              page polished, trustworthy, and easy to scan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lavender py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="label-caps text-primary">How support is organized</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              A service system built around student confidence
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              Instead of repeating the full application roadmap here, this page explains the service
              areas. The detailed student journey now belongs on the Study in UK page where it has
              the strongest context.
            </p>
          </div>

          <div className="grid gap-4">
            {featuredServices.map((service, index) => {
              const Icon = iconMap[service.icon];

              return (
                <article
                  key={service.slug}
                  className="rounded-lg border border-white/70 bg-white p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-lg text-lg font-extrabold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon className="text-primary size-5" />
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mt-3 leading-7">
                        {service.fullDescription}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Responsible service notes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Clear wording helps students trust the process.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <ShieldCheck className="text-primary size-9" />
              <h3 className="mt-5 text-xl font-bold">No risky claims</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Visa guidance is presented as document preparation support, not as an approval
                promise.
              </p>
            </div>
            <div className="premium-card p-6">
              <FileCheck className="text-primary size-9" />
              <h3 className="mt-5 text-xl font-bold">CMS-ready content</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Each service keeps a slug, description, icon, CTA label, and SEO terms so admin
                records can replace static data later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqGroups.services} />
      <CtaSection />
    </>
  );
}
