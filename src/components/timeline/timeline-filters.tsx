"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TIMELINE_CATEGORIES,
  TIMELINE_CATEGORY_LABEL,
  type TimelineCategory,
} from "@/lib/activity-categories";

interface TimelineFiltersProps {
  category: TimelineCategory;
  onCategoryChange: (category: TimelineCategory) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export function TimelineFilters({
  category,
  onCategoryChange,
  search,
  onSearchChange,
}: TimelineFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search activity…"
          className="pl-9"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
            {TIMELINE_CATEGORY_LABEL[category]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={category}
            onValueChange={(v) => onCategoryChange(v as TimelineCategory)}
          >
            {TIMELINE_CATEGORIES.map((c) => (
              <DropdownMenuRadioItem key={c} value={c}>
                {TIMELINE_CATEGORY_LABEL[c]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
