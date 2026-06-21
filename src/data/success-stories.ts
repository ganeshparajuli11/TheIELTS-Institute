import { readContent } from "@/lib/content-store";
import type { ContentSuccessStory } from "@/types/content";

export type SuccessStory = ContentSuccessStory;

export const successStories: SuccessStory[] = readContent<SuccessStory[]>("success-stories");
