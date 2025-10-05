"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaPlus, FaTag, FaCalendarAlt, FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  createdAt: string;
}

const categories = ["Electronics", "Furniture", "Clothing", "Books", "Others"];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const filtered = products.filter(
    (p) =>
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || p.category === selectedCategory)
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0">
          {/* Brand */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <FaBoxOpen /> DastoDo
          </Link>

          {/* Search */}
          <div className="flex-1 relative w-full md:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 outline-blue-500 focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/add"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
            >
              <FaPlus /> Add Listing
            </Link>
            <FaUserCircle className="text-3xl text-gray-500 hover:text-gray-700 transition cursor-pointer" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-4 overflow-x-auto py-2 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <button
            className={`flex-shrink-0 px-4 py-1 rounded-full ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-1 rounded-full ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 text-center py-12 shadow-sm mb-6">
        <h2 className="text-4xl font-bold mb-3">Find Your Next Treasure</h2>
        <p className="text-gray-600 text-lg mb-6">
          Explore, buy, or sell second-hand items in your area
        </p>
        <Link
          href="/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md inline-flex items-center gap-2 mx-auto"
        >
          <FaPlus /> Post a Listing
        </Link>
      </section>

      {/* Listings Grid */}
      <section className="max-w-7xl mx-auto p-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <FaBoxOpen className="text-6xl mx-auto mb-4 text-gray-400" />
            <p className="text-lg mb-3">No listings found 😅</p>
            <Link href="/add" className="text-blue-600 underline hover:text-blue-800">
              Create your first one!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden cursor-pointer"
                >
                  {product.image ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-blue-600 font-bold flex items-center gap-1">
                        <FaTag /> ${product.price}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <FaCalendarAlt />
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
