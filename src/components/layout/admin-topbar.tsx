"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Search } from "lucide-react";
import { adminNavGroups } from "@/config/admin-navigation";
import { AdminMobileNav } from "@/components/layout/admin-mobile-nav";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
      <AdminMobileNav />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="ml-3 flex items-center gap-1 lg:ml-0">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <span key={crumb.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-sm font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
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
          className="hidden h-8 gap-2 text-muted-foreground sm:flex"
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
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0"
              aria-label="User menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xs font-semibold text-primary">A</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              {/* TODO: Replace with authenticated user data. */}
              Signed in as
              <br />
              <span className="font-medium text-foreground">admin@example.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Change password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="text-destructive focus:text-destructive">
                {/* TODO: Connect secure sign-out after auth backend is implemented. */}
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
