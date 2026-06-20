import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for is not available in the current site map.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        Go home
      </Link>
    </main>
  );
}
