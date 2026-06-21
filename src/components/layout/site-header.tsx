"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/shared/logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
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
                  "label-caps text-muted-foreground hover:text-primary border-b-2 border-transparent py-1 transition",
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
            className={cn(buttonVariants(), "hidden md:inline-flex")}
          >
            Book a Consultation
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
