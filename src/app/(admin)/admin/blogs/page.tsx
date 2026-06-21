import { readContent } from "@/lib/content-store";
import { BlogsManager } from "@/components/admin/content/blogs-manager";
import type { ContentBlogPost } from "@/types/content";

export default function AdminBlogsPage() {
  const posts = readContent<ContentBlogPost[]>("blog-posts");
  return <BlogsManager initialData={posts} />;
}
