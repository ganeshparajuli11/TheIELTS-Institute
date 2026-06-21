import { AlertTriangle } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  description = "This state will be connected to real error handling later.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="border-destructive/25 bg-destructive/5 rounded-lg border p-6">
      <AlertTriangle className="text-destructive size-5" />
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}
