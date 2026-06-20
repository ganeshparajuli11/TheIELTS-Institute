"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockSuccessStories } from "@/data/admin/success-stories";
import type { PublishStatus } from "@/types/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const stories = mockSuccessStories;

export default function AdminSuccessStoriesPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | PublishStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = stories.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !s.studentName.toLowerCase().includes(q) &&
        !s.university.toLowerCase().includes(q) &&
        !s.course.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Success Stories"
        description="Manage student success stories published on the website."
        icon={Star}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect /admin/success-stories/new after backend. */}
            Add Story
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search stories…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search success stories"
        />
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
          title="No success stories found"
          description="Add a student success story to get started."
          icon={Star}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Student</TableHead>
                <TableHead className="hidden sm:table-cell">University</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="hidden lg:table-cell">Intake</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Featured</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="pl-5">
                    <p className="text-sm font-medium">{story.studentName}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">{story.university}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">{story.university}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{story.course}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{story.intake}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={story.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {story.featured && (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        { label: "Edit", disabled: true },
                        { label: "Preview", disabled: true },
                        {
                          label: story.status === "PUBLISHED" ? "Unpublish" : "Publish",
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
              {filtered.length} of {stories.length} stories
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
