import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  permissionKey?: string;
  badgeCount?: number;
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        description: "Operational overview and KPIs",
        permissionKey: "dashboard.view",
      },
    ],
  },
  {
    label: "Students",
    items: [
      {
        label: "Enquiries",
        href: "/admin/enquiries",
        icon: MessageSquare,
        description: "Manage contact form submissions",
        permissionKey: "enquiries.view",
      },
      {
        label: "Counselling Requests",
        href: "/admin/counselling",
        icon: ClipboardList,
        description: "Manage counselling form submissions",
        permissionKey: "counselling.view",
      },
      {
        label: "Staff",
        href: "/admin/staff",
        icon: Users,
        description: "Manage admin and staff accounts",
        permissionKey: "staff.view",
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Universities",
        href: "/admin/universities",
        icon: Building2,
        description: "Manage UK university listings",
        permissionKey: "universities.view",
      },
      {
        label: "Courses",
        href: "/admin/courses",
        icon: GraduationCap,
        description: "Manage course listings",
        permissionKey: "courses.view",
      },
      {
        label: "Success Stories",
        href: "/admin/success-stories",
        icon: Star,
        description: "Manage student success stories",
        permissionKey: "successStories.view",
      },
      {
        label: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
        description: "Manage blog articles",
        permissionKey: "blogs.view",
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        icon: HelpCircle,
        description: "Manage frequently asked questions",
        permissionKey: "faqs.view",
      },
      {
        label: "Media Library",
        href: "/admin/media",
        icon: ImageIcon,
        description: "Manage uploaded images and files",
        permissionKey: "media.view",
      },
    ],
  },
  {
    label: "Website",
    items: [
      {
        label: "Content Bank",
        href: "/admin/content",
        icon: BookOpen,
        description: "Manage reusable website content",
        permissionKey: "content.view",
      },
      {
        label: "SEO Settings",
        href: "/admin/seo",
        icon: Search,
        description: "Manage page SEO metadata",
        permissionKey: "seo.view",
      },
      {
        label: "Site Settings",
        href: "/admin/settings",
        icon: Globe,
        description: "General and security settings",
        permissionKey: "settings.view",
      },
    ],
  },
  {
    label: "AI",
    items: [
      {
        label: "Knowledge Base",
        href: "/admin/ai-knowledge",
        icon: Sparkles,
        description: "Manage AI assistant content",
        permissionKey: "ai.view",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Audit Logs",
        href: "/admin/audit-logs",
        icon: BarChart3,
        description: "View all admin activity logs",
        permissionKey: "auditLogs.view",
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        description: "System configuration",
        permissionKey: "settings.manage",
      },
    ],
  },
];

export const adminQuickActions = [
  { label: "Review New Enquiries", href: "/admin/enquiries" },
  { label: "Add University", href: "/admin/universities" },
  { label: "Add Course", href: "/admin/courses" },
  { label: "Add Success Story", href: "/admin/success-stories" },
  { label: "Create Blog", href: "/admin/blogs" },
  { label: "Update Site Info", href: "/admin/content" },
] as const;

export const adminPermissionKeys = [
  "dashboard.view",
  "enquiries.view",
  "enquiries.manage",
  "counselling.view",
  "counselling.manage",
  "universities.view",
  "universities.manage",
  "courses.view",
  "courses.manage",
  "successStories.view",
  "successStories.manage",
  "blogs.view",
  "blogs.manage",
  "faqs.view",
  "faqs.manage",
  "media.view",
  "media.manage",
  "content.view",
  "content.manage",
  "seo.view",
  "seo.manage",
  "ai.view",
  "ai.manage",
  "staff.view",
  "staff.manage",
  "auditLogs.view",
  "settings.view",
  "settings.manage",
] as const;

export type AdminPermissionKey = (typeof adminPermissionKeys)[number];

// Role used for display icon in nav
export { Shield };
