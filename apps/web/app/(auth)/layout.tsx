import type { Metadata } from "next";

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
    <>
      {children}
    </>
  );
}
