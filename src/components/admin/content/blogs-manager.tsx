"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/app/actions/content";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminConfirmDialog } from "@/components/admin/admin-confirm-dialog";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ContentBlogPost } from "@/types/content";

const BLOG_CATEGORIES = [
  "Application planning",
  "IELTS guidance",
  "Study in UK",
  "Visa guidance",
  "Student life",
  "News",
];

const blogSchema = z.object({
  title: z.string().min(5, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string(),
  author: z.string(),
  status: z.enum(["published", "draft"]),
});

type FormValues = z.infer<typeof blogSchema>;

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function BlogForm({ post, onSuccess }: { post?: ContentBlogPost; onSuccess: () => void }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          status: post.status,
        }
      : {
          title: "",
          slug: "",
          category: "",
          excerpt: "",
          content: "",
          author: "IELTS Institute Team",
          status: "draft",
        },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      if (post) {
        await updateBlogPost(post.id, values);
        toast.success("Post updated");
      } else {
        await createBlogPost(values);
        toast.success("Post added");
      }
      onSuccess();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="How to plan your UK study application"
                  onChange={(e) => {
                    field.onChange(e);
                    if (!post) {
                      form.setValue("slug", toSlug(e.target.value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="how-to-plan-uk-study-application" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} placeholder="A short summary for listing pages" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving…" : post ? "Save changes" : "Add post"}
        </Button>
      </form>
    </Form>
  );
}

export function BlogsManager({ initialData }: { initialData: ContentBlogPost[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentBlogPost | null>(null);
  const [deleteItem, setDeleteItem] = useState<ContentBlogPost | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filtered = initialData.filter((b) => {
    if (categoryFilter !== "all" && b.category !== categoryFilter) return false;
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    }
    return true;
  });

  function handleSaved() {
    router.refresh();
    setAddOpen(false);
    setEditItem(null);
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await deleteBlogPost(deleteItem.id);
    router.refresh();
    setDeleteLoading(false);
    setDeleteItem(null);
    toast.success("Post deleted");
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Blog Posts"
        description="Manage blog posts and articles shown on the public website."
        icon={FileText}
        actions={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Post
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {BLOG_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No posts found"
          description="Add a blog post to get started."
          icon={FileText}
        />
      ) : (
        <div className="border-border bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Title</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Updated</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="pl-5">
                    <p className="line-clamp-1 text-sm font-medium">{post.title}</p>
                    <p className="text-muted-foreground line-clamp-1 text-xs">{post.excerpt}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground text-sm">{post.category}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground text-sm">{post.author}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge
                      status={post.status === "published" ? "PUBLISHED" : "DRAFT"}
                    />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground text-xs">
                      {new Date(post.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        { label: "Edit", onClick: () => setEditItem(post) },
                        { separator: true },
                        {
                          label: "Delete",
                          destructive: true,
                          onClick: () => setDeleteItem(post),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-border border-t px-5 py-3">
            <p className="text-muted-foreground text-xs">
              {filtered.length} of {initialData.length} posts
            </p>
          </div>
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New blog post</DialogTitle>
          </DialogHeader>
          <BlogForm onSuccess={handleSaved} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit blog post</DialogTitle>
          </DialogHeader>
          {editItem && <BlogForm post={editItem} onSuccess={handleSaved} />}
        </DialogContent>
      </Dialog>

      <AdminConfirmDialog
        open={!!deleteItem}
        onOpenChange={(o) => !o && setDeleteItem(null)}
        title="Delete post"
        description={`Remove "${deleteItem?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
