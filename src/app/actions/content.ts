"use server";

import { revalidatePath } from "next/cache";
import { generateContentId, readContent, writeContent } from "@/lib/content-store";
import type {
  ContentBlogPost,
  ContentFaq,
  ContentSuccessStory,
  ContentSiteConfig,
  ContentUniversity,
} from "@/types/content";

// TODO: Verify admin session before every mutation once Phase 2 auth is implemented.
// All mutations must check: isAuthenticated && (role === "ADMIN" || role === "SUPER_ADMIN")

// ── Universities ────────────────────────────────────────────────────────────

export async function createUniversity(
  data: Omit<ContentUniversity, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentUniversity[]>("universities");
  const item: ContentUniversity = {
    ...data,
    id: generateContentId(),
    updatedAt: new Date().toISOString(),
  };
  writeContent("universities", [...all, item]);
  revalidatePath("/universities");
  revalidatePath("/");
  revalidatePath("/admin/universities");
}

export async function updateUniversity(
  id: string,
  data: Omit<ContentUniversity, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentUniversity[]>("universities");
  const updated = all.map((u) =>
    u.id === id ? { ...data, id, updatedAt: new Date().toISOString() } : u,
  );
  writeContent("universities", updated);
  revalidatePath("/universities");
  revalidatePath("/");
  revalidatePath("/admin/universities");
}

export async function deleteUniversity(id: string): Promise<void> {
  const all = readContent<ContentUniversity[]>("universities");
  writeContent(
    "universities",
    all.filter((u) => u.id !== id),
  );
  revalidatePath("/universities");
  revalidatePath("/");
  revalidatePath("/admin/universities");
}

// ── Success Stories ─────────────────────────────────────────────────────────

export async function createSuccessStory(
  data: Omit<ContentSuccessStory, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentSuccessStory[]>("success-stories");
  const item: ContentSuccessStory = {
    ...data,
    id: generateContentId(),
    updatedAt: new Date().toISOString(),
  };
  writeContent("success-stories", [...all, item]);
  revalidatePath("/success-stories");
  revalidatePath("/");
  revalidatePath("/admin/success-stories");
}

export async function updateSuccessStory(
  id: string,
  data: Omit<ContentSuccessStory, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentSuccessStory[]>("success-stories");
  const updated = all.map((s) =>
    s.id === id ? { ...data, id, updatedAt: new Date().toISOString() } : s,
  );
  writeContent("success-stories", updated);
  revalidatePath("/success-stories");
  revalidatePath("/");
  revalidatePath("/admin/success-stories");
}

export async function deleteSuccessStory(id: string): Promise<void> {
  const all = readContent<ContentSuccessStory[]>("success-stories");
  writeContent(
    "success-stories",
    all.filter((s) => s.id !== id),
  );
  revalidatePath("/success-stories");
  revalidatePath("/");
  revalidatePath("/admin/success-stories");
}

// ── FAQs ─────────────────────────────────────────────────────────────────────

export async function createFaq(data: Omit<ContentFaq, "id">): Promise<void> {
  const all = readContent<ContentFaq[]>("faqs");
  const item: ContentFaq = { ...data, id: generateContentId() };
  writeContent("faqs", [...all, item]);
  revalidatePath("/");
  revalidatePath("/study-in-uk");
  revalidatePath("/services");
  revalidatePath("/counselling");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
}

export async function updateFaq(id: string, data: Omit<ContentFaq, "id">): Promise<void> {
  const all = readContent<ContentFaq[]>("faqs");
  const updated = all.map((f) => (f.id === id ? { ...data, id } : f));
  writeContent("faqs", updated);
  revalidatePath("/");
  revalidatePath("/study-in-uk");
  revalidatePath("/services");
  revalidatePath("/counselling");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(id: string): Promise<void> {
  const all = readContent<ContentFaq[]>("faqs");
  writeContent(
    "faqs",
    all.filter((f) => f.id !== id),
  );
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

// ── Blog Posts ───────────────────────────────────────────────────────────────

export async function createBlogPost(
  data: Omit<ContentBlogPost, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentBlogPost[]>("blog-posts");
  const item: ContentBlogPost = {
    ...data,
    id: generateContentId(),
    updatedAt: new Date().toISOString(),
  };
  writeContent("blog-posts", [...all, item]);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blogs");
}

export async function updateBlogPost(
  id: string,
  data: Omit<ContentBlogPost, "id" | "updatedAt">,
): Promise<void> {
  const all = readContent<ContentBlogPost[]>("blog-posts");
  const updated = all.map((b) =>
    b.id === id ? { ...data, id, updatedAt: new Date().toISOString() } : b,
  );
  writeContent("blog-posts", updated);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blogs");
}

export async function deleteBlogPost(id: string): Promise<void> {
  const all = readContent<ContentBlogPost[]>("blog-posts");
  writeContent(
    "blog-posts",
    all.filter((b) => b.id !== id),
  );
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

// ── Site Config ──────────────────────────────────────────────────────────────

export async function updateSiteConfig(data: ContentSiteConfig): Promise<void> {
  writeContent("site-config", data);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
