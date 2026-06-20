export type ProcessStep = {
  title: string;
  description: string;
  icon:
    | "MessagesSquare"
    | "BookOpenCheck"
    | "FileCheck"
    | "BadgeCheck"
    | "Plane";
  cta?: {
    label: string;
    href: string;
  };
};

export const processSteps: ProcessStep[] = [
  {
    title: "Counselling",
    description:
      "Clarify goals, budget, academic background, preferred courses, and UK intake options.",
    icon: "MessagesSquare",
    cta: { label: "Book counselling", href: "/counselling" },
  },
  {
    title: "IELTS readiness",
    description:
      "Plan English test preparation and understand score expectations for UK courses.",
    icon: "BookOpenCheck",
  },
  {
    title: "Application preparation",
    description:
      "Prepare university applications, SOP direction, and required academic documents.",
    icon: "FileCheck",
  },
  {
    title: "Visa guidance",
    description:
      "Organize student visa documentation support with clear compliance expectations.",
    icon: "BadgeCheck",
  },
  {
    title: "Pre-departure",
    description:
      "Prepare for accommodation, travel, arrival, and student life in the UK.",
    icon: "Plane",
  },
];
