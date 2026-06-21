"use client";

import { useState } from "react";
import Image from "next/image";
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
          <SheetHeader className="border-border flex h-16 flex-row items-center border-b px-6">
            <SheetTitle>
              <Link
                href="/admin"
                className="flex items-center gap-2.5"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/logo.jpg"
                  alt="The IELTS Institute"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md bg-white object-contain"
                />
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
                <p className="text-muted-foreground/60 mb-1 px-3 text-[10px] font-semibold tracking-widest uppercase">
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
                          <Icon
                            className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "")}
                            aria-hidden="true"
                          />
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
