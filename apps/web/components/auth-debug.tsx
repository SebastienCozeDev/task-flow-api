"use client";

import { login, register } from "@/lib/auth-api";
import { removeAccessToken, saveAccessToken } from "@/lib/auth-storage";

export default function AuthDebug() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Auth</li>
      <li className="list-row">
          <button
            className="btn btn-square btn-ghost"
            onClick={
              async () => {
                const result = await login({
                  email: "john.doe@example.com",
                  password: "password123",
                });
                console.log("Login Result:", result);
                if (result) saveAccessToken(result.access_token);
              }
            }
          >
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <div>
            <div>Login</div>
            <div className="text-xs uppercase font-semibold opacity-60">Login the current user and save the access token</div>
          </div>
      </li>
      <li className="list-row">
          <button
            className="btn btn-square btn-ghost"
            onClick={
              async () => {
                const result = await register({
                  displayName: "John Doe",
                  email: "john.doe.1@example.com",
                  password: "password123",
                });
                console.log("Register Result:", result);
              }
            }
          >
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <div>
            <div>Register</div>
            <div className="text-xs uppercase font-semibold opacity-60">Register the current user</div>
          </div>
      </li>
      <li className="list-row">
          <button
            className="btn btn-square btn-ghost"
            onClick={ async () => removeAccessToken() }
          >
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <div>
            <div>Logout</div>
            <div className="text-xs uppercase font-semibold opacity-60">Remove the access token</div>
          </div>
      </li>
    </ul>
  );
}