import { Toaster } from "@/components/ui/sonner";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted/30 min-h-screen">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
