import type { AdminBlog } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
export const mockBlogs: AdminBlog[] = [
  {
    id: "blog_001",
    title: "How to Apply to UK Universities from Nepal: Step-by-Step Guide",
    category: "Study in UK",
    author: "Anita Karki",
    status: "PUBLISHED",
    publishedAt: "2026-05-20T10:00:00Z",
    updatedAt: "2026-05-22T12:00:00Z",
  },
  {
    id: "blog_002",
    title: "IELTS Score Requirements for UK Universities in 2026",
    category: "IELTS Tips",
    author: "Rajesh Pandey",
    status: "PUBLISHED",
    publishedAt: "2026-04-15T10:00:00Z",
    updatedAt: "2026-04-16T09:00:00Z",
  },
  {
    id: "blog_003",
    title: "UK Student Visa Application: Common Mistakes and How to Avoid Them",
    category: "Visa Guidance",
    author: "Bikram Singh",
    status: "DRAFT",
    updatedAt: "2026-06-18T15:00:00Z",
  },
  {
    id: "blog_004",
    title: "Top 5 Universities in the UK for Business Studies",
    category: "University Guide",
    author: "Anita Karki",
    status: "DRAFT",
    updatedAt: "2026-06-12T11:00:00Z",
  },
];
