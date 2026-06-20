import { Globe, Lock, Settings } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Settings"
        description="General system settings and configuration."
        icon={Settings}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* General settings */}
        <Card>
          <CardHeader className="pb-3 pt-5">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">General Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pb-5">
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Site name</Label>
              <Input
                defaultValue="The IELTS Institute"
                className="h-9 text-sm"
                disabled
                aria-label="Site name"
              />
              {/* TODO: Connect to site settings in database after backend CMS phase. */}
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Admin email</Label>
              <Input
                defaultValue="hello@example.com"
                className="h-9 text-sm"
                disabled
                aria-label="Admin email"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Timezone</Label>
              <Input
                defaultValue="Asia/Kathmandu (UTC+5:45)"
                className="h-9 text-sm"
                disabled
                aria-label="Timezone"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Default language</Label>
              <Input defaultValue="English" className="h-9 text-sm" disabled aria-label="Language" />
            </div>
            <Button size="sm" disabled className="mt-1 w-fit">
              {/* TODO: Connect settings save after backend is implemented. */}
              Save general settings
            </Button>
          </CardContent>
        </Card>

        {/* Security settings */}
        <Card>
          <CardHeader className="pb-3 pt-5">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-5">
            <p className="text-xs text-muted-foreground">
              Security settings are enforced server-side and will be configurable after Phase 2
              authentication and RBAC are implemented.
            </p>
            <div className="mt-4 grid gap-3">
              {[
                {
                  label: "Strong password policy",
                  description: "Require min 12 characters, mixed case, numbers.",
                  status: "Planned — Phase 2",
                },
                {
                  label: "Login rate limiting",
                  description: "Limit failed login attempts per IP.",
                  status: "Implemented — in-memory placeholder. Needs Redis for production.",
                },
                {
                  label: "Two-factor authentication",
                  description: "TOTP-based 2FA for admin accounts.",
                  status: "Planned — Phase 3",
                },
                {
                  label: "Session timeout",
                  description: "Automatically sign out inactive sessions.",
                  status: "Planned — Phase 2",
                },
                {
                  label: "Audit logging",
                  description: "All admin actions are recorded in the audit log.",
                  status: "Implemented — Phase 1.",
                },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-start justify-between gap-4 rounded-md border border-border p-3"
                >
                  <div>
                    <p className="text-xs font-medium">{setting.label}</p>
                    <p className="text-[11px] text-muted-foreground">{setting.description}</p>
                  </div>
                  <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {setting.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
