import { readContent } from "@/lib/content-store";
import { UniversitiesManager } from "@/components/admin/content/universities-manager";
import type { ContentUniversity } from "@/types/content";

export default function AdminUniversitiesPage() {
  const universities = readContent<ContentUniversity[]>("universities");
  return <UniversitiesManager initialData={universities} />;
}
