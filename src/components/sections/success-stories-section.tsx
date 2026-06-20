import { SuccessStoryCard } from "@/components/cards/success-story-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { successStories } from "@/data/success-stories";

export function SuccessStoriesSection() {
  return (
    <section className="bg-muted/40">
      <div className="container-page section-padding">
        <SectionHeading
          eyebrow="Stories"
          title="Student journey stories"
          description="Student stories are structured for future verified, student-approved CMS publishing."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {successStories.slice(0, 2).map((story) => (
            <SuccessStoryCard key={story.studentName} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
