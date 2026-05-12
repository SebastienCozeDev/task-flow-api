"use client";

import { login, register } from "@/lib/auth-api";

export default function AuthDebug() {
  return (
    <div>
      <h2>Auth</h2>
      <button
        className="btn"
        onClick={async () => {
          const result = await login({
            email: "john.doe@example.com",
            password: "password123",
          });
          console.log("Login Result:", result);
        }}
      >
        Test login
      </button>

      <button
        className="btn"
        onClick={async () => {
          const result = await register({
            displayName: "John Doe",
            email: "john.doe.1@example.com",
            password: "password123",
          });
          console.log("Login Result:", result);
        }}
      >
        Test register
      </button>
    </div>
  );
}