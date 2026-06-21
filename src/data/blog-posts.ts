import { readContent } from "@/lib/content-store";
import type { ContentBlogPost } from "@/types/content";

export type BlogPost = ContentBlogPost;

const allPosts = readContent<BlogPost[]>("blog-posts");

export const blogPosts = allPosts
  .filter((p) => p.status === "published")
  .map((p) => ({
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
  }));
