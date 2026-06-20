"use client";

import { useState } from "react";
import { Building2, Plus } from "lucide-react";
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
import { mockUniversities } from "@/data/admin/universities";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const universities = mockUniversities;

export default function AdminUniversitiesPage() {
  const [search, setSearch] = useState("");

  const filtered = universities.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Universities"
        description="Manage UK university listings shown on the public website."
        icon={Building2}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect /admin/universities/new after backend is implemented. */}
            Add University
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search universities…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search universities"
        />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No universities found"
          description="Add a university to get started."
          icon={Building2}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">University</TableHead>
                <TableHead className="hidden sm:table-cell">City</TableHead>
                <TableHead className="hidden md:table-cell">Region</TableHead>
                <TableHead className="hidden sm:table-cell">Courses</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="hidden md:table-cell">Featured</TableHead>
                <TableHead className="hidden lg:table-cell">Updated</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((uni) => (
                <TableRow key={uni.id}>
                  <TableCell className="pl-5">
                    <p className="text-sm font-medium">{uni.name}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {uni.city}, {uni.region}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">{uni.city}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{uni.region}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {uni.coursesCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={uni.published ? "PUBLISHED" : "DRAFT"} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {uni.featured && (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {new Date(uni.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        {
                          label: "Edit",
                          // TODO: Link to /admin/universities/[id] after backend.
                          disabled: true,
                        },
                        {
                          label: "Manage courses",
                          // TODO: Link to /admin/universities/[id]/courses after backend.
                          disabled: true,
                        },
                        {
                          label: uni.published ? "Unpublish" : "Publish",
                          // TODO: Connect publish toggle after backend is implemented.
                          disabled: true,
                        },
                        { separator: true },
                        {
                          label: "Delete",
                          destructive: true,
                          // TODO: Connect delete with confirm dialog after backend.
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
              {filtered.length} of {universities.length} universities
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
