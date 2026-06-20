import { UniversityCard } from "@/components/cards/university-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { universities } from "@/data/universities";

export function UniversitiesSection() {
  return (
    <section className="container-page section-padding">
      <SectionHeading
        eyebrow="Universities"
        title="Featured UK university profiles"
        description="This preview shows only selected UK university profiles. The full browse experience lives on the Universities page."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {universities
          .filter((university) => university.featured)
          .map((university) => (
            <UniversityCard key={university.slug} university={university} />
          ))}
      </div>
    </section>
  );
}
