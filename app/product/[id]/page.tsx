"use client";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

async function getProduct(productId: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext) || {};

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading product details...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <main className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={400}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-500 mb-3">{product.category}</p>
          <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <button
            onClick={() => addToCart?.(product)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <div className="mt-6">
            <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
