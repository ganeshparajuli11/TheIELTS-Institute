import { SectionHeading } from "@/components/shared/section-heading";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  children,
}: PagePlaceholderProps) {
  return (
    <section className="container-page section-padding">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="premium-card mt-10 p-6">
        {children ?? (
          <p className="text-sm text-muted-foreground">
            Placeholder section. Full page design and content will be added in a
            later frontend milestone.
          </p>
        )}
      </div>
    </section>
  );
}
