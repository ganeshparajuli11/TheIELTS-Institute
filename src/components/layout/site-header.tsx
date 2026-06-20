"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/shared/logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="container-page flex min-h-18 items-center justify-between gap-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex">
          {mainNavItems.map((item) => {
            const active = item.match?.some((match) =>
              match === "/" ? pathname === "/" : pathname.startsWith(match),
            );
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label-caps border-b-2 border-transparent py-1 text-muted-foreground transition hover:text-primary",
                  active && "border-primary text-primary",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link
            href={siteConfig.mainCta.href}
            className="hidden rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6a0dad] active:scale-[0.98] md:inline-flex"
          >
            Book a Consultation
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
