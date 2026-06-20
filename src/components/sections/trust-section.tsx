import { trustIndicators } from "@/data/stats";

export function TrustSection() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
        {trustIndicators.map((item) => (
          <div key={item.value}>
            <p className="font-heading text-4xl font-extrabold text-primary">
              {item.value}
            </p>
            <p className="label-caps mt-2 text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
