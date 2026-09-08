"use client";

import { useEffect, type ReactNode } from "react";

export function DeskChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.vd = "1";
    return () => {
      delete document.documentElement.dataset.vd;
    };
  }, []);

  return children;
}
