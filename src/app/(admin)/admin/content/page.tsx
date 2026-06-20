import { BookOpen, ExternalLink } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contentSections = [
  {
    title: "Site Information",
    description: "Business name, tagline, phone, email, address, social links.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Homepage Sections",
    description: "Hero copy, services intro, CTA content, trust signals.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Study in UK Content",
    description: "Benefits copy, process steps, facts and figures.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Services Page Content",
    description: "Service descriptions, process, pricing notes.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Contact Information",
    description: "Phone, email, address, opening hours, map embed.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "CTA Blocks",
    description: "Call-to-action labels, links, and supporting copy.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Footer Content",
    description: "Footer navigation, legal links, disclaimer text.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
  {
    title: "Compliance & Disclaimer",
    description:
      "Legal disclaimer text shown throughout the site. Must not promise visa outcomes.",
    href: "/admin/content",
    status: "Frontend only — TODO: connect to database.",
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Content Bank"
        description="Manage reusable website content from one central location."
        icon={BookOpen}
      />

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm text-amber-800">
          <strong>Frontend only.</strong> Content is currently managed in{" "}
          <code className="rounded bg-amber-100 px-1 text-xs">src/config/site.ts</code> and{" "}
          <code className="rounded bg-amber-100 px-1 text-xs">src/data/</code>. Connect these
          sections to the database after the CMS backend phase is implemented.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {contentSections.map((section) => (
          <Card key={section.title} className="overflow-hidden">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-xs text-muted-foreground">{section.description}</p>
              <p className="mt-2 text-[10px] text-amber-600">{section.status}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 h-7 text-xs"
                disabled
              >
                {/* TODO: Enable editing after backend CMS is implemented. */}
                Edit section
                <ExternalLink className="ml-1.5 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
