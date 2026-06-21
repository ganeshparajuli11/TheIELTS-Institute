import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SuccessStory } from "@/data/success-stories";

export function SuccessStoryCard({ story }: { story: SuccessStory }) {
  return (
    <Card className="group border-border/80 hover:border-primary hover:shadow-primary/10 overflow-hidden rounded-lg bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-muted relative aspect-[4/3]">
        <Image
          src={story.image}
          alt={`${story.studentName} success story visual`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{story.studentName}</CardTitle>
        <p className="text-primary text-sm font-medium">
          {story.course}, {story.university}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-6">{story.quote}</p>
        <p className="text-primary mt-5 border-t pt-4 text-xs font-bold tracking-wide uppercase">
          {story.intake}
        </p>
      </CardContent>
    </Card>
  );
}
