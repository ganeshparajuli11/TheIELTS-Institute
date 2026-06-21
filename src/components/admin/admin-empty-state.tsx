import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface AdminEmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function AdminEmptyState({
  title = "Nothing here yet",
  description = "Items will appear here once they are added.",
  icon: Icon = Inbox,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground h-6 w-6" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-xs text-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
