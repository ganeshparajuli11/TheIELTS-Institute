import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stitch-hero.jpg"
          alt="Big Ben and the Palace of Westminster at sunset"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="bg-primary/45 absolute inset-0 mix-blend-multiply" />
        <div className="from-primary/90 via-primary/55 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <div className="container-page relative z-10 py-24">
        <div className="max-w-2xl text-white">
          <span className="label-caps inline-block rounded-lg bg-white/20 px-3 py-1 text-white backdrop-blur-md">
            Established 2008
          </span>
          <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your Gateway to the UK&apos;s{" "}
            <span className="text-[--hero-highlight] underline decoration-2 underline-offset-8">
              Elite Universities
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
            Expert IELTS coaching and comprehensive consultancy services in the heart of Bagbazar.
            Your journey to academic excellence starts with professional guidance.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={siteConfig.mainCta.href}
              className={buttonVariants({ variant: "inverted", size: "xl" })}
            >
              Start Your Journey Today
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/universities"
              className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              View University Partners
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
