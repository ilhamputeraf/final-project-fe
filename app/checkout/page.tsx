"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("session");
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Your order has been placed successfully!</p>
    </div>
  );
}
