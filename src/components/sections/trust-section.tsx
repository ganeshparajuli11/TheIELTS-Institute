import { trustIndicators } from "@/data/stats";

export function TrustSection() {
  return (
    <section className="border-border border-y bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
        {trustIndicators.map((item) => (
          <div key={item.value}>
            <p className="font-heading text-primary text-4xl font-extrabold">{item.value}</p>
            <p className="label-caps text-muted-foreground mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
