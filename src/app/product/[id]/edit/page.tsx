"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus, FaImage, FaTag } from "react-icons/fa";
import Image from "next/image";

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

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const products: Product[] = JSON.parse(saved);
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setTitle(found.title);
        setDescription(found.description);
        setPrice(found.price);
        setCategory(found.category);
        setImage(found.image || null);
      }
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price) {
      alert("Please fill all required fields!");
      return;
    }

    const saved = localStorage.getItem("products");
    if (!saved) return;

    const products: Product[] = JSON.parse(saved);
    const updatedProducts = products.map((p) =>
      p.id === id
        ? {
            ...p,
            title,
            description,
            price: Number(price),
            category,
            image: image || undefined,
          }
        : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    alert("Listing updated successfully!");
    router.push(`/product/${id}`);
  };

  if (!product)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        <p>Product not found 😅</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaPlus /> Edit Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
            placeholder="Enter product price"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 flex items-center gap-2">
            <FaTag /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 flex items-center gap-2">
            <FaImage /> Image (optional)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && (
            <Image
            width={1000}
            height={1000}
              src={image}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
