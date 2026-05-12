"use client";

import { getAccessToken } from "@/lib/auth-storage";
import { getBoards } from "@/lib/boards-api";

export default function BoardsDebug() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Boards</li>
      <li className="list-row">
          <button
            className="btn btn-square btn-ghost"
            onClick={
              async () => {
                const token = getAccessToken();
                if (token) {
                  const result = await getBoards(token);
                  console.log("Get Boards Result:", result);
                }
                else {
                  console.log("Unauthenticated");
                }
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
            <div>Get boards</div>
            <div className="text-xs uppercase font-semibold opacity-60">Get the boards of the current user</div>
          </div>
      </li>
    </ul>
  );
}