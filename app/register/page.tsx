"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("name.")) {
      const nameField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [nameField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newUser = { ...formData, id: Date.now() };
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if username already exists
      if (storedUsers.some((u: any) => u.username === newUser.username)) {
        throw new Error("Username already taken!");
      }

      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
      alert("Registration successful! You can now log in.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="username" placeholder="Username" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="name.firstname" placeholder="First Name" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="name.lastname" placeholder="Last Name" required className="w-full p-2 border rounded" onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}
