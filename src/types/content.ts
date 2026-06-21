export type ContentUniversity = {
  id: string;
  name: string;
  slug: string;
  city: string;
  region: string;
  popularCourses: string[];
  intake: string;
  shortDescription: string;
  image: string;
  featured: boolean;
  published: boolean;
  updatedAt: string;
};

export type ContentSuccessStory = {
  id: string;
  studentName: string;
  university: string;
  course: string;
  intake: string;
  image: string;
  quote: string;
  status: "published" | "draft";
  featured: boolean;
  updatedAt: string;
};

export type FaqPageKey = "home" | "studyInUk" | "services" | "counselling" | "contact";

export type ContentFaq = {
  id: string;
  question: string;
  answer: string;
  pageKey: FaqPageKey;
  published: boolean;
  sortOrder: number;
};

export type ContentBlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  status: "published" | "draft";
  updatedAt: string;
};

export type ContentSiteConfig = {
  name: string;
  url: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  officeHours: string;
  mainCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  socialLinks: { facebook: string; instagram: string; linkedin: string };
  seo: { title: string; description: string; keywords: string[] };
  legalNote: string;
};
