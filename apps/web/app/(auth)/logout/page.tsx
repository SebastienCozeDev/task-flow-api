"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  logoutUser();
  router.replace("/login");
  location.href = "/login";
  return null;
}
