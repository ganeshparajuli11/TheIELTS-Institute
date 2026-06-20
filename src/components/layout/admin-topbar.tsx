import { ModeToggle } from "@/components/shared/mode-toggle";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium">Admin shell</p>
          <p className="text-xs text-muted-foreground">
            TODO: connect database and API.
          </p>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
