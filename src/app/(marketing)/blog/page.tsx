import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  FileText,
  GraduationCap,
  Search,
} from "lucide-react";
import { CtaSection } from "@/components/shared/cta-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/data/blog-posts";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "UK Study Resources and Blog",
  description:
    "Read UK study resources for students in Nepal, including application planning, IELTS preparation, intakes, and document guidance.",
  path: "/blog",
  keywords: ["Study in UK from Nepal", "IELTS preparation Nepal", "UK study resources Nepal"],
});

const categories = [
  {
    title: "Application planning",
    description: "Timelines, offer steps, documents, and preparation order.",
    icon: FileText,
  },
  {
    title: "IELTS guidance",
    description: "Study habits, readiness checks, and academic English focus.",
    icon: BookOpenCheck,
  },
  {
    title: "Intake strategy",
    description: "September, January, and May intake planning for UK courses.",
    icon: CalendarDays,
  },
];

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;

  return (
    <>
      <section className="bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-hero.jpg"
            alt="UK landmark representing study resources and planning"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="bg-primary/55 absolute inset-0 mix-blend-multiply" />
          <div className="from-primary via-primary/80 to-primary/10 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(82vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              UK study resources
            </p>
            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Clear guidance for students planning the UK from Nepal
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              Read practical resources on applications, IELTS preparation, intakes, document
              planning, and university selection before your counselling session.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/counselling"
                className={buttonVariants({ variant: "inverted", size: "xl" })}
              >
                Ask a Counsellor
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

          <div className="text-foreground shadow-primary/30 rounded-xl border border-white/25 bg-white/95 p-6 shadow-2xl backdrop-blur">
            <p className="label-caps text-primary">Resource focus</p>
            <h2 className="mt-3 text-2xl font-bold">
              Search-friendly content students can actually use.
            </h2>
            <div className="mt-6 grid gap-3">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="bg-muted flex items-start gap-3 rounded-lg p-4"
                >
                  <category.icon className="text-primary mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="text-foreground font-bold">{category.title}</p>
                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="academic-grid section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Featured guide</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Start with a clear UK application plan
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              The blog is structured for future CMS publishing, but the public experience should
              already feel useful, credible, and focused on student decisions.
            </p>
          </div>

          <Card className="border-primary/30 shadow-primary/10 rounded-lg bg-white p-2 shadow-xl">
            <CardHeader>
              <Badge
                className={cn(
                  "w-fit rounded-lg",
                  "bg-[--badge-soft] text-[--badge-soft-fg] hover:bg-[--badge-soft-hover]",
                )}
              >
                {featured.category}
              </Badge>
              <CardTitle className="text-3xl leading-tight">{featured.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-8">{featured.excerpt}</p>
              <Link
                href={featured.href}
                className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-bold"
              >
                Read guide
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-surface-lavender py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="label-caps text-primary">Articles</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Practical resources for each decision point
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-8">
                Article records are centralized and ready to map to CMS models with categories, SEO
                settings, and publishing status later.
              </p>
            </div>
            <div className="premium-card flex items-center gap-3 p-4">
              <Search className="text-primary size-5 shrink-0" />
              <p className="text-muted-foreground text-sm font-semibold">
                Search and filtering can connect here when CMS content is live.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Card
                key={post.title}
                className="border-border/80 hover:border-primary hover:shadow-primary/10 rounded-lg bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader>
                  <Badge variant="secondary" className="w-fit rounded-lg px-3 py-1">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-2xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-6">{post.excerpt}</p>
                  <Link
                    href={post.href}
                    className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-bold"
                  >
                    Read article
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Future categories</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Built for a complete UK study resource library
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="premium-card p-6">
              <GraduationCap className="text-primary size-9" />
              <h3 className="mt-5 text-xl font-bold">Academic planning</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Course selection, university shortlisting, entry requirements, and student profile
                preparation.
              </p>
            </div>
            <div className="premium-card p-6">
              <FileText className="text-primary size-9" />
              <h3 className="mt-5 text-xl font-bold">Document guidance</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                SOP direction, financial preparation, visa document guidance, and pre-departure
                checklists.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
