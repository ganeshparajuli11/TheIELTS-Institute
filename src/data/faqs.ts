import { readContent } from "@/lib/content-store";
import type { ContentFaq, FaqPageKey } from "@/types/content";

export type { FaqPageKey };

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function groupFaqs(faqs: ContentFaq[]): Record<FaqPageKey, FaqItem[]> {
  const groups: Record<FaqPageKey, FaqItem[]> = {
    home: [],
    studyInUk: [],
    services: [],
    counselling: [],
    contact: [],
  };
  for (const faq of faqs) {
    if (!faq.published) continue;
    groups[faq.pageKey].push({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
  }
  return groups;
}

const allFaqs = readContent<ContentFaq[]>("faqs");
export const faqGroups = groupFaqs(allFaqs);
export const faqs = faqGroups.home;
