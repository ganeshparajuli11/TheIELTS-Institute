"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
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
import { mockCourses } from "@/data/admin/courses";
import type { CourseLevel } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const courses = mockCourses;

export default function AdminCoursesPage() {
  const [levelFilter, setLevelFilter] = useState<"all" | CourseLevel>("all");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    if (levelFilter !== "all" && c.level !== levelFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !c.name.toLowerCase().includes(q) &&
        !c.universityName.toLowerCase().includes(q) &&
        !c.subjectArea.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Courses"
        description="Manage course listings under UK universities."
        icon={GraduationCap}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect /admin/courses/new after backend is implemented. */}
            Add Course
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search courses or universities…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search courses"
        />
        <Select
          value={levelFilter}
          onValueChange={(v) => setLevelFilter(v as "all" | CourseLevel)}
        >
          <SelectTrigger className="h-9 w-40 text-sm" aria-label="Filter by level">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="FOUNDATION">Foundation</SelectItem>
            <SelectItem value="BACHELOR">Bachelor</SelectItem>
            <SelectItem value="PRE_MASTERS">Pre-Masters</SelectItem>
            <SelectItem value="MASTER">Master</SelectItem>
            <SelectItem value="PHD">PhD</SelectItem>
            <SelectItem value="DIPLOMA">Diploma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No courses found"
          description="Add courses under a university to get started."
          icon={GraduationCap}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Course</TableHead>
                <TableHead className="hidden sm:table-cell">University</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="hidden md:table-cell">Subject Area</TableHead>
                <TableHead className="hidden lg:table-cell">Duration</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="pl-5">
                    <p className="text-sm font-medium">{course.name}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {course.universityName}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">{course.universityName}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={course.level} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{course.subjectArea}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={course.published ? "PUBLISHED" : "DRAFT"} />
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        {
                          label: "Edit",
                          // TODO: Link to /admin/courses/[id] after backend.
                          disabled: true,
                        },
                        {
                          label: "Manage modules",
                          // TODO: Link to /admin/courses/[id]/modules after backend.
                          disabled: true,
                        },
                        {
                          label: course.published ? "Unpublish" : "Publish",
                          disabled: true,
                        },
                        { separator: true },
                        {
                          label: "Delete",
                          destructive: true,
                          disabled: true,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-border px-5 py-3">
            <p className="text-xs text-muted-foreground">
              {filtered.length} of {courses.length} courses
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
