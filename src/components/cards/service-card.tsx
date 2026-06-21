import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Service } from "@/data/services";
import { iconMap } from "@/lib/icons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <Card className="group border-border/80 flex h-full flex-col bg-white p-2 transition hover:-translate-y-1 hover:shadow-xl">
      <CardHeader>
        <div className="bg-icon-bg text-primary group-hover:bg-primary mb-4 flex size-16 items-center justify-center rounded-full transition group-hover:text-white">
          <Icon className="size-8" />
        </div>
        <CardTitle className="text-2xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <p className="text-muted-foreground flex-1 leading-7">{service.shortDescription}</p>
        <Link
          href="/services"
          className="text-primary mt-auto inline-flex items-center gap-2 text-sm font-semibold"
        >
          {service.ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
