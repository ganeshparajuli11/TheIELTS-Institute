"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createFaq, deleteFaq, updateFaq } from "@/app/actions/content";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminConfirmDialog } from "@/components/admin/admin-confirm-dialog";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import type { ContentFaq, FaqPageKey } from "@/types/content";

const PAGE_KEY_LABELS: Record<FaqPageKey, string> = {
  home: "Home",
  studyInUk: "Study in UK",
  services: "Services",
  counselling: "Counselling",
  contact: "Contact",
};

const FAQ_PAGE_KEYS: FaqPageKey[] = ["home", "studyInUk", "services", "counselling", "contact"];

const faqSchema = z.object({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(10, "Answer is required"),
  pageKey: z.enum(["home", "studyInUk", "services", "counselling", "contact"]),
  published: z.boolean(),
  sortOrder: z.number().int().min(1),
});

type FormValues = z.infer<typeof faqSchema>;

function FaqForm({ faq, onSuccess }: { faq?: ContentFaq; onSuccess: () => void }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: faq
      ? {
          question: faq.question,
          answer: faq.answer,
          pageKey: faq.pageKey,
          published: faq.published,
          sortOrder: faq.sortOrder,
        }
      : {
          question: "",
          answer: "",
          pageKey: "home",
          published: true,
          sortOrder: 99,
        },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      if (faq) {
        await updateFaq(faq.id, values);
        toast.success("FAQ updated");
      } else {
        await createFaq(values);
        toast.success("FAQ added");
      }
      onSuccess();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the FAQ question" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} placeholder="Enter the FAQ answer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="pageKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FAQ_PAGE_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {PAGE_KEY_LABELS[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2 pb-2">
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
          {pending ? "Saving…" : faq ? "Save changes" : "Add FAQ"}
        </Button>
      </form>
    </Form>
  );
}

export function FaqsManager({ initialData }: { initialData: ContentFaq[] }) {
  const router = useRouter();
  const [pageFilter, setPageFilter] = useState<string>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentFaq | null>(null);
  const [deleteItem, setDeleteItem] = useState<ContentFaq | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filtered = initialData.filter((f) =>
    pageFilter === "all" ? true : f.pageKey === pageFilter,
  );

  function handleSaved() {
    router.refresh();
    setAddOpen(false);
    setEditItem(null);
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleteLoading(true);
    await deleteFaq(deleteItem.id);
    router.refresh();
    setDeleteLoading(false);
    setDeleteItem(null);
    toast.success("FAQ deleted");
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions shown across the public website."
        icon={HelpCircle}
        actions={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add FAQ
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <Select value={pageFilter} onValueChange={(v) => setPageFilter(v ?? "all")}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All pages</SelectItem>
            {FAQ_PAGE_KEYS.map((key) => (
              <SelectItem key={key} value={key}>
                {PAGE_KEY_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No FAQs found"
          description="Add a FAQ to get started."
          icon={HelpCircle}
        />
      ) : (
        <div className="grid gap-3">
          {filtered
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardContent className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="border-border bg-muted text-muted-foreground rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                        {PAGE_KEY_LABELS[faq.pageKey]}
                      </span>
                      {!faq.published && (
                        <span className="rounded border border-yellow-200 bg-yellow-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-yellow-700 uppercase">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium">{faq.question}</p>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{faq.answer}</p>
                  </div>
                  <AdminActionMenu
                    actions={[
                      { label: "Edit", onClick: () => setEditItem(faq) },
                      { separator: true },
                      {
                        label: "Delete",
                        destructive: true,
                        onClick: () => setDeleteItem(faq),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add FAQ</DialogTitle>
          </DialogHeader>
          <FaqForm onSuccess={handleSaved} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
          </DialogHeader>
          {editItem && <FaqForm faq={editItem} onSuccess={handleSaved} />}
        </DialogContent>
      </Dialog>

      <AdminConfirmDialog
        open={!!deleteItem}
        onOpenChange={(o) => !o && setDeleteItem(null)}
        title="Delete FAQ"
        description="Remove this FAQ from the website? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </div>
  );
}
