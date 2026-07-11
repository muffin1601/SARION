import Link from "next/link";
import {
  FilePlus,
  FolderPlus,
  ReceiptText,
  UserPlus2,
  UsersRound,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogMeetingDialog } from "@/components/dashboard/log-meeting-dialog";

const LINK_ACTIONS = [
  { label: "New Client", href: "/clients/new", icon: UserPlus2 },
  { label: "New Project", href: "/projects/new", icon: FolderPlus },
  { label: "Create Invoice", href: "/invoices/new", icon: FilePlus },
  { label: "Record Payment", href: "/invoices?status=unpaid", icon: ReceiptText },
  { label: "Invite Team Member", href: "/team", icon: UsersRound },
];

export function QuickActionGrid({ clientOptions }: { clientOptions: { id: string; name: string }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LINK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors hover:bg-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <action.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
          <LogMeetingDialog clientOptions={clientOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
