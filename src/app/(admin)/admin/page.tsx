import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockDashboardStats } from "@/data/admin/dashboard";
import { mockEnquiries } from "@/data/admin/enquiries";
import { adminQuickActions } from "@/config/admin-navigation";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const recentEnquiries = mockEnquiries.slice(0, 6);

export default function AdminDashboardPage() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Operational overview for The IELTS Institute admin team."
      />

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Total Enquiries"
          value={stats.totalEnquiries}
          icon={MessageSquare}
        />
        <AdminStatCard
          label="New Enquiries"
          value={stats.newEnquiries}
          icon={MessageSquare}
          description="Awaiting first contact"
        />
        <AdminStatCard
          label="Counselling Requests"
          value={stats.counsellingRequests}
          icon={ClipboardList}
        />
        <AdminStatCard
          label="In Progress"
          value={stats.inProgressStudents}
          icon={Users}
          description="Active student applications"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Universities"
          value={stats.publishedUniversities}
          icon={Building2}
          description="Published"
        />
        <AdminStatCard
          label="Courses"
          value={stats.publishedCourses}
          icon={GraduationCap}
          description="Published"
        />
        <AdminStatCard
          label="Success Stories"
          value={stats.publishedSuccessStories}
          icon={Star}
          description="Published"
        />
        <AdminStatCard
          label="Draft Content"
          value={stats.draftContent}
          icon={BookOpen}
          description="Awaiting review"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent enquiries */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Recent Enquiries</CardTitle>
            <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
              <Link href="/admin/enquiries">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Student</TableHead>
                  <TableHead className="hidden sm:table-cell">Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="pl-6">
                      <div>
                        <p className="text-sm font-medium">{enquiry.fullName}</p>
                        <p className="text-xs text-muted-foreground">{enquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm capitalize text-muted-foreground">
                        {enquiry.enquiryType?.replace(/-/g, " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AdminStatusBadge status={enquiry.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {adminQuickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                asChild
                className="h-9 justify-start text-sm font-normal"
              >
                <Link href={action.href}>
                  <ArrowRight className="mr-2 h-3.5 w-3.5 text-primary" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
