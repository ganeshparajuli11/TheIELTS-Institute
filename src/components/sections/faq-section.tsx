import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { type FaqItem, faqGroups } from "@/data/faqs";

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FaqItem[];
};

export function FaqSection({
  eyebrow = "FAQ",
  title = "Common UK study questions",
  description = "Answers use safe, compliance-aware wording and avoid promised outcomes.",
  items = faqGroups.home,
}: FaqSectionProps) {
  return (
    <section className="container-page section-padding">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <Accordion className="mt-10 max-w-3xl">
        {items.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
