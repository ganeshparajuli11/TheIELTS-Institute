export type University = {
  name: string;
  slug: string;
  city: string;
  region: string;
  popularCourses: string[];
  intake: string;
  shortDescription: string;
  image: string;
  featured: boolean;
};

export const universities: University[] = [
  {
    name: "London Metropolitan Pathway",
    slug: "london-metropolitan-pathway",
    city: "London",
    region: "England",
    popularCourses: ["Business Management", "Data Analytics", "Public Health"],
    intake: "September and January",
    shortDescription:
      "A UK university profile for students seeking a city-based academic experience.",
    image: "/images/placeholders/university-1.png",
    featured: true,
  },
  {
    name: "Northern Applied Sciences University",
    slug: "northern-applied-sciences-university",
    city: "Manchester",
    region: "England",
    popularCourses: ["Computer Science", "Engineering", "Project Management"],
    intake: "September",
    shortDescription:
      "A career-focused option for practical degrees and applied learning routes.",
    image: "/images/placeholders/university-2.png",
    featured: true,
  },
  {
    name: "Midlands Business School",
    slug: "midlands-business-school",
    city: "Birmingham",
    region: "England",
    popularCourses: ["MBA", "Accounting", "International Business"],
    intake: "January and May",
    shortDescription:
      "A business-focused UK institution profile for future managed listings.",
    image: "/images/placeholders/university-3.png",
    featured: false,
  },
  {
    name: "Scottish Digital Institute",
    slug: "scottish-digital-institute",
    city: "Edinburgh",
    region: "Scotland",
    popularCourses: ["Cybersecurity", "AI", "Digital Marketing"],
    intake: "September",
    shortDescription:
      "A UK university profile inspired by the academic character of Scotland.",
    image: "/images/placeholders/university-4.png",
    featured: false,
  },
];
