import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/data/process";

type ProcessSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ProcessSection({
  eyebrow = "Journey",
  title = "The Road to the UK",
  description = "A clear pathway from consultation to preparation, applications, visa guidance, and pre-departure planning.",
}: ProcessSectionProps = {}) {
  return (
    <section className="bg-surface-lavender relative overflow-hidden py-20">
      <div className="academic-grid absolute inset-0 opacity-50" />
      <div className="container-page relative z-10">
        <SectionHeading
          className="mx-auto text-center"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="relative mt-16 grid gap-10 md:grid-cols-5">
          <div className="bg-border absolute top-6 right-0 left-0 hidden h-px md:block" />
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative z-10 text-center">
              <div
                className={
                  index === 0
                    ? "border-background bg-primary mx-auto mb-6 flex size-12 items-center justify-center rounded-full border-4 text-lg font-bold text-white shadow-md"
                    : "border-background text-primary mx-auto mb-6 flex size-12 items-center justify-center rounded-full border-4 bg-white text-lg font-bold shadow-md"
                }
              >
                {index + 1}
              </div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
