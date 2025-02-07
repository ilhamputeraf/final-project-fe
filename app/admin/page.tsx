"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "", image: "", category: "" });
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) router.push("/login");

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...formData, id: Date.now() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setFormData({ title: "", price: "", image: "", category: "" });
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Add Products</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>

      <h2 className="text-xl font-bold mt-6">Product List</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 border rounded flex justify-between">
            <span>{product.title} - ${product.price}</span>
            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
