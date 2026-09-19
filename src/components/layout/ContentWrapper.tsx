"use client";

import { usePathname } from "next/navigation";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`flex-1 ${isHome ? "" : "pt-16"}`}>
      {children}
    </main>
  );
}
