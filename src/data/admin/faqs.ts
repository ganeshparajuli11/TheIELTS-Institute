// TODO: Replace mock admin data with secure API call after backend is implemented.
export const mockFaqs = [
  {
    id: "faq_001",
    question: "What are the general entry requirements for UK universities?",
    answer:
      "Entry requirements vary by university and course. Most undergraduate programmes require A-levels or equivalent qualifications. Postgraduate courses typically require a relevant bachelor's degree. English language proficiency (IELTS or equivalent) is also required.",
    pageKey: "study-in-uk",
    category: "Entry Requirements",
    sortOrder: 1,
    published: true,
  },
  {
    id: "faq_002",
    question: "What IELTS score do I need for UK university admission?",
    answer:
      "Most UK universities require a minimum IELTS Academic score of 6.0–6.5 overall for undergraduate programmes, and 6.5–7.0 for postgraduate programmes. Requirements vary by institution and course.",
    pageKey: "study-in-uk",
    category: "English Requirements",
    sortOrder: 2,
    published: true,
  },
  {
    id: "faq_003",
    question: "How long does a UK student visa take to process?",
    answer:
      "The UK Student Visa (formerly Tier 4) typically takes up to 3 weeks to process from outside the UK. We recommend applying at least 3 months before your course start date. Processing times can vary.",
    pageKey: "counselling",
    category: "Visa Guidance",
    sortOrder: 1,
    published: true,
  },
  {
    id: "faq_004",
    question: "Is counselling at The IELTS Institute free?",
    answer:
      "Yes, we offer a free initial counselling session to help you understand your options for studying in the UK. Book your free counselling through our website.",
    pageKey: "contact",
    category: "Our Services",
    sortOrder: 1,
    published: true,
  },
  {
    id: "faq_005",
    question: "Can The IELTS Institute guarantee my visa approval?",
    answer:
      "No. Visa decisions are made solely by the UK Home Office. We provide guidance and support to help you prepare a strong application, but cannot guarantee any particular outcome.",
    pageKey: "contact",
    category: "Visa Guidance",
    sortOrder: 2,
    published: true,
  },
];

export const FAQ_PAGE_KEYS = ["home", "study-in-uk", "universities", "services", "counselling", "contact"] as const;
export type FaqPageKey = typeof FAQ_PAGE_KEYS[number];
