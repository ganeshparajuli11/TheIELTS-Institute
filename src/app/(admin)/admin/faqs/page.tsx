import { readContent } from "@/lib/content-store";
import { FaqsManager } from "@/components/admin/content/faqs-manager";
import type { ContentFaq } from "@/types/content";

export default function AdminFaqsPage() {
  const faqs = readContent<ContentFaq[]>("faqs");
  return <FaqsManager initialData={faqs} />;
}
