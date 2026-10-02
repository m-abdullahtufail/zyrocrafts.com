"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, categories, formatPrice, type CategoryFilter } from "@/lib/data";

export default function WomenCollectionPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filtered =
    activeFilter === "All"
      ? products.filter((p) => p.gender === "Women")
      : products.filter((p) => p.gender === "Women" && p.category === activeFilter);

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-10 sm:pb-12">
        <p className="text-tan text-sm font-medium tracking-widest uppercase mb-4">
          {filtered.length} pieces
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
          Women&apos;s Collection
        </h1>
        <p className="mt-4 text-ink/60 max-w-2xl text-base sm:text-lg">
          Every style below is cut from a single, numbered hide lot. Sizes and colorways are limited to what that lot can produce.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                activeFilter === category
                  ? "bg-[#2A1507] text-[#EDE3D5]"
                  : "bg-[#E2D9C9] text-[#2A1507] hover:bg-[#C08552]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="aspect-[3/4] bg-saddle/15 rounded-lg overflow-hidden mb-4">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink/30 font-display text-lg">
                      {product.name}
                    </div>
                  )}
                </div>
                <p className="text-tan text-xs font-medium tracking-wider uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="font-display text-sm sm:text-base lg:text-lg font-semibold text-ink group-hover:text-tan transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-ink/60 text-sm">
                  From {formatPrice(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-ink/50 py-20">
            No products in this category.
          </p>
        )}
      </div>
    </section>
  );
}
