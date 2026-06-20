export type FaqItem = {
  question: string;
  answer: string;
};

export const faqGroups = {
  home: [
    {
      question: "Does The IELTS Institute only support UK study?",
      answer:
        "Yes. This website and counselling flow are focused on students in Nepal planning to study in the United Kingdom.",
    },
    {
      question: "Is counselling connected to a backend yet?",
      answer:
        "Counselling enquiries are structured to capture the details a counsellor needs before discussing a UK study roadmap.",
    },
  ],
  studyInUk: [
    {
      question: "Can I study in the UK from Nepal after +2?",
      answer:
        "Many students explore foundation, undergraduate, or pathway options after +2 depending on academic background and course requirements.",
    },
    {
      question: "Can UK student visa approval be promised?",
      answer:
        "No. We provide visa guidance and document preparation support, but visa decisions are made only by the relevant UK authorities.",
    },
  ],
  services: [
    {
      question: "Can service details be updated later?",
      answer:
        "Yes. Service content is centralized so it can later be managed from an admin or CMS workflow.",
    },
    {
      question: "Can services be managed from admin later?",
      answer:
        "Yes. The content bank is structured so each service can later become a CMS record.",
    },
  ],
  counselling: [
    {
      question: "What happens after I submit the counselling form?",
      answer:
        "Your details are reviewed so a counsellor can discuss your UK study goals, intake options, and preparation needs.",
    },
    {
      question: "What should I prepare before counselling?",
      answer:
        "Prepare academic transcripts, passport details if available, IELTS/PTE status, preferred course, and intake preferences.",
    },
  ],
  contact: [
    {
      question: "Where is The IELTS Institute located?",
      answer:
        "The current contact address is listed as Bagbazar, Kathmandu, Nepal. Final office details can be updated centrally in site config or CMS later.",
    },
    {
      question: "Can I ask about countries other than the UK?",
      answer:
        "This website is intentionally focused on UK study applications from Nepal only.",
    },
  ],
} satisfies Record<string, FaqItem[]>;

export const faqs = faqGroups.home;
