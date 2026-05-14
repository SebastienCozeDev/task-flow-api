"use client";

import { useState } from "react";
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

export default function RegisterPage() {
  const router = useRouter();
  const { refreshAuth, isAuthenticated, isLoading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== secondPassword) {
        setError("The passwords must be identical.");
        return;
    }

    try {
      const ok = await registerUser({ displayName, email, password });
      if (!ok) {
        setError("Email invalide ou mot de passe trop court.");
        return;
      }
    } catch (e) {
        setError("Email invalide ou mot de passe trop court." + e);
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
        <Legend title="Register" />
        <DisplayNameInput value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput onChange={(e) => setPassword(e.target.value)} />
        <PasswordInput onChange={(e) => setSecondPassword(e.target.value)} />
        <div><Link href="/login" className="link link-hover">Already have an account? Log in!</Link></div>
        <SubmitButton title="Register" />
      </Form>
    </main>
  );
}
