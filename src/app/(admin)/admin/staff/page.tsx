"use client";

import { Plus, Users } from "lucide-react";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockStaff } from "@/data/admin/staff";

// TODO: Replace mock admin data with secure API call after backend is implemented.
// TODO: Only SUPER_ADMIN should see and manage this page — enforce via RBAC in middleware after auth is implemented.
const staff = mockStaff;

function formatDate(dateString?: string) {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminStaffPage() {
  const filtered = staff;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Staff Management"
        description="Manage admin and staff accounts. Only Super Admins can manage staff."
        icon={Users}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect staff invitation after auth backend is implemented. */}
            Invite Staff
          </Button>
        }
      />

      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
        <p className="text-sm text-blue-800">
          <strong>Security note.</strong> Only Super Admin should manage staff accounts. Staff
          cannot disable or delete Super Admin accounts. Role-based access control (RBAC) will be
          enforced in the backend middleware after Phase 2 authentication is implemented.
        </p>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No staff found"
          description="Invite a staff member to get started."
          icon={Users}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Staff Member</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-semibold text-primary">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {member.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={member.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(member.lastLoginAt)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(member.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        {
                          label: "Edit role",
                          // TODO: RBAC check: only SUPER_ADMIN can edit roles.
                          // TODO: Connect after backend is implemented.
                          disabled: true,
                        },
                        {
                          label: member.status === "ACTIVE" ? "Disable account" : "Enable account",
                          // TODO: SUPER_ADMIN cannot be disabled by another admin.
                          // TODO: Connect after backend is implemented.
                          disabled: true,
                        },
                        {
                          label: "Reset password",
                          disabled: true,
                        },
                        { separator: true },
                        {
                          label: "Remove staff",
                          destructive: true,
                          // TODO: RBAC check: only SUPER_ADMIN, cannot remove themselves.
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
            <p className="text-xs text-muted-foreground">{staff.length} staff members</p>
          </div>
        </div>
      )}
    </div>
  );
}
