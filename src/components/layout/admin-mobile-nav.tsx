"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { adminNavGroups } from "@/config/admin-navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="flex h-16 flex-row items-center border-b border-border px-6">
            <SheetTitle asChild>
              <Link
                href="/admin"
                className="flex items-center gap-2.5"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">TI</span>
                </div>
                <span className="text-sm font-semibold tracking-tight">IELTS Admin</span>
              </Link>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>

          <nav className="overflow-y-auto px-3 py-4">
            {adminNavGroups.map((group) => (
              <div key={group.label} className="mb-5">
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.label}
                </p>
                <ul className="grid gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "")} aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
