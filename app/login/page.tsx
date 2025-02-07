"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find(
        (u: any) => u.username === credentials.username && u.password === credentials.password
      );

      if (credentials.username === "admin" && credentials.password === "admin123") {
        localStorage.setItem("session", JSON.stringify({ username: "admin" }));
        localStorage.setItem("isAdmin", "true");
        router.push("/admin");
        setTimeout(() => window.location.reload(), 500); // 🔄 Refresh after navigation
        return;
      }

      if (!user) {
        throw new Error("Invalid username or password");
      }

      localStorage.setItem("session", JSON.stringify(user));
      localStorage.removeItem("isAdmin");
      router.push("/");
      setTimeout(() => window.location.reload(), 500); // 🔄 Refresh after navigation
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" name="username" placeholder="Username" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded" onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </div>
  );
}
