import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import { UniversityCard } from "@/components/cards/university-card";
import { CtaSection } from "@/components/shared/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { universities } from "@/data/universities";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "UK Universities for Nepalese Students",
  description:
    "Browse UK university profiles and shortlist courses, locations, intakes, and academic pathways for students applying from Nepal.",
  path: "/universities",
  keywords: [
    "UK universities Nepal",
    "UK university application from Nepal",
    "UK university shortlist Nepal",
  ],
});

const selectionPrinciples = [
  {
    title: "Course fit first",
    description:
      "Shortlisting starts with academic background, progression goals, and realistic entry requirements.",
    icon: BookOpenCheck,
  },
  {
    title: "City and budget clarity",
    description:
      "Students compare location, living style, campus setting, and estimated preparation needs before applying.",
    icon: MapPin,
  },
  {
    title: "Responsible guidance",
    description:
      "University choice is explained clearly without unverified partnership or guaranteed outcome language.",
    icon: ShieldCheck,
  },
];

export default function UniversitiesPage() {
  const featured = universities.filter((university) => university.featured);

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-students.jpg"
            alt="Students walking through a UK academic campus"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/10" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(88vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              UK university shortlisting
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Find the right UK university pathway with confidence
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              Compare courses, intakes, locations, and academic fit before you
              apply. The goal is a shortlist that feels clear, realistic, and
              aligned with your future.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/counselling"
                className={buttonVariants({ variant: "inverted", size: "xl" })}
              >
                Build My Shortlist
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/study-in-uk"
                className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                Study in UK Guide
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/25 bg-white/95 p-6 text-foreground shadow-2xl shadow-primary/30 backdrop-blur">
            <p className="label-caps text-primary">Shortlist logic</p>
            <h2 className="mt-3 text-2xl font-bold">
              We help students compare universities with a calm academic lens.
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-3xl font-extrabold text-primary">
                  {universities.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Sample profiles
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-3xl font-extrabold text-primary">
                  {featured.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Featured routes
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              These records are frontend-ready placeholders for future CMS
              university profiles and verified partner listings.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {selectionPrinciples.map((item) => (
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
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="label-caps text-primary">Browse universities</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Compare sample UK profiles by course, city, and intake
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Use this section as the future browsing experience for managed
                university records. It keeps the design clean while preparing
                the structure for real data from the admin panel later.
              </p>
            </div>

            <div className="premium-card flex items-center gap-3 p-4">
              <Search className="size-5 shrink-0 text-primary" />
              <Input
                aria-label="Search universities"
                placeholder="Search universities by course, city, or intake"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {universities.map((university) => (
              <UniversityCard key={university.slug} university={university} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lavender py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="label-caps text-primary">Featured profiles</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Start with routes that are easier to compare
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Featured profiles can later be controlled from the admin panel.
              For now, they show how priority university cards should appear
              without claiming verified partnerships.
            </p>
          </div>

          <div className="grid gap-5">
            {featured.map((university) => (
              <UniversityCard key={university.slug} university={university} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Selection help</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              A shortlist should protect the student, not impress the website.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <GraduationCap className="size-9 text-primary" />
              <h3 className="mt-5 text-xl font-bold">Academic compatibility</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                We compare course content, entry conditions, English readiness,
                and long-term study direction before applications begin.
              </p>
            </div>
            <div className="premium-card p-6">
              <MapPin className="size-9 text-primary" />
              <h3 className="mt-5 text-xl font-bold">Practical student fit</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                City, budget, intake timing, accommodation, and student support
                all matter when a Nepalese student chooses a UK route.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
