"use client";

import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDashboardCustomize } from "@/components/dashboard/dashboard-customize-context";

export function DashboardCustomizeToggle() {
  const { customizing, toggle } = useDashboardCustomize();
  return (
    <Button variant={customizing ? "brand" : "outline"} size="sm" onClick={toggle}>
      <Settings2 className="h-4 w-4" />
      {customizing ? "Done customizing" : "Customize"}
    </Button>
  );
}
