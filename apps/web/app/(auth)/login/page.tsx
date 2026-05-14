"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { refreshAuth, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const ok = await loginUser({ email, password });

    if (!ok) {
      setError("Email ou mot de passe invalide.");
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
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="text-2xl font-semibold">Connexion</h1>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full">
          Se connecter
        </button>

        {error ? <p className="text-error">{error}</p> : null}
      </form>
    </main>
  );
}
