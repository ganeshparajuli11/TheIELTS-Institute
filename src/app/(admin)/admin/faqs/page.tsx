"use client";

import { useState } from "react";
import { HelpCircle, Plus } from "lucide-react";
import { AdminActionMenu } from "@/components/admin/admin-action-menu";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAQ_PAGE_KEYS, mockFaqs } from "@/data/admin/faqs";
import type { FaqPageKey } from "@/data/admin/faqs";

// TODO: Replace mock admin data with secure API call after backend is implemented.
const faqs = mockFaqs;

export default function AdminFaqsPage() {
  const [pageFilter, setPageFilter] = useState<"all" | FaqPageKey>("all");
  const [publishedFilter, setPublishedFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = faqs.filter((f) => {
    if (pageFilter !== "all" && f.pageKey !== pageFilter) return false;
    if (publishedFilter === "published" && !f.published) return false;
    if (publishedFilter === "draft" && f.published) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions shown across website pages."
        icon={HelpCircle}
        actions={
          <Button size="sm" disabled>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {/* TODO: Connect FAQ creation dialog after backend. */}
            Add FAQ
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          value={pageFilter}
          onValueChange={(v) => setPageFilter(v as "all" | FaqPageKey)}
        >
          <SelectTrigger className="h-9 w-44 text-sm" aria-label="Filter by page">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All pages</SelectItem>
            {FAQ_PAGE_KEYS.map((key) => (
              <SelectItem key={key} value={key} className="capitalize">
                {key.replace(/-/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={publishedFilter} onValueChange={(v) => setPublishedFilter(v as typeof publishedFilter)}>
          <SelectTrigger className="h-9 w-36 text-sm" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No FAQs found"
          description="Add FAQs for each page to help visitors find answers."
          icon={HelpCircle}
        />
      ) : (
        <div className="grid gap-3">
          {filtered.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                      {faq.pageKey.replace(/-/g, " ")}
                    </span>
                    <span className="text-xs text-muted-foreground">{faq.category}</span>
                    {!faq.published && (
                      <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium">{faq.question}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{faq.answer}</p>
                </div>
                <AdminActionMenu
                  actions={[
                    {
                      label: "Edit",
                      // TODO: Connect FAQ edit dialog after backend.
                      disabled: true,
                    },
                    {
                      label: faq.published ? "Unpublish" : "Publish",
                      disabled: true,
                    },
                    { separator: true },
                    { label: "Delete", destructive: true, disabled: true },
                  ]}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
