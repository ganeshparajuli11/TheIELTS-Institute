import { EmptyState } from "@/components/shared/empty-state";

export function AdminPlaceholder({ title }: { title: string }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          TODO: connect auth, RBAC, database, and API.
        </p>
      </div>
      <EmptyState
        title={`${title} preview`}
        description="This admin screen is reserved for the future CMS workflow."
      />
    </section>
  );
}
