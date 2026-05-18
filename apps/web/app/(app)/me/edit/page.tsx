"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import EmailInput from "@/components/forms/email-input";
import PasswordInput from "@/components/forms/password-input";
import SubmitButton from "@/components/forms/submit-button";
import Legend from "@/components/forms/legend";
import Form from "@/components/forms/form";
import Link from "next/link";
import { registerUser } from "@/lib/auth";
import DisplayNameInput from "@/components/forms/display-name-input";
import CancelButton from "@/components/forms/cancel-button";
import { getCurrentUser, updateCurrentUser } from "@/lib/api/users-api";
import { getAccessToken } from "@/lib/auth-storage";

export default function EditProfilePage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function redirectToLogout(): void {
    router.replace("/logout");
    return;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password == "") {
      setError("Your password is required");
      return;
    }

    try {
      const token = getAccessToken();
      if (!token) return redirectToLogout();
      const ok = await updateCurrentUser({ displayName, email, password }, token);
      if (!ok) {
        setError("Your email address has already been used or your password is invalid. If you are sure you entered the correct password, refresh the page and try again.");
        return;
      }
      router.replace("/settings");    // TODO: Add notification
    } catch (e) {
        setError("Your email address has already been used or your password is invalid. If you are sure you entered the correct password, refresh the page and try again.");
      return;
    }
  }
  
  useEffect(() => {
    async function loadUserInfo() {
      const token = getAccessToken();
      if (!token) return redirectToLogout();
      try {
        const user = await getCurrentUser(token);
        if (!user) return redirectToLogout();
        setDisplayName(user.displayName);
        setEmail(user.email);
      } catch {
        return redirectToLogout();
      }
    }
    loadUserInfo();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Form onSubmit={handleSubmit} error={error}>
        <Legend title="Update Profile" />
        <DisplayNameInput value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput onChange={(e) => setPassword(e.target.value)} />
        <CancelButton title="Cancel" href="/settings" />
        <SubmitButton title="Update Profile" />
      </Form>
    </main>
  );
}
