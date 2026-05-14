import type { Metadata } from "next";
import MainDock from "@/components/docks/main-dock";
import AuthGuard from "@/components/auth/auth-guard";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "TaskFlow web app",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      {children}
      <MainDock/>
    </AuthGuard>
  );
}
