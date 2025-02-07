"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("session");
    setSession(user ? JSON.parse(user) : null);

    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("isAdmin");
    setSession(null);
    setIsAdmin(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Keeva Shop</Link>
      <div className="flex gap-4">
        <Link href="/cart" className="relative bg-gray-700 px-4 py-1 rounded">
          Cart {cartCount > 0 && <span className="bg-red-500 text-white px-2 rounded-full">{cartCount}</span>}
        </Link>
        {session ? (
          <>
            {isAdmin && (
              <Link href="/admin" className="bg-yellow-500 px-4 py-1 rounded">Admin</Link>
            )}
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-blue-500 px-4 py-1 rounded">Login</Link>
            <Link href="/register" className="bg-green-500 px-4 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
