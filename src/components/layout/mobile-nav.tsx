"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Open navigation</span>
          </Button>
        }
      />
      <SheetContent side="right" className="w-[min(88vw,24rem)]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 grid gap-4">
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
                  "text-muted-foreground rounded-md px-3 py-2 font-medium",
                  active && "bg-accent text-primary",
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <Link href={siteConfig.mainCta.href} className={buttonVariants({ className: "mt-4" })}>
            {siteConfig.mainCta.label}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
