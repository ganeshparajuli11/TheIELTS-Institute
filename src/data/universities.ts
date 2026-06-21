import { readContent } from "@/lib/content-store";
import type { ContentUniversity } from "@/types/content";

export type University = ContentUniversity;

export const universities: University[] = readContent<University[]>("universities");
