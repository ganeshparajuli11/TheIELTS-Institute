"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEnquiries } from "@/data/admin/enquiries";
import type { EnquiryStatus, Priority } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const enquiries = mockEnquiries;

const statusTabs: { value: "all" | EnquiryStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DOCUMENT_PENDING", label: "Docs Pending" },
  { value: "CONVERTED", label: "Converted" },
  { value: "CLOSED", label: "Closed" },
];

export default function AdminEnquiriesPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [search, setSearch] = useState("");

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (priorityFilter !== "all" && e.priority !== priorityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !e.fullName.toLowerCase().includes(q) &&
        !e.email.toLowerCase().includes(q) &&
        !e.phone.includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Enquiries"
        description="Manage all contact form submissions and lead enquiries."
        icon={MessageSquare}
        actions={
          <Button size="sm" disabled>
            {/* TODO: Connect add enquiry after backend is implemented. */}
            Add Enquiry
          </Button>
        }
      />

      {/* Status tabs */}
      <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | EnquiryStatus)}>
        <TabsList className="h-9 flex-wrap">
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
              {tab.label}
              {tab.value !== "all" && (
                <span className="bg-muted text-muted-foreground ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium tabular-nums">
                  {enquiries.filter((e) => e.status === tab.value).length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search name, email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
          aria-label="Search enquiries"
        />
        <Select
          value={priorityFilter}
          onValueChange={(v) => setPriorityFilter(v as "all" | Priority)}
        >
          <SelectTrigger className="h-9 w-40 text-sm" aria-label="Filter by priority">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="URGENT">Urgent</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="NORMAL">Normal</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>
        {(statusFilter !== "all" || priorityFilter !== "all" || search) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 text-xs"
            onClick={() => {
              setStatusFilter("all");
              setPriorityFilter("all");
              setSearch("");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No enquiries found"
          description="Try adjusting your search or filter criteria."
          icon={MessageSquare}
        />
      ) : (
        <div className="border-border bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Student</TableHead>
                <TableHead className="hidden sm:table-cell">Interest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="hidden lg:table-cell">Assigned</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="pl-5">
                    <div>
                      <p className="text-sm font-medium">{enquiry.fullName}</p>
                      <p className="text-muted-foreground text-xs">{enquiry.email}</p>
                      <p className="text-muted-foreground text-xs sm:hidden">{enquiry.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground text-sm capitalize">
                      {enquiry.enquiryType?.replace(/-/g, " ") ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={enquiry.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AdminStatusBadge status={enquiry.priority} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground text-sm">
                      {enquiry.assignedTo ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground text-xs">
                      {new Date(enquiry.createdAt).toLocaleDateString("en-GB", {
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
                          // TODO: Link to /admin/enquiries/[id] detail page.
                          disabled: true,
                        },
                        {
                          label: "Update status",
                          // TODO: Connect status mutation after backend is implemented.
                          disabled: true,
                        },
                        {
                          label: "Assign staff",
                          // TODO: Connect RBAC-gated assignment after backend.
                          disabled: true,
                        },
                        { separator: true },
                        {
                          label: "Add note",
                          // TODO: Connect note creation after backend is implemented.
                          disabled: true,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-border flex items-center justify-between border-t px-5 py-3">
            <p className="text-muted-foreground text-xs">
              Showing {filtered.length} of {enquiries.length} enquiries
            </p>
            {/* TODO: Add pagination after backend API supports cursor/page-based pagination. */}
          </div>
        </div>
      )}
    </div>
  );
}
