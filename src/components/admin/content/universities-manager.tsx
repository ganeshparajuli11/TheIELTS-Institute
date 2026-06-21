"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createUniversity, deleteUniversity, updateUniversity } from "@/app/actions/content";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminConfirmDialog } from "@/components/admin/admin-confirm-dialog";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ContentUniversity } from "@/types/content";

const uniSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  intake: z.string().min(1, "Intake is required"),
  shortDescription: z.string().min(10, "Description is required"),
  popularCoursesRaw: z.string().min(1, "Enter at least one course"),
  image: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof uniSchema>;

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function UniversityForm({
  university,
  onSuccess,
}: {
  university?: ContentUniversity;
  onSuccess: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(uniSchema),
    defaultValues: university
      ? {
          name: university.name,
          slug: university.slug,
          city: university.city,
          region: university.region,
          intake: university.intake,
          shortDescription: university.shortDescription,
          popularCoursesRaw: university.popularCourses.join(", "),
          image: university.image,
          featured: university.featured,
          published: university.published,
        }
      : {
          name: "",
          slug: "",
          city: "",
          region: "",
          intake: "",
          shortDescription: "",
          popularCoursesRaw: "",
          image: "/images/placeholders/university-1.png",
          featured: false,
          published: true,
        },
  });

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      slug: values.slug || toSlug(values.name),
      city: values.city,
      region: values.region,
      intake: values.intake,
      shortDescription: values.shortDescription,
      popularCourses: values.popularCoursesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: values.image,
      featured: values.featured,
      published: values.published,
    };

    startTransition(async () => {
      if (university) {
        await updateUniversity(university.id, payload);
        toast.success("University updated");
      } else {
        await createUniversity(payload);
        toast.success("University added");
      }
      onSuccess();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="University of Manchester"
                    onChange={(e) => {
                      field.onChange(e);
                      if (!university) {
                        form.setValue("slug", toSlug(e.target.value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="university-of-manchester" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Manchester" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="England" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intake"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intake</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="September and January" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image path</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="/images/placeholders/university-1.png" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="popularCoursesRaw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popular courses (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Business Management, Data Analytics, Public Health"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="border-border h-4 w-4 rounded"
                  />
                </FormControl>
                <FormLabel className="!mt-0">Featured</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="border-border h-4 w-4 rounded"
                  />
                </FormControl>
                <FormLabel className="!mt-0">Published</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving…" : university ? "Save changes" : "Add university"}
        </Button>
      </form>
    </Form>
  );
}

export function UniversitiesManager({ initialData }: { initialData: ContentUniversity[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentUniversity | null>(null);
  const [deleteItem, setDeleteItem] = useState<ContentUniversity | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filtered = initialData.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.region.toLowerCase().includes(q)
    );
  });

  function handleSaved() {
    router.refresh();
    setAddOpen(false);
    setEditItem(null);
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await deleteUniversity(deleteItem.id);
    router.refresh();
    setDeleteLoading(false);
    setDeleteItem(null);
    toast.success("University deleted");
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Universities"
        description="Manage UK university listings shown on the public website."
        icon={Building2}
        actions={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add University
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search universities…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No universities found"
          description="Add a university to get started."
          icon={Building2}
        />
      ) : (
        <div className="border-border bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">University</TableHead>
                <TableHead className="hidden sm:table-cell">City</TableHead>
                <TableHead className="hidden md:table-cell">Region</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="hidden md:table-cell">Featured</TableHead>
                <TableHead className="hidden lg:table-cell">Updated</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((uni) => (
                <TableRow key={uni.id}>
                  <TableCell className="pl-5">
                    <p className="text-sm font-medium">{uni.name}</p>
                    <p className="text-muted-foreground text-xs sm:hidden">
                      {uni.city}, {uni.region}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground text-sm">{uni.city}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground text-sm">{uni.region}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge status={uni.published ? "PUBLISHED" : "DRAFT"} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {uni.featured && (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground text-xs">
                      {new Date(uni.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        { label: "Edit", onClick: () => setEditItem(uni) },
                        { separator: true },
                        {
                          label: "Delete",
                          destructive: true,
                          onClick: () => setDeleteItem(uni),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-border border-t px-5 py-3">
            <p className="text-muted-foreground text-xs">
              {filtered.length} of {initialData.length} universities
            </p>
          </div>
        </div>
      )}

      {/* Add dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add university</DialogTitle>
          </DialogHeader>
          <UniversityForm onSuccess={handleSaved} />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit university</DialogTitle>
          </DialogHeader>
          {editItem && <UniversityForm university={editItem} onSuccess={handleSaved} />}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AdminConfirmDialog
        open={!!deleteItem}
        onOpenChange={(o) => !o && setDeleteItem(null)}
        title="Delete university"
        description={`Remove "${deleteItem?.name}" from the website? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
