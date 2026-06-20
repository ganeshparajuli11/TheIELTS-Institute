"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const counsellingSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  phone: z.string().min(7, "Enter a valid phone number."),
  email: z.email("Enter a valid email address."),
  location: z.string().min(2, "Enter your current location."),
  preferredCourse: z.string().min(2, "Enter your preferred course."),
  highestQualification: z.string().min(1, "Select your qualification."),
  preferredIntake: z.string().min(1, "Select your preferred intake."),
  englishStatus: z.string().min(1, "Select your IELTS/PTE status."),
  preferredUniversity: z.string().optional(),
  message: z.string().min(10, "Tell us a little about your UK study plans."),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required before submitting.",
  }),
});

type CounsellingValues = z.infer<typeof counsellingSchema>;

export function CounsellingForm() {
  const form = useForm<CounsellingValues>({
    resolver: zodResolver(counsellingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      preferredCourse: "",
      highestQualification: "",
      preferredIntake: "",
      englishStatus: "",
      preferredUniversity: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit() {
    // TODO: connect API endpoint for counselling booking.
    toast.success("Thanks. Your counselling request has been prepared.");
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="premium-card grid gap-5 p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            name="name"
            label="Full name"
            placeholder="Your full name"
          />
          <TextField name="phone" label="Phone number" placeholder="+977" />
          <TextField name="email" label="Email" placeholder="you@example.com" />
          <TextField
            name="location"
            label="Current location"
            placeholder="Kathmandu, Nepal"
          />
          <TextField
            name="preferredCourse"
            label="Preferred course"
            placeholder="Business, IT, Public Health..."
          />
          <TextField
            name="preferredUniversity"
            label="Preferred UK university if any"
            placeholder="Optional"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <SelectField
            name="highestQualification"
            label="Highest qualification"
            placeholder="Select qualification"
            options={["+2", "Bachelor", "Master", "Other"]}
          />
          <SelectField
            name="preferredIntake"
            label="Preferred intake"
            placeholder="Select intake"
            options={["September", "January", "May", "Not sure yet"]}
          />
          <SelectField
            name="englishStatus"
            label="IELTS/PTE status"
            placeholder="Select status"
            options={[
              "Not started",
              "Preparing",
              "Test booked",
              "Score received",
            ]}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your UK study plans"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                />
              </FormControl>
              <div>
                <FormLabel>
                  I consent to being contacted about UK study counselling.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit counselling request</Button>
      </form>
    </Form>
  );

  function TextField({
    name,
    label,
    placeholder,
  }: {
    name: keyof CounsellingValues;
    label: string;
    placeholder: string;
  }) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                value={String(field.value ?? "")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function SelectField({
    name,
    label,
    placeholder,
    options,
  }: {
    name: keyof CounsellingValues;
    label: string;
    placeholder: string;
    options: string[];
  }) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              value={String(field.value ?? "")}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
}
