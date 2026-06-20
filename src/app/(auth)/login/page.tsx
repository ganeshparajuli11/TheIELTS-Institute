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
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">TI</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Staff sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The IELTS Institute admin area
          </p>
        </div>

        <LoginForm />

        {/* Security notice */}
        <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-xs text-muted-foreground">
            This is a restricted area. Unauthorised access attempts are logged.
            Authentication will be enforced server-side in Phase 2.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">
            ← Return to public site
          </Link>
        </p>
      </div>
    </main>
  );
}
