import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type University } from "@/data/universities";

export function UniversityCard({ university }: { university: University }) {
  return (
    <Card className="group border-border/80 hover:border-primary hover:shadow-primary/10 overflow-hidden rounded-lg bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-muted relative aspect-[16/9]">
        <Image
          src={university.image}
          alt={`${university.name} campus visual`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl leading-tight">{university.name}</CardTitle>
          {university.featured ? (
            <Badge className="rounded-lg bg-[--badge-soft] text-[--badge-soft-fg] hover:bg-[--badge-soft-hover]">
              Featured
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4 text-sm">
        <p className="text-primary font-semibold">
          {university.city}, {university.region}
        </p>
        <p className="leading-6">{university.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {university.popularCourses.slice(0, 3).map((course) => (
            <Badge key={course} variant="secondary" className="rounded-lg px-3 py-1">
              {course}
            </Badge>
          ))}
        </div>
        <p className="text-primary border-t pt-4 font-bold">Intake: {university.intake}</p>
      </CardContent>
    </Card>
  );
}
