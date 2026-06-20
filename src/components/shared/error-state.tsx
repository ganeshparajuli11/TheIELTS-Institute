import { AlertTriangle } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  description = "This state will be connected to real error handling later.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-lg border border-destructive/25 bg-destructive/5 p-6">
      <AlertTriangle className="size-5 text-destructive" />
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
