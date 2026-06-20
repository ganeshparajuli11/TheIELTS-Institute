import type { AdminSuccessStory } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
export const mockSuccessStories: AdminSuccessStory[] = [
  {
    id: "ss_001",
    studentName: "Aisha Thapa",
    university: "University of Manchester",
    course: "MSc International Business",
    intake: "September 2025",
    featured: true,
    status: "PUBLISHED",
    publishedAt: "2026-03-15T10:00:00Z",
    createdAt: "2026-03-10T09:00:00Z",
  },
  {
    id: "ss_002",
    studentName: "Rajan Karki",
    university: "University of Leeds",
    course: "MSc Data Science",
    intake: "January 2026",
    featured: false,
    status: "PUBLISHED",
    publishedAt: "2026-04-01T10:00:00Z",
    createdAt: "2026-03-28T09:00:00Z",
  },
  {
    id: "ss_003",
    studentName: "Sima Gurung",
    university: "Coventry University",
    course: "BSc Computer Science",
    intake: "September 2025",
    featured: false,
    status: "DRAFT",
    createdAt: "2026-06-10T09:00:00Z",
  },
];
