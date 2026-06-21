import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Staff Login | The IELTS Institute",
  description: "Staff login for The IELTS Institute admin area.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="mb-8 text-center">
          <div className="bg-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
            <span className="text-primary-foreground text-lg font-bold">TI</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Staff sign in</h1>
          <p className="text-muted-foreground mt-2 text-sm">The IELTS Institute admin area</p>
        </div>

        <LoginForm />

        {/* Security notice */}
        <div className="border-border bg-muted/40 mt-6 flex items-start gap-2 rounded-lg border px-4 py-3">
          <Shield className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="text-muted-foreground text-xs">
            This is a restricted area. Unauthorised access attempts are logged. Authentication will
            be enforced server-side in Phase 2.
          </p>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          <Link href="/" className="hover:text-foreground hover:underline">
            ← Return to public site
          </Link>
        </p>
      </div>
    </main>
  );
}
