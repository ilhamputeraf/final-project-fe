"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext) || {};

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Your cart is empty.</h2>
        <Link href="/" className="text-blue-500 mt-4 block">← Back to Home</Link>
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid gap-6">
        {cart.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow flex items-center gap-4">
            <Image src={product.image} alt={product.title} width={100} height={80} className="rounded-md" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-blue-600 font-bold">${product.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity?.(product.id, product.quantity - 1)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="text-lg font-bold">{product.quantity}</span>
                <button
                  onClick={() => updateQuantity?.(product.id, product.quantity + 1)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => removeFromCart?.(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Clear Cart
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link href="/checkout">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </main>
  );
}
