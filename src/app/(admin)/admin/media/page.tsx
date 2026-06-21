import { ImageIcon } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";

export default function AdminMediaPage() {
  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Media Library"
        description="Manage uploaded images and media files."
        icon={ImageIcon}
        actions={
          <Button size="sm" disabled>
            {/* TODO: Connect file upload after cloud storage backend is implemented. */}
            Upload Image
          </Button>
        }
      />

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm text-amber-800">
          <strong>Not yet implemented.</strong> Media upload requires a cloud storage backend (e.g.,
          Cloudflare R2, AWS S3, or Vercel Blob). This page will show uploaded files and allow
          editing alt text, captions, and copying URLs.
        </p>
      </div>

      <AdminEmptyState
        title="No media files yet"
        description="Connect a cloud storage backend to enable image uploads."
        icon={ImageIcon}
      />
    </div>
  );
}
