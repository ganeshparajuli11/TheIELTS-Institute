import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Start your UK study plan with a clear counselling session.",
  description = "Share your academic background, preferred course, and intake goals so the counselling conversation starts with the right context.",
}: CtaSectionProps) {
  return (
    <section className="container-page pb-20">
      <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-xl p-10 text-center md:p-20">
        <div className="academic-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-3xl">
          <p className="label-caps text-white/70">Counselling CTA</p>
          <h2 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight text-balance md:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/85">{description}</p>
          <Link
            href={siteConfig.mainCta.href}
            className={cn(buttonVariants({ variant: "inverted", size: "xl" }), "mt-10")}
          >
            Book Your Free Consultation Now
            <ArrowRight className="size-5" />
          </Link>
          <p className="label-caps mt-6 text-white/60">
            No hidden fees • personalized mentorship • Bagbazar, Kathmandu
          </p>
        </div>
      </div>
    </section>
  );
}
