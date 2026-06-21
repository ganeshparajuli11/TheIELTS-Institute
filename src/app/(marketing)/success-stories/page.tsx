import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, GraduationCap, Quote, ShieldCheck, Users } from "lucide-react";
import { SuccessStoryCard } from "@/components/cards/success-story-card";
import { CtaSection } from "@/components/shared/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { successStories } from "@/data/success-stories";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "UK Study Success Stories",
  description:
    "Read student-approved UK study stories from Nepal, presented professionally without fake success rates or guaranteed visa claims.",
  path: "/success-stories",
  keywords: [
    "UK student success stories Nepal",
    "The IELTS Institute Nepal",
    "Study in UK from Nepal",
  ],
});

const storyPrinciples = [
  {
    title: "Student-approved stories",
    description: "Published stories should be verified and approved before being used publicly.",
    icon: Users,
  },
  {
    title: "Professional presentation",
    description: "Outcomes are framed around preparation, clarity, and student journey quality.",
    icon: GraduationCap,
  },
  {
    title: "No risky promises",
    description: "We avoid fake success rates, visa guarantees, and misleading immigration claims.",
    icon: ShieldCheck,
  },
];

export default function SuccessStoriesPage() {
  const featured = successStories.find((story) => story.featured);
  const stories = successStories.filter((story) => story.status === "published");

  return (
    <>
      <section className="bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-students.jpg"
            alt="Students walking through a campus representing UK study stories"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="bg-primary/60 absolute inset-0 mix-blend-multiply" />
          <div className="from-primary via-primary/80 to-primary/10 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(88vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              Success stories
            </p>
            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Student journeys, shared with care and confidence
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              Read professional UK study stories focused on preparation, clarity, and student trust.
              No fake success rates, no guaranteed outcomes, just careful storytelling.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/counselling"
                className={buttonVariants({ variant: "inverted", size: "xl" })}
              >
                Start Your Story
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
            <p className="label-caps text-primary">Story standard</p>
            <h2 className="mt-3 text-2xl font-bold">
              Trust comes from honest, verified student content.
            </h2>
            <div className="mt-6 grid gap-3">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-primary text-3xl font-extrabold">{stories.length}</p>
                <p className="text-muted-foreground mt-1 text-sm font-semibold">
                  Published sample stories
                </p>
              </div>
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <BadgeCheck className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  Future CMS can manage approvals, quotes, images, and status.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {storyPrinciples.map((item) => (
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

      {featured ? (
        <section className="academic-grid section-padding">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="label-caps text-primary">Featured story</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {featured.studentName}&apos;s UK study preparation journey
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-8">
                {featured.course} at {featured.university}. This section is ready for verified
                student-approved stories from the admin panel later.
              </p>
            </div>
            <div className="premium-card p-8">
              <Quote className="text-primary size-10" />
              <blockquote className="mt-6 text-2xl leading-snug font-bold text-balance">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <p className="text-primary mt-6 font-bold">{featured.studentName}</p>
              <p className="text-muted-foreground mt-1 text-sm">{featured.intake}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface-lavender py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-caps text-primary">Published stories</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Real journeys should feel personal, not exaggerated
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              This page keeps outcomes professional and student-centered while leaving room for
              verified CMS-managed stories later.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stories.map((story) => (
              <SuccessStoryCard key={story.studentName} story={story} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
