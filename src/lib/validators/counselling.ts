import { z } from "zod";

export const counsellingSchema = z.object({
  name: z.string().min(2, "Enter your full name.").max(100),
  phone: z.string().min(7, "Enter a valid phone number.").max(30),
  email: z.string().email("Enter a valid email address.").max(255),
  location: z.string().min(2, "Enter your current location.").max(100),
  preferredCourse: z.string().min(2, "Enter your preferred course.").max(100),
  highestQualification: z.enum(["+2", "Bachelor", "Master", "Other"]),
  preferredIntake: z.enum(["September", "January", "May", "Not sure yet"]),
  englishStatus: z.enum(["Not started", "Preparing", "Test booked", "Score received"]),
  preferredUniversity: z.string().max(200).optional(),
  message: z.string().min(10, "Tell us a little about your UK study plans.").max(2000),
  consent: z.boolean().refine((v) => v === true, "Consent is required before submitting."),
});

export type CounsellingPayload = z.infer<typeof counsellingSchema>;
