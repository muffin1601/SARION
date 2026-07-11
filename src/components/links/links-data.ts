import type { ComponentType, SVGProps } from "react";
import { Globe, Mail } from "lucide-react";

import { YoutubeIcon, XIcon, InstagramIcon, LinkedinIcon } from "@/components/links/brand-icons";

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const links: LinkItem[] = [
  {
    id: "youtube",
    title: "YouTube",
    description: "Watch AI Tutorials",
    url: "https://youtube.com/@sarionai",
    icon: YoutubeIcon,
  },
  {
    id: "website",
    title: "Website",
    description: "Visit SARION",
    url: "https://trysarion.com",
    icon: Globe,
  },
  {
    id: "x",
    title: "X (Twitter)",
    description: "Follow Updates",
    url: "https://x.com/sarionhq",
    icon: XIcon,
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Behind the Scenes",
    url: "https://instagram.com/trysarion",
    icon: InstagramIcon,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Professional Updates",
    url: "https://linkedin.com/company/try-sarion",
    icon: LinkedinIcon,
  },
  {
    id: "email",
    title: "Business",
    description: "Contact Us",
    url: "mailto:contact@trysarion.com",
    icon: Mail,
  },
];

export const contactEmail = "contact@trysarion.com";

export interface ComingSoonItem {
  id: string;
  title: string;
}

export const comingSoon: ComingSoonItem[] = [
  { id: "prompt-packs", title: "AI Prompt Packs" },
  { id: "templates", title: "AI Templates" },
  { id: "workflows", title: "AI Workflows" },
  { id: "courses", title: "Courses" },
  { id: "dev-resources", title: "Developer Resources" },
];
