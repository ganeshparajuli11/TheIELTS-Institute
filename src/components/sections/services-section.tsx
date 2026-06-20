import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="container-page section-padding">
      <SectionHeading
        className="mx-auto text-center"
        eyebrow="Services"
        title="Our Premium Services"
        description="We provide a holistic approach to your international education, ensuring every step of your application is handled with institutional precision."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
