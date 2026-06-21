"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
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
import { mockAuditLogs } from "@/data/admin/audit-logs";
import type { AuditAction } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
// Audit logs are read-only. Staff must not be able to edit or delete audit records.
const logs = mockAuditLogs;

const ACTION_LABELS: Record<AuditAction, string> = {
  ADMIN_LOGIN_SUCCESS: "Login success",
  ADMIN_LOGIN_FAILED: "Login failed",
  ENQUIRY_CREATED: "Enquiry created",
  ENQUIRY_STATUS_CHANGED: "Status changed",
  ENQUIRY_NOTE_ADDED: "Note added",
  UNIVERSITY_CREATED: "University created",
  UNIVERSITY_UPDATED: "University updated",
  COURSE_CREATED: "Course created",
  COURSE_UPDATED: "Course updated",
  CONTENT_UPDATED: "Content updated",
  STAFF_INVITED: "Staff invited",
  STAFF_DISABLED: "Staff disabled",
};

const ACTION_BADGE: Record<AuditAction, string> = {
  ADMIN_LOGIN_SUCCESS: "bg-green-50 text-green-700 border-green-200",
  ADMIN_LOGIN_FAILED: "bg-red-50 text-red-700 border-red-200",
  ENQUIRY_CREATED: "bg-blue-50 text-blue-700 border-blue-200",
  ENQUIRY_STATUS_CHANGED: "bg-amber-50 text-amber-700 border-amber-200",
  ENQUIRY_NOTE_ADDED: "bg-violet-50 text-violet-700 border-violet-200",
  UNIVERSITY_CREATED: "bg-sky-50 text-sky-700 border-sky-200",
  UNIVERSITY_UPDATED: "bg-sky-50 text-sky-700 border-sky-200",
  COURSE_CREATED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  COURSE_UPDATED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CONTENT_UPDATED: "bg-teal-50 text-teal-700 border-teal-200",
  STAFF_INVITED: "bg-purple-50 text-purple-700 border-purple-200",
  STAFF_DISABLED: "bg-orange-50 text-orange-700 border-orange-200",
};

const ALL_ACTIONS = Object.keys(ACTION_LABELS) as AuditAction[];

export default function AdminAuditLogsPage() {
  const [actionFilter, setActionFilter] = useState<"all" | AuditAction>("all");

  const filtered = logs.filter((l) => {
    if (actionFilter !== "all" && l.action !== actionFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Audit Logs"
        description="Read-only record of all admin actions. Logs cannot be edited or deleted."
        icon={BarChart3}
      />

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-700">
          Audit logs are read-only and are written automatically by the system. They cannot be
          modified or deleted by any admin user.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={actionFilter}
          onValueChange={(v) => setActionFilter(v as "all" | AuditAction)}
        >
          <SelectTrigger className="h-9 w-52 text-sm" aria-label="Filter by action">
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {ALL_ACTIONS.map((action) => (
              <SelectItem key={action} value={action}>
                {ACTION_LABELS[action]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No audit logs found"
          description="Admin actions will be recorded here automatically."
          icon={BarChart3}
        />
      ) : (
        <div className="border-border bg-card rounded-lg border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Action</TableHead>
                  <TableHead className="hidden sm:table-cell">User</TableHead>
                  <TableHead className="hidden md:table-cell">Entity</TableHead>
                  <TableHead className="hidden lg:table-cell">IP Address</TableHead>
                  <TableHead>Date / Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="pl-5">
                      <span
                        className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${ACTION_BADGE[log.action] ?? "border-slate-200 bg-slate-100 text-slate-600"}`}
                      >
                        {ACTION_LABELS[log.action] ?? log.action}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div>
                        <p className="text-sm">{log.userName ?? "System"}</p>
                        {log.userEmail && (
                          <p className="text-muted-foreground text-xs">{log.userEmail}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {log.entityType ? (
                        <span className="text-muted-foreground text-sm">
                          {log.entityType}{" "}
                          {log.entityId && (
                            <code className="text-muted-foreground/60 text-xs">
                              #{log.entityId.slice(-6)}
                            </code>
                          )}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <code className="text-muted-foreground text-xs">{log.ipAddress ?? "—"}</code>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-xs">
                        {new Date(log.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-border border-t px-5 py-3">
            <p className="text-muted-foreground text-xs">
              {filtered.length} of {logs.length} log entries
              {/* TODO: Add pagination after backend API supports cursor-based audit log pagination. */}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
