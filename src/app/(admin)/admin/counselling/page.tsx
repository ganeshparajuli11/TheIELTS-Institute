"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
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
import { mockCounsellingSubmissions } from "@/data/admin/counselling";
import type { EnquiryStatus } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const submissions = mockCounsellingSubmissions;

export default function AdminCounsellingPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !s.fullName.toLowerCase().includes(q) &&
        !s.email.toLowerCase().includes(q) &&
        !s.preferredCourse.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Counselling Requests"
        description="Manage detailed counselling form submissions from students."
        icon={ClipboardList}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search name, email or course…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search counselling requests"
        />
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | EnquiryStatus)}
        >
          <SelectTrigger className="h-9 w-44 text-sm" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DOCUMENT_PENDING">Docs Pending</SelectItem>
            <SelectItem value="CONVERTED">Converted</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No counselling requests found"
          description="Requests submitted via the counselling form will appear here."
          icon={ClipboardList}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Student</TableHead>
                  <TableHead className="hidden sm:table-cell">Preferred Course</TableHead>
                  <TableHead className="hidden md:table-cell">Intake</TableHead>
                  <TableHead className="hidden lg:table-cell">English Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Date</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="pl-5">
                      <div>
                        <p className="text-sm font-medium">{submission.fullName}</p>
                        <p className="text-xs text-muted-foreground">{submission.email}</p>
                        <p className="text-xs text-muted-foreground">{submission.location}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div>
                        <p className="text-sm">{submission.preferredCourse}</p>
                        <p className="text-xs text-muted-foreground">
                          {submission.highestQualification}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {submission.preferredIntake}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {submission.englishStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AdminStatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.createdAt).toLocaleDateString("en-GB", {
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
                            label: "View details",
                            // TODO: Link to /admin/counselling/[id] detail page.
                            disabled: true,
                          },
                          {
                            label: "Update status",
                            // TODO: Connect status mutation after backend is implemented.
                            disabled: true,
                          },
                          {
                            label: "Add note",
                            disabled: true,
                          },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-border px-5 py-3">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {submissions.length} submissions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
