import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#cfdaf2] py-20">
      <div className="academic-grid absolute inset-0 opacity-50" />
      <div className="container-page relative z-10">
        <SectionHeading
          className="mx-auto text-center"
          eyebrow="Journey"
          title="The Road to the UK"
          description="A clear pathway from consultation to preparation, applications, visa guidance, and pre-departure planning."
        />
        <div className="relative mt-16 grid gap-10 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative z-10 text-center">
              <div
                className={
                  index === 0
                    ? "mx-auto mb-6 flex size-12 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-bold text-white shadow-md"
                    : "mx-auto mb-6 flex size-12 items-center justify-center rounded-full border-4 border-background bg-white text-lg font-bold text-primary shadow-md"
                }
              >
                {index + 1}
              </div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
