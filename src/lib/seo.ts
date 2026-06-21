import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title = siteConfig.seo.title,
  description = siteConfig.seo.description,
  path = "/",
  keywords = [],
}: MetadataInput = {}): Metadata {
  const pageTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const url = new URL(path, siteConfig.url);
  const allKeywords = [...siteConfig.seo.keywords, ...keywords];

  return {
    title: pageTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/images/og-image.png"],
    },
  };
}
