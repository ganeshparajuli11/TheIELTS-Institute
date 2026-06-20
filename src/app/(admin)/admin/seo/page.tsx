import { Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const seoEntities = [
  {
    label: "Static Pages",
    pages: ["Home", "Study in UK", "Universities", "Services", "Success Stories", "Blog", "Contact", "Counselling"],
    status: "Managed in src/config/site.ts — TODO: connect to database.",
  },
  {
    label: "Universities",
    pages: ["Each university has its own SEO title, description, and OG image."],
    status: "TODO: connect to university records in database.",
  },
  {
    label: "Courses",
    pages: ["Each course has its own SEO title, meta description, and keywords."],
    status: "TODO: connect to course records in database.",
  },
  {
    label: "Blog Articles",
    pages: ["Each blog post has SEO title, meta description, OG image, and canonical URL."],
    status: "TODO: connect to blog records in database.",
  },
  {
    label: "Success Stories",
    pages: ["Each story has an SEO title and meta description."],
    status: "TODO: connect to success story records in database.",
  },
];

const SEO_TIPS = [
  { label: "Title length", tip: "Aim for 50–60 characters. Longer titles may be truncated in search results." },
  { label: "Meta description", tip: "Aim for 140–160 characters. Include the main keyword naturally." },
  { label: "Keywords", tip: "Use 3–5 relevant keywords. Do not keyword-stuff." },
  { label: "Canonical URL", tip: "Set a canonical URL on all paginated or duplicate content pages." },
  { label: "No-index", tip: "Mark admin pages, internal tools, and thin content with no-index." },
];

export default function AdminSeoPage() {
  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="SEO Settings"
        description="Central SEO management for all pages and content types."
        icon={Search}
      />

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm text-amber-800">
          <strong>Frontend only.</strong> SEO fields are currently hardcoded in config and page
          metadata. Connect to a central SEO table after the CMS backend phase.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {seoEntities.map((entity) => (
            <Card key={entity.label}>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-semibold">{entity.label}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="list-disc pl-4 text-xs text-muted-foreground">
                  {entity.pages.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[10px] text-amber-600">{entity.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold">SEO Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="pb-4 grid gap-3">
              {SEO_TIPS.map((tip) => (
                <div key={tip.label}>
                  <p className="text-xs font-medium">{tip.label}</p>
                  <p className="text-xs text-muted-foreground">{tip.tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
