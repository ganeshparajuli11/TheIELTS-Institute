"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { updateSiteConfig } from "@/app/actions/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import type { ContentSiteConfig } from "@/types/content";

const schema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(5),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(5),
  location: z.string().min(2),
  officeHours: z.string().min(5),
  legalNote: z.string().min(20),
  url: z.string().url(),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(20),
  mainCtaLabel: z.string().min(2),
  mainCtaHref: z.string().min(1),
  secondaryCtaLabel: z.string().min(2),
  secondaryCtaHref: z.string().min(1),
  facebook: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  seoTitle: z.string().min(5),
  seoDescription: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function SiteConfigForm({ config }: { config: ContentSiteConfig }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: config.name,
      tagline: config.tagline,
      phone: config.phone,
      email: config.email,
      address: config.address,
      location: config.location,
      officeHours: config.officeHours,
      legalNote: config.legalNote,
      url: config.url,
      shortDescription: config.shortDescription,
      fullDescription: config.fullDescription,
      mainCtaLabel: config.mainCta.label,
      mainCtaHref: config.mainCta.href,
      secondaryCtaLabel: config.secondaryCta.label,
      secondaryCtaHref: config.secondaryCta.href,
      facebook: config.socialLinks.facebook,
      instagram: config.socialLinks.instagram,
      linkedin: config.socialLinks.linkedin,
      seoTitle: config.seo.title,
      seoDescription: config.seo.description,
    },
  });

  function onSubmit(values: FormValues) {
    const updated: ContentSiteConfig = {
      name: values.name,
      tagline: values.tagline,
      url: values.url,
      shortDescription: values.shortDescription,
      fullDescription: values.fullDescription,
      location: values.location,
      phone: values.phone,
      email: values.email,
      address: values.address,
      officeHours: values.officeHours,
      mainCta: { label: values.mainCtaLabel, href: values.mainCtaHref },
      secondaryCta: { label: values.secondaryCtaLabel, href: values.secondaryCtaHref },
      socialLinks: {
        facebook: values.facebook,
        instagram: values.instagram,
        linkedin: values.linkedin,
      },
      seo: {
        title: values.seoTitle,
        description: values.seoDescription,
        keywords: config.seo.keywords,
      },
      legalNote: values.legalNote,
    };

    startTransition(async () => {
      await updateSiteConfig(updated);
      router.refresh();
      toast.success("Site settings saved — frontend will reflect changes on next page load.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Identity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Business identity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Contact details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="officeHours"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Office hours</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* CTAs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Call-to-action buttons</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="mainCtaLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary CTA label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainCtaHref"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary CTA link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="/counselling" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryCtaLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary CTA label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryCtaHref"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary CTA link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="/study-in-uk" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Social */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Social links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {(["facebook", "instagram", "linkedin"] as const).map((platform) => (
              <FormField
                key={platform}
                control={form.control}
                name={platform}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{platform}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`https://${platform}.com/…`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">SEO</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Legal / compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="legalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal note</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-muted-foreground text-[11px]">
                    Must not promise visa outcomes. Shown in footer and disclaimer areas.
                  </p>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Separator />

        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save site settings"}
        </Button>
      </form>
    </Form>
  );
}
