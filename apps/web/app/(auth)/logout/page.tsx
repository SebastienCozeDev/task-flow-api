"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { useAuth } from "@/components/providers/auth-provider";

export default function LogoutPage() {
  const router = useRouter();
  const { refreshAuth, isAuthenticated, isLoading } = useAuth();
  logoutUser();
  refreshAuth();
  router.replace("/login");
  return null;
}
