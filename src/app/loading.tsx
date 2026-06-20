import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container-page section-padding">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-6 h-40 w-full" />
    </main>
  );
}
