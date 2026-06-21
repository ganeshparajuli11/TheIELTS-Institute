import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Home">
      <Image src="/images/logo.png" alt="" width={40} height={40} className="rounded-md" priority />
      <span className="font-heading text-primary text-base font-bold tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}
