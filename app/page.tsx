"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const users = ["User1", "Admin", "Researcher"];

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const router = useRouter();

  const handleLogin = () => {
    sessionStorage.setItem("username", selectedUser);
    router.push("/loading-job");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-theme-bg">
      <div className="bg-theme-panel border border-theme-border rounded-lg p-8 w-80">
        <h1 className="text-xl font-semibold text-theme-text mb-6 text-center">
          Chemistry Match Tool
        </h1>
        <label className="block text-theme-text-secondary text-sm mb-2">
          Select User
        </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full bg-theme-control border border-theme-border text-theme-text rounded px-3 py-2 mb-6 outline-none focus:border-accent-blue"
        >
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-accent-blue hover:bg-accent-blue/80 text-white font-medium py-2 rounded cursor-pointer transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
