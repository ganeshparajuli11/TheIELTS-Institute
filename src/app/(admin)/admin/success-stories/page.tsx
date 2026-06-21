import { readContent } from "@/lib/content-store";
import { SuccessStoriesManager } from "@/components/admin/content/success-stories-manager";
import type { ContentSuccessStory } from "@/types/content";

export default function AdminSuccessStoriesPage() {
  const stories = readContent<ContentSuccessStory[]>("success-stories");
  return <SuccessStoriesManager initialData={stories} />;
}
