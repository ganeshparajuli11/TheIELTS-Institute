import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name.").max(100),
  email: z.string().email("Enter a valid email address.").max(255),
  phone: z.string().min(7, "Enter a valid phone number.").max(30),
  enquiryType: z.enum(["counselling", "application", "ielts", "visa"]),
  message: z.string().min(10, "Enter a short message.").max(2000),
  consent: z
    .boolean()
    .refine((v) => v === true, "Consent is required before submitting."),
});

export type ContactPayload = z.infer<typeof contactSchema>;
