"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaTag,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";

interface Review {
  user: string;
  text: string;
  rating: number;
  avatar?: string;
}

interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  image?: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  createdAt: string;
  badge?: string;
  reviews?: Review[];
  related?: RelatedProduct[];
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const products: Product[] = JSON.parse(saved);
      const found = products.find((p) => p.id === id);
      if (found) setProduct(found);
    }
  }, [id]);

  const handleDelete = () => {
    if (!product) return;
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const saved = localStorage.getItem("products");
    if (saved) {
      const products: Product[] = JSON.parse(saved);
      const updated = products.filter((p) => p.id !== product.id);
      localStorage.setItem("products", JSON.stringify(updated));
      alert("Listing deleted!");
      router.push("/");
    }
  };

  const handleEdit = () => {
    if (!product) return;
    router.push(`/product/${product.id}/edit`);
  };

  if (!product)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 bg-gradient-to-b from-blue-50 to-white">
        <p>Product not found 😅</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 p-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2 font-semibold"
      >
        <FaArrowLeft /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 mt-15 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto hover:shadow-3xl transition-shadow duration-500"
      >
        {/* Hero Image */}
        <div className="relative w-full h-96 sm:h-[28rem] group overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-t-3xl transform transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
              No Image
            </div>
          )}
          {product.badge && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg animate-pulse">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info Panel */}
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-6 mt-4 items-center">
            <span className="flex items-center gap-2 text-blue-600 font-bold text-2xl transition-transform transform hover:scale-105">
              <FaTag /> ${product.price}
            </span>
            <span className="flex items-center gap-2 text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full">
              Category: {product.category}
            </span>
            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <FaCalendarAlt /> {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition font-semibold shadow-md"
              onClick={handleEdit}
            >
              <FaEdit /> Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-semibold shadow-md"
              onClick={handleDelete}
            >
              <FaTrash /> Delete
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Reviews Carousel */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reviews</h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {product.reviews.map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {review.avatar ? (
                      <Image src={review.avatar} alt={review.user} width={40} height={40} />
                    ) : (
                      <div className="flex items-center justify-center text-gray-400 text-sm">
                        {review.user[0]}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-gray-700">{review.user}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products Carousel */}
      {product.related && product.related.length > 0 && (
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {product.related.map((rel) => (
              <motion.div
                key={rel.id}
                whileHover={{ scale: 1.05 }}
                className="min-w-[180px] bg-white rounded-xl shadow-md p-3 flex flex-col gap-2 cursor-pointer"
                onClick={() => router.push(`/product/${rel.id}`)}
              >
                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-200">
                  {rel.image ? (
                    <Image src={rel.image} alt={rel.title} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center text-gray-400 h-full text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <span className="font-semibold text-gray-700 truncate">{rel.title}</span>
                <span className="text-blue-600 font-bold">${rel.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
