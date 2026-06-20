import { cn } from "@/lib/utils";
import type {
  EnquiryStatus,
  Priority,
  PublishStatus,
  StaffStatus,
  CourseLevel,
} from "@/types/admin";

type BadgeVariant = EnquiryStatus | Priority | PublishStatus | StaffStatus | CourseLevel | string;

const variantStyles: Record<string, string> = {
  // Enquiry statuses
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-violet-50 text-violet-700 border-violet-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  DOCUMENT_PENDING: "bg-orange-50 text-orange-700 border-orange-200",
  APPLICATION_STARTED: "bg-sky-50 text-sky-700 border-sky-200",
  VISA_GUIDANCE: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CONVERTED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  NOT_INTERESTED: "bg-slate-50 text-slate-500 border-slate-200",

  // Priority
  LOW: "bg-slate-50 text-slate-600 border-slate-200",
  NORMAL: "bg-blue-50 text-blue-600 border-blue-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  URGENT: "bg-red-50 text-red-700 border-red-200",

  // Publish status
  DRAFT: "bg-slate-100 text-slate-600 border-slate-200",
  PUBLISHED: "bg-green-50 text-green-700 border-green-200",
  ARCHIVED: "bg-slate-50 text-slate-500 border-slate-200",

  // Staff status
  ACTIVE: "bg-green-50 text-green-700 border-green-200",
  DISABLED: "bg-red-50 text-red-700 border-red-200",
  INVITED: "bg-amber-50 text-amber-700 border-amber-200",

  // Course levels
  FOUNDATION: "bg-slate-50 text-slate-600 border-slate-200",
  BACHELOR: "bg-blue-50 text-blue-700 border-blue-200",
  MASTER: "bg-violet-50 text-violet-700 border-violet-200",
  PRE_MASTERS: "bg-sky-50 text-sky-700 border-sky-200",
  PHD: "bg-purple-50 text-purple-700 border-purple-200",
  DIPLOMA: "bg-teal-50 text-teal-700 border-teal-200",
};

const variantLabels: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  IN_PROGRESS: "In Progress",
  DOCUMENT_PENDING: "Docs Pending",
  APPLICATION_STARTED: "App Started",
  VISA_GUIDANCE: "Visa Guidance",
  CONVERTED: "Converted",
  CLOSED: "Closed",
  NOT_INTERESTED: "Not Interested",
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
  URGENT: "Urgent",
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
  ACTIVE: "Active",
  DISABLED: "Disabled",
  INVITED: "Invited",
  FOUNDATION: "Foundation",
  BACHELOR: "Bachelor",
  MASTER: "Master",
  PRE_MASTERS: "Pre-Masters",
  PHD: "PhD",
  DIPLOMA: "Diploma",
};

interface AdminStatusBadgeProps {
  status: BadgeVariant;
  className?: string;
}

export function AdminStatusBadge({ status, className }: AdminStatusBadgeProps) {
  const styles = variantStyles[status] ?? "bg-slate-100 text-slate-600 border-slate-200";
  const label = variantLabels[status] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium",
        styles,
        className,
      )}
    >
      {label}
    </span>
  );
}
