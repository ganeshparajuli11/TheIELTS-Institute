import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { faqGroups } from "@/data/faqs";
import { contactContent } from "@/data/page-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact The IELTS Institute Nepal",
  description:
    "Contact The IELTS Institute in Bagbazar, Kathmandu for UK study counselling, university applications, IELTS preparation guidance, and document support.",
  path: "/contact",
  keywords: [
    "The IELTS Institute Nepal",
    "Free UK study counselling Nepal",
    "UK education consultancy Bagbazar",
  ],
});

const contactMethods = [
  {
    label: "Office",
    value: siteConfig.address,
    icon: MapPin,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    icon: Phone,
  },
  {
    label: "Email",
    value: siteConfig.email,
    icon: Mail,
  },
  {
    label: "Office hours",
    value: siteConfig.officeHours,
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/stitch-students.jpg"
            alt="Students on a campus used for UK study contact enquiry"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="bg-primary/60 absolute inset-0 mix-blend-multiply" />
          <div className="from-primary via-primary/80 to-primary/10 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="container-page relative z-10 grid min-h-[calc(82vh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="label-caps inline-flex rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
              Contact the team
            </p>
            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Speak with a UK study counselling team in Kathmandu
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              Send your enquiry, visit the Bagbazar office, or book a counselling conversation so
              your UK study plan can start with the right context.
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
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                Email Us
              </Link>
            </div>
          </div>

          <div className="text-foreground shadow-primary/30 rounded-xl border border-white/25 bg-white/95 p-6 shadow-2xl backdrop-blur">
            <p className="label-caps text-primary">Enquiry guidance</p>
            <h2 className="mt-3 text-2xl font-bold">
              Share your academic background and preferred UK intake.
            </h2>
            <div className="mt-6 grid gap-3">
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <MessageSquareText className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  Include your course interest, current education level, and IELTS status if
                  available.
                </span>
              </div>
              <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
                <Clock className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground font-medium">
                  The team can respond with next-step counselling priorities.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-6 md:grid-cols-4">
          {contactMethods.map((method) => (
            <article
              key={method.label}
              className="border-border hover:border-primary hover:shadow-primary/10 rounded-lg border bg-white p-6 transition hover:shadow-xl"
            >
              <div className="bg-icon-bg text-primary flex size-12 items-center justify-center rounded-lg">
                <method.icon className="size-6" />
              </div>
              <p className="text-primary mt-5 text-sm font-bold tracking-wide uppercase">
                {method.label}
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">{method.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="academic-grid section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="label-caps text-primary">Send enquiry</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Tell us where you are in your UK study journey
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
              The form stays frontend-only for now. Later it can connect to the enquiry system from
              the admin panel without changing this public page layout.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="premium-card h-fit p-6">
            <p className="label-caps text-primary">Contact information</p>
            <h2 className="mt-3 text-2xl font-bold">Visit or contact us</h2>
            <p className="text-muted-foreground mt-4 leading-7">{siteConfig.shortDescription}</p>
            <div className="mt-6 space-y-4">
              {contactMethods.map((method) => (
                <div key={method.label} className="flex gap-3">
                  <method.icon className="text-primary mt-1 size-5 shrink-0" />
                  <div>
                    <p className="font-bold">{method.label}</p>
                    <p className="text-muted-foreground text-sm leading-6">{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface-lavender py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="label-caps text-primary">Map</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {contactContent.mapTitle}
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              {contactContent.mapDescription}
            </p>
          </div>
          <div
            role="img"
            aria-label="Kathmandu office location map area"
            className="flex min-h-80 items-center justify-center rounded-lg border border-white/70 bg-white p-8 text-center shadow-sm"
          >
            <div>
              <MapPin className="text-primary mx-auto size-12" />
              <p className="mt-4 text-xl font-bold">{contactContent.mapLabel}</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Interactive map embed can be connected after the confirmed office listing is ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqGroups.contact} />
      <CtaSection />
    </>
  );
}
