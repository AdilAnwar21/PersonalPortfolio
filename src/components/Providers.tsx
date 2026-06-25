"use client";

import { SessionProvider } from "next-auth/react";
import { CustomCursor } from "@/components/animations/CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomCursor />
      {children}
    </SessionProvider>
  );
}
