"use client";

import "./globals.css";
import Navigation from "@/components/Navigation";
import { useEffect } from "react";
import { useCapsules } from "@/store/capsules";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const load = useCapsules((s) => s.load);

  useEffect(() => {
    load();
  }, []);

  return (
    <html lang="en">
      <body
        className="min-h-screen text-[color:var(--text-main)]"
        style={{ background: "var(--bg-main)" }}
      >
        <Navigation />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
