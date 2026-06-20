export type ServiceIcon =
  | "GraduationCap"
  | "School"
  | "FileCheck"
  | "PenLine"
  | "BadgeCheck"
  | "BookOpenCheck"
  | "Plane"
  | "Newspaper";

export type Service = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: ServiceIcon;
  ctaLabel: string;
  seoKeywords: string[];
};

export const services: Service[] = [
  {
    title: "UK study counselling",
    slug: "uk-study-counselling",
    shortDescription:
      "Personal counselling to understand your goals, budget, academic background, and UK study pathway.",
    fullDescription:
      "We help students in Nepal map a realistic UK study plan, compare study levels, understand intake timing, and prepare a step-by-step roadmap before applications begin.",
    icon: "GraduationCap",
    ctaLabel: "Book counselling",
    seoKeywords: ["UK study counselling Nepal", "Study in UK from Nepal"],
  },
  {
    title: "UK university selection",
    slug: "uk-university-selection",
    shortDescription:
      "Shortlist UK universities and courses based on academic fit, location, intake, and career direction.",
    fullDescription:
      "Our team helps compare UK university options using course suitability, entry requirements, progression goals, and student preferences without pushing unrelated destinations.",
    icon: "School",
    ctaLabel: "Explore universities",
    seoKeywords: [
      "UK university application from Nepal",
      "UK universities Nepal",
    ],
  },
  {
    title: "Application support",
    slug: "application-support",
    shortDescription:
      "Organized support for application forms, offer requirements, and follow-up documentation.",
    fullDescription:
      "We help students keep UK applications structured, complete, and aligned with each university's requirements. Future CMS data can replace these static service records.",
    icon: "FileCheck",
    ctaLabel: "Start application plan",
    seoKeywords: ["UK university application from Nepal"],
  },
  {
    title: "SOP and documentation guidance",
    slug: "sop-documentation-guidance",
    shortDescription:
      "Guidance for SOP planning, academic documents, financial documents, and supporting materials.",
    fullDescription:
      "We provide document preparation support and writing guidance so students can present their academic story clearly and professionally.",
    icon: "PenLine",
    ctaLabel: "Prepare documents",
    seoKeywords: ["SOP guidance Nepal", "UK study documents Nepal"],
  },
  {
    title: "Student visa application guidance",
    slug: "student-visa-guidance",
    shortDescription:
      "Careful visa document preparation support with clear compliance guidance and responsible wording.",
    fullDescription:
      "We explain UK student visa documentation requirements, help students organize evidence, and provide interview preparation guidance where relevant. Visa outcomes are decided only by UK authorities.",
    icon: "BadgeCheck",
    ctaLabel: "Review visa steps",
    seoKeywords: ["UK student visa guidance Nepal"],
  },
  {
    title: "IELTS preparation guidance",
    slug: "ielts-preparation-guidance",
    shortDescription:
      "Guidance for IELTS readiness, study planning, mock practice, and score improvement habits.",
    fullDescription:
      "Students receive practical direction on IELTS preparation planning, skill gaps, and academic English readiness for UK study.",
    icon: "BookOpenCheck",
    ctaLabel: "Plan IELTS prep",
    seoKeywords: ["IELTS preparation Nepal"],
  },
  {
    title: "Pre-departure guidance",
    slug: "pre-departure-guidance",
    shortDescription:
      "Support for travel readiness, student life preparation, packing, accommodation, and arrival planning.",
    fullDescription:
      "We help students prepare for the practical transition from Nepal to the UK with pre-departure checklists and student life orientation.",
    icon: "Plane",
    ctaLabel: "Prepare departure",
    seoKeywords: ["UK pre-departure Nepal"],
  },
  {
    title: "Success story publishing",
    slug: "success-story-publishing",
    shortDescription:
      "A future-ready structure for publishing verified student outcomes and UK study journeys.",
    fullDescription:
      "Success story content is kept safe and professional. Later, admin/CMS workflows can replace these records with verified student-approved stories.",
    icon: "Newspaper",
    ctaLabel: "View stories",
    seoKeywords: ["UK student success stories Nepal"],
  },
];
