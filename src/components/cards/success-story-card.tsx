import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SuccessStory } from "@/data/success-stories";

export function SuccessStoryCard({ story }: { story: SuccessStory }) {
  return (
    <Card className="group overflow-hidden rounded-lg border-border/80 bg-white transition hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={story.image}
          alt={`${story.studentName} success story visual`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{story.studentName}</CardTitle>
        <p className="text-sm font-medium text-primary">
          {story.course}, {story.university}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{story.quote}</p>
        <p className="mt-5 border-t pt-4 text-xs font-bold uppercase tracking-wide text-primary">
          {story.intake}
        </p>
      </CardContent>
    </Card>
  );
}
