import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ProcessSection } from "@/components/sections/process-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { faqGroups } from "@/data/faqs";
import { studyInUkContent } from "@/data/page-content";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Study in UK from Nepal",
  description:
    "Plan your UK study journey from Nepal with course selection, intake planning, university applications, documents, and careful student visa guidance.",
  path: "/study-in-uk",
  keywords: [
    "Study in UK from Nepal",
    "UK student visa guidance Nepal",
    "UK university application from Nepal",
    "UK study counselling Nepal",
  ],
});

const ukAdvantages = [
  {
    title: "Globally respected degrees",
    description:
      "Explore UK qualifications known for academic depth, employer recognition, and strong progression routes.",
    icon: GraduationCap,
  },
  {
    title: "Focused course planning",
    description:
      "Compare courses by entry profile, career goals, budget, intake timing, and English preparation needs.",
    icon: BookOpenCheck,
  },
  {
    title: "Structured application support",
    description:
      "Keep university shortlisting, SOP direction, references, and document preparation organized from day one.",
    icon: FileText,
  },
];

const trustPoints = [
  "UK-focused counselling from Nepal",
  "Clear intake and document planning",
  "No guaranteed visa claims",
  "Frontend-ready content for future CMS editing",
];

const intakes = [
  {
    name: "September intake",
    detail:
      "The broadest course availability, best for students who want maximum university choice.",
  },
  {
    name: "January intake",
    detail:
      "A strong option for students who need extra time for IELTS, documents, or academic results.",
  },
  {
    name: "May intake",
    detail:
      "Limited but useful for selected programmes and students with a tighter preparation window.",
  },
];

export default function StudyInUkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-hero.jpg"
            alt="London landmark representing UK study planning"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/10" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              Study in UK from Nepal
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Build a trusted UK study plan before you apply
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              Choose courses, understand intakes, prepare documents, and move
              toward your UK university application with calm, professional
              guidance from Bagbazar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={siteConfig.mainCta.href}
                className={buttonVariants({ variant: "inverted", size: "xl" })}
              >
                Book Free Counselling
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/universities"
                className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                View UK Universities
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/25 bg-white/95 p-6 text-foreground shadow-2xl shadow-primary/30 backdrop-blur">
            <p className="label-caps text-primary">Planning snapshot</p>
            <h2 className="mt-3 text-2xl font-bold">
              Your first counselling session should answer the big questions.
            </h2>
            <div className="mt-6 grid gap-3">
              {trustPoints.map((point) => (
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
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {ukAdvantages.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-white p-6 transition hover:border-primary hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex size-14 items-center justify-center rounded-lg bg-icon-bg text-primary">
                <item.icon className="size-7" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="academic-grid section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="label-caps text-primary">Why the UK</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              A clear academic route for ambitious students from Nepal
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The UK offers respected institutions, flexible programme lengths,
              practical progression routes, and strong academic breadth. The
              important part is not rushing. Students need a plan that connects
              profile, budget, English preparation, university choice, and visa
              documentation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <Landmark className="size-9 text-primary" />
              <p className="mt-5 text-4xl font-extrabold text-primary">UK</p>
              <h3 className="mt-2 text-xl font-bold">Single-country focus</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Advice stays centered on UK admissions, intakes, and student
                preparation instead of mixing several destinations.
              </p>
            </div>
            <div className="premium-card p-6">
              <ShieldCheck className="size-9 text-primary" />
              <p className="mt-5 text-4xl font-extrabold text-primary">Safe</p>
              <h3 className="mt-2 text-xl font-bold">Responsible guidance</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Visa decisions are made by UK authorities. We help students
                prepare documents carefully without promising outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection
        eyebrow="Journey tracker"
        title="From first counselling to confident preparation"
        description="Students trust a process when they can see the next step. This roadmap keeps every application stage visible and manageable."
      />

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="label-caps text-primary">Courses and intakes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Match your course choice with the right application window
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A trustworthy UK plan starts with fit. We look at academic
              background, English test status, preferred subjects, budget, and
              realistic timing before students begin applications.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {studyInUkContent.popularCourses.map((course) => (
                <Badge
                  key={course}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-semibold",
                    "bg-[--badge-soft] text-[--badge-soft-fg] hover:bg-[--badge-soft-hover]",
                  )}
                >
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {intakes.map((intake) => (
              <article
                key={intake.name}
                className="premium-card flex gap-4 p-5"
              >
                <CalendarDays className="mt-1 size-7 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">{intake.name}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {intake.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="label-caps text-primary">Document preparation</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Organized documents make the journey feel less stressful
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Requirements can change by university, course, and student
              profile. These are starting points for counselling, not a final
              promise that every student needs the same file set.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {studyInUkContent.documents.map((document) => (
              <div
                key={document}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-5 font-semibold"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{document}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="label-caps text-white/70">Visa guidance disclaimer</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Careful preparation, never guaranteed outcomes.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/82">
            {siteConfig.legalNote}
          </p>
        </div>
      </section>

      <FaqSection items={faqGroups.studyInUk} />
      <CtaSection />
    </>
  );
}
