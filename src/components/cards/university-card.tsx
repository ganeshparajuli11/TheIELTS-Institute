import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type University } from "@/data/universities";

export function UniversityCard({ university }: { university: University }) {
  return (
    <Card className="group overflow-hidden rounded-lg border-border/80 bg-white transition hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[16/9] bg-muted">
        <Image
          src={university.image}
          alt={`${university.name} campus visual`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl leading-tight">
            {university.name}
          </CardTitle>
          {university.featured ? (
            <Badge className="rounded-lg bg-[#e2dfff] text-[#100563] hover:bg-[#c3c0ff]">
              Featured
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p className="font-semibold text-primary">
          {university.city}, {university.region}
        </p>
        <p className="leading-6">{university.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {university.popularCourses.slice(0, 3).map((course) => (
            <Badge
              key={course}
              variant="secondary"
              className="rounded-lg px-3 py-1"
            >
              {course}
            </Badge>
          ))}
        </div>
        <p className="border-t pt-4 font-bold text-primary">
          Intake: {university.intake}
        </p>
      </CardContent>
    </Card>
  );
}
