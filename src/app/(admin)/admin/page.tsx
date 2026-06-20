import { DashboardStatCard } from "@/components/cards/dashboard-stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  { label: "New enquiries", value: "24", hint: "Design preview" },
  { label: "Counselling bookings", value: "12", hint: "TODO: connect API" },
  { label: "Draft blogs", value: "5", hint: "TODO: connect database" },
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          TODO: connect auth, RBAC, database, and API.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {["IELTS preparation", "UK foundation year", "Visa guidance"].map(
                (interest, index) => (
                  <TableRow key={interest}>
                    <TableCell>Student {index + 1}</TableCell>
                    <TableCell>{interest}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Placeholder</Badge>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
