import { Sparkles } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const safetyNotes = [
  "AI must only answer from approved knowledge articles.",
  "AI must never guarantee visa approval or any application outcome.",
  "AI must recommend booking a counselling session for personal application advice.",
  "All AI knowledge articles must be reviewed and approved by a Super Admin before publishing.",
  "AI responses must include a disclaimer that decisions are made by official UK authorities.",
];

export default function AdminAiKnowledgePage() {
  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="AI Knowledge Base"
        description="Manage content for the future AI assistant. Not yet live."
        icon={Sparkles}
      />

      <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3">
        <p className="text-sm text-violet-800">
          <strong>Phase 6 — Not yet implemented.</strong> The AI knowledge base will power a
          chatbot that answers common student questions. All knowledge must be reviewed before
          being used by the AI.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-semibold">AI Safety Requirements</CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <ul className="grid gap-2">
            {safetyNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-violet-500" aria-hidden="true">•</span>
                {note}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <AdminEmptyState
        title="Knowledge base is empty"
        description="Add approved knowledge articles when the AI backend phase is ready."
        icon={Sparkles}
      />
    </div>
  );
}
