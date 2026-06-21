"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups } from "@/config/admin-navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="border-border bg-card fixed inset-y-0 left-0 hidden w-64 flex-col border-r lg:flex">
      <div className="border-border flex h-16 shrink-0 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpg"
            alt="The IELTS Institute"
            width={32}
            height={32}
            className="h-8 w-8 rounded-md bg-white object-contain"
          />
          <span className="text-sm font-semibold tracking-tight">IELTS Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
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

      <div className="border-border shrink-0 border-t px-4 py-3">
        {/* TODO: Replace with real user session data from auth backend. */}
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="bg-primary/10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
            <span className="text-primary text-xs font-semibold">A</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium">Admin User</p>
            <p className="text-muted-foreground truncate text-[10px]">TODO: connect auth</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
