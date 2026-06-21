import { Lock, Settings } from "lucide-react";
import { readContent } from "@/lib/content-store";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SiteConfigForm } from "@/components/admin/content/site-config-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentSiteConfig } from "@/types/content";

const SECURITY_ITEMS = [
  { label: "Strong password hashing", detail: "Argon2id — Phase 2 auth", done: false },
  { label: "Rate limiting on login", detail: "In-memory guard — Phase 2", done: false },
  { label: "Two-factor authentication", detail: "Phase 3 roadmap", done: false },
  { label: "Session timeout", detail: "HttpOnly cookie — Phase 2", done: false },
  { label: "Audit logging", detail: "Database AuditLog model — implemented", done: true },
];

export default function AdminSettingsPage() {
  const config = readContent<ContentSiteConfig>("site-config");

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Settings"
        description="Manage site identity, contact details, CTAs, social links, and compliance text."
        icon={Settings}
      />

      <SiteConfigForm config={config} />

      {/* Security info panel (read-only) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lock className="text-muted-foreground h-4 w-4" />
            <CardTitle className="text-sm font-semibold">Security status</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {SECURITY_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    item.done ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.done ? "✓" : "!"}
                </span>
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground text-xs">{item.detail}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
