"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createSuccessStory, deleteSuccessStory, updateSuccessStory } from "@/app/actions/content";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ContentSuccessStory } from "@/types/content";

const storySchema = z.object({
  studentName: z.string().min(2, "Name is required"),
  university: z.string().min(2, "University is required"),
  course: z.string().min(2, "Course is required"),
  intake: z.string().min(1, "Intake is required"),
  quote: z.string().min(10, "Quote is required"),
  image: z.string(),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof storySchema>;

function StoryForm({ story, onSuccess }: { story?: ContentSuccessStory; onSuccess: () => void }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: story
      ? {
          studentName: story.studentName,
          university: story.university,
          course: story.course,
          intake: story.intake,
          quote: story.quote,
          image: story.image,
          status: story.status,
          featured: story.featured,
        }
      : {
          studentName: "",
          university: "",
          course: "",
          intake: "",
          quote: "",
          image: "/images/placeholders/student-1.png",
          status: "draft",
          featured: false,
        },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      if (story) {
        await updateSuccessStory(story.id, values);
        toast.success("Story updated");
      } else {
        await createSuccessStory(values);
        toast.success("Story added");
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
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Aarav Shrestha" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="University of Manchester" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MSc Data Analytics" />
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
                  <Input {...field} placeholder="September 2025" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input {...field} placeholder="/images/placeholders/student-1.png" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student quote</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder="Write the student's testimonial quote here…"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel className="!mt-0">Feature on homepage</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving…" : story ? "Save changes" : "Add story"}
        </Button>
      </form>
    </Form>
  );
}

export function SuccessStoriesManager({ initialData }: { initialData: ContentSuccessStory[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentSuccessStory | null>(null);
  const [deleteItem, setDeleteItem] = useState<ContentSuccessStory | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filtered = initialData.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.studentName.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function handleSaved() {
    router.refresh();
    setAddOpen(false);
    setEditItem(null);
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await deleteSuccessStory(deleteItem.id);
    router.refresh();
    setDeleteLoading(false);
    setDeleteItem(null);
    toast.success("Story deleted");
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Success Stories"
        description="Manage student success stories shown on the public website."
        icon={Star}
        actions={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Story
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search stories…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 max-w-xs text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No stories found"
          description="Add a student success story to get started."
          icon={Star}
        />
      ) : (
        <div className="border-border bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Student</TableHead>
                <TableHead className="hidden sm:table-cell">University</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Featured</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="pl-5">
                    <p className="text-sm font-medium">{story.studentName}</p>
                    <p className="text-muted-foreground text-xs">{story.intake}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground text-sm">{story.university}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground text-sm">{story.course}</span>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge
                      status={story.status === "published" ? "PUBLISHED" : "DRAFT"}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {story.featured && (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="pr-3">
                    <AdminActionMenu
                      actions={[
                        { label: "Edit", onClick: () => setEditItem(story) },
                        { separator: true },
                        {
                          label: "Delete",
                          destructive: true,
                          onClick: () => setDeleteItem(story),
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
              {filtered.length} of {initialData.length} stories
            </p>
          </div>
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add success story</DialogTitle>
          </DialogHeader>
          <StoryForm onSuccess={handleSaved} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit success story</DialogTitle>
          </DialogHeader>
          {editItem && <StoryForm story={editItem} onSuccess={handleSaved} />}
        </DialogContent>
      </Dialog>

      <AdminConfirmDialog
        open={!!deleteItem}
        onOpenChange={(o) => !o && setDeleteItem(null)}
        title="Delete story"
        description={`Remove "${deleteItem?.studentName}'s" story from the website? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
