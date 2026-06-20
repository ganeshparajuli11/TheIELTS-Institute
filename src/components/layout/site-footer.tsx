import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {siteConfig.shortDescription}
          </p>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {siteConfig.legalNote}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Services" items={footerNavigation.services} />
          <FooterColumn
            title="Quick links"
            items={footerNavigation.quickLinks}
          />
          <div>
            <p className="label-caps text-primary">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>{siteConfig.address}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
              <p>{siteConfig.officeHours}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="container-page flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          {footerNavigation.legal.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
          <Link href="/login" className="hover:text-primary">
            Staff login
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <div>
      <p className="label-caps text-primary">{title}</p>
      <nav className="mt-4 grid gap-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="hover:text-primary"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
