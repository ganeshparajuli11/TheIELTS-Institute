"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockBlogs } from "@/data/admin/blogs";
import type { PublishStatus } from "@/types/admin";

const BLOG_CATEGORIES = [
  "Study in UK",
  "Visa Guidance",
  "IELTS Tips",
  "University Guide",
  "Scholarships",
  "Student Life",
];

// TODO: Replace mock admin data with secure API call after backend is implemented.
const blogs = mockBlogs;

export default function AdminBlogsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | PublishStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (categoryFilter !== "all" && b.category !== categoryFilter) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Blog"
        description="Manage blog articles and SEO resources."
        icon={FileText}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect /admin/blogs/new after backend. */}
            Write Article
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search blogs"
        />
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="h-9 w-44 text-sm" aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {BLOG_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | PublishStatus)}
        >
          <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No articles found"
          description="Write an article to get started."
          icon={FileText}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
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
              {filtered.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="pl-5">
                    <p className="line-clamp-1 text-sm font-medium">{blog.title}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">{blog.category}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">{blog.category}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{blog.author}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={blog.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {new Date(blog.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        { label: "Edit", disabled: true },
                        { label: "Preview", disabled: true },
                        {
                          label: blog.status === "PUBLISHED" ? "Unpublish" : "Publish",
                          disabled: true,
                        },
                        { separator: true },
                        { label: "Delete", destructive: true, disabled: true },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-border px-5 py-3">
            <p className="text-xs text-muted-foreground">
              {filtered.length} of {blogs.length} articles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
