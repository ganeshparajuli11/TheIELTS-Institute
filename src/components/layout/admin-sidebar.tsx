import Link from "next/link";
import { adminNavItems } from "@/config/navigation";

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-background p-6 lg:block">
      <Link href="/admin" className="text-lg font-semibold">
        IELTS Admin
      </Link>
      <p className="mt-2 text-xs text-muted-foreground">
        TODO: connect auth and RBAC.
      </p>
      <nav className="mt-8 grid gap-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
