"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { loginUser } from "@/lib/auth";
import EmailInput from "@/components/forms/email-input";
import PasswordInput from "@/components/forms/password-input";
import SubmitButton from "@/components/forms/submit-button";
import Legend from "@/components/forms/legend";
import Form from "@/components/forms/form";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { refreshAuth, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const ok = await loginUser({ email, password });
      if (!ok) {
        setError("Invalid email or password.");
        return;
      }
    } catch {
      setError("Invalid email or password.");
      return;
    }

    refreshAuth();
    router.replace("/");
  }

  if (!isLoading && isAuthenticated) {
    router.replace("/");
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Form onSubmit={handleSubmit} error={error}>
        <Legend title="Log In" />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput onChange={(e) => setPassword(e.target.value)} />
        <div><Link href="/register" className="link link-hover">No account? Create one!</Link></div>
        <SubmitButton title="Log In" />
      </Form>
    </main>
  );
}
