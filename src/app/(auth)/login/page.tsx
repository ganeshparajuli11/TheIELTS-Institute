import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Staff Login | The IELTS Institute",
  description: "Staff login screen for The IELTS Institute admin area.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-16">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-primary">Admin access</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Staff sign in
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Authentication and protected route logic will be connected in a
            later backend phase.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
