"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext) || {};

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  if (loading) return <p className="text-center text-lg">Loading products...</p>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      {/* 🔹 Category Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg bg-white shadow"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between">
            <Link href={`/product/${product.id}`}>
              <Image src={product.image} alt={product.title} width={200} height={200} className="w-full h-48 object-cover rounded-md" />
            </Link>
            <h2 className="text-lg font-semibold mt-3">{product.title}</h2>
            <p className="text-blue-600 font-bold">${product.price}</p>
            <div className="mt-auto space-y-2">
              <Link href={`/product/${product.id}`} className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700">
                View Details
              </Link>
              <button
                onClick={() => addToCart?.(product)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* About Us Section */}
      <section className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to our marketplace! We offer a wide range of high-quality products at the best prices.
          Our goal is to provide an amazing shopping experience with secure payments and fast delivery.
        </p>
      </section>

       {/* Improvement Input Section */}
       <section className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Help Us Improve</h2>
        <input 
          type="text"
          placeholder="Share your suggestions..."
          className="border flex  p-2 w-full rounded"
        />
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Submit Feedback
        </button>
      </section>

            {/* Footer Section */}
            <footer className="mt-12 p-6 bg-gray-900 text-white text-center rounded-lg">
        <p>&copy; {new Date().getFullYear()} Marketplace. All Rights Reserved.</p>
        <div className="mt-4">
          <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white mx-2">Contact Us</Link>
        </div>
      </footer>
    </main>
  );
}
