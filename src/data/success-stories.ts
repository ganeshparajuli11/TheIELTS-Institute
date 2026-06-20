export type SuccessStory = {
  studentName: string;
  university: string;
  course: string;
  intake: string;
  image: string;
  quote: string;
  status: "published" | "draft";
  featured?: boolean;
};

export const successStories: SuccessStory[] = [
  {
    studentName: "Aarav Shrestha",
    university: "London Metropolitan Pathway",
    course: "MSc Data Analytics",
    intake: "September intake",
    image: "/images/placeholders/student-1.png",
    quote:
      "The counselling process helped me understand my UK study options clearly and prepare my documents with confidence.",
    status: "published",
    featured: true,
  },
  {
    studentName: "Sahana Karki",
    university: "Northern Applied Sciences University",
    course: "BSc Computer Science",
    intake: "January intake",
    image: "/images/placeholders/student-2.png",
    quote:
      "I liked having a structured roadmap for IELTS preparation, applications, and pre-departure planning.",
    status: "published",
  },
  {
    studentName: "Niraj Gurung",
    university: "Midlands Business School",
    course: "MBA",
    intake: "May intake",
    image: "/images/placeholders/student-3.png",
    quote:
      "The team kept the process organized and helped me focus on the right UK course shortlist.",
    status: "published",
  },
];
