import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
        <p className="text-muted-foreground mt-2 text-xs">{hint}</p>
      </CardContent>
    </Card>
  );
}
