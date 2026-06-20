export type NavItem = {
  title: string;
  href: string;
  match?: string[];
};

export const ctaRoute = "/counselling";

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/", match: ["/"] },
  { title: "Study in UK", href: "/study-in-uk", match: ["/study-in-uk"] },
  { title: "Universities", href: "/universities", match: ["/universities"] },
  { title: "Services", href: "/services", match: ["/services"] },
  {
    title: "Success Stories",
    href: "/success-stories",
    match: ["/success-stories"],
  },
  { title: "Blog", href: "/blog", match: ["/blog"] },
  { title: "Contact", href: "/contact", match: ["/contact"] },
];

export const footerNavigation = {
  services: [
    { title: "UK study counselling", href: "/services" },
    { title: "University selection", href: "/universities" },
    { title: "Application support", href: "/services" },
    { title: "Visa guidance", href: "/study-in-uk" },
  ],
  quickLinks: [
    { title: "Study in UK", href: "/study-in-uk" },
    { title: "Success Stories", href: "/success-stories" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Compliance note", href: "#" },
  ],
};

export const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin" },
  { title: "Enquiries", href: "/admin/enquiries" },
  { title: "Counselling", href: "/admin/counselling" },
  { title: "Success stories", href: "/admin/success-stories" },
  { title: "Universities", href: "/admin/universities" },
  { title: "Blogs", href: "/admin/blogs" },
  { title: "Settings", href: "/admin/settings" },
];

export const activeRouteGroups = {
  public: mainNavItems,
  admin: adminNavItems,
};
