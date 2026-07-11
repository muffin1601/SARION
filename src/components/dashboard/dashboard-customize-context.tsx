"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CustomizeContextValue {
  customizing: boolean;
  toggle: () => void;
}

const CustomizeContext = createContext<CustomizeContextValue | null>(null);

export function DashboardCustomizeProvider({ children }: { children: ReactNode }) {
  const [customizing, setCustomizing] = useState(false);
  return (
    <CustomizeContext.Provider value={{ customizing, toggle: () => setCustomizing((v) => !v) }}>
      {children}
    </CustomizeContext.Provider>
  );
}

export function useDashboardCustomize() {
  const ctx = useContext(CustomizeContext);
  if (!ctx) throw new Error("useDashboardCustomize must be used within DashboardCustomizeProvider");
  return ctx;
}
