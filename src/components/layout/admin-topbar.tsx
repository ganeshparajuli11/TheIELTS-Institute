"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Search } from "lucide-react";
import { adminNavGroups } from "@/config/admin-navigation";
import { AdminMobileNav } from "@/components/layout/admin-mobile-nav";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: { label: string; href: string }[] = [{ label: "Admin", href: "/admin" }];

  let accumulated = "";
  for (const segment of segments.slice(1)) {
    accumulated += `/${segment}`;
    const href = `/admin${accumulated}`;

    const allItems = adminNavGroups.flatMap((g) => g.items);
    const matched = allItems.find((item) => item.href === href);
    const label = matched?.label ?? segment.replace(/-/g, " ");

    if (href !== "/admin") {
      crumbs.push({ label, href });
    }
  }

  return crumbs;
}

export function AdminTopbar() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <header className="border-border bg-background/85 sticky top-0 z-30 flex h-16 shrink-0 items-center border-b px-4 backdrop-blur sm:px-6">
      <AdminMobileNav />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="ml-3 flex items-center gap-1 lg:ml-0">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <span key={crumb.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="text-muted-foreground/50 h-3.5 w-3.5" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-foreground text-sm font-medium">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {/* Search placeholder */}
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hidden h-8 gap-2 sm:flex"
          aria-label="Search"
          disabled
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Search…</span>
          {/* TODO: Connect global search after backend is implemented. */}
        </Button>

        {/* Notifications placeholder */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative h-8 w-8"
          disabled
        >
          <Bell className="h-4 w-4" />
          {/* TODO: Connect real-time notifications after backend is implemented. */}
        </Button>

        <ModeToggle />

        {/* User dropdown placeholder */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 rounded-full p-0")}
            aria-label="User menu"
          >
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-primary text-xs font-semibold">A</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
              {/* TODO: Replace with authenticated user data. */}
              Signed in as
              <br />
              <span className="text-foreground font-medium">admin@example.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Change password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              {/* TODO: Connect secure sign-out after auth backend is implemented. */}
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
