import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  UsersRound,
  Settings,
  MessageSquare,
  Zap,
  LineChart,
  FileSignature,
  Repeat,
  Clock,
  BarChart3,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  ownerOnly?: boolean;
}

export const APP_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Proposals", href: "/proposals", icon: FileSignature },
  { label: "Recurring", href: "/recurring", icon: Repeat, ownerOnly: true },
  { label: "Time", href: "/time", icon: Clock },
  { label: "Finance", href: "/finance", icon: LineChart, ownerOnly: true },
  { label: "Reports", href: "/reports", icon: BarChart3, ownerOnly: true },
  { label: "Automations", href: "/automations", icon: Zap, ownerOnly: true },
  { label: "Team", href: "/team", icon: UsersRound, ownerOnly: true },
  {
    label: "Feedback",
    href: "/settings/feedback",
    icon: MessageSquare,
    ownerOnly: true,
  },
  { label: "Settings", href: "/settings", icon: Settings, ownerOnly: true },
];

/** Filter nav items based on role — only owners see owner-only items. */
export function getNavItems(role: string): NavItem[] {
  return APP_NAV_ITEMS.filter((item) => !item.ownerOnly || role === "owner");
}
