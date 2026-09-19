"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, formatPrice } from "@/lib/data";

const previewProducts = products.filter((p) => p.gender === "Men").slice(0, 5);

export function CollectionPreview() {
  return (
    <section className="bg-cream py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
            From the collection
          </h2>
          <p className="mt-4 text-ink/60">
            Every style is cut from a single, numbered hide lot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {previewProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="aspect-[3/4] bg-saddle/15 rounded-2xl overflow-hidden mb-4">
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
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-tan transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-tan text-sm">
                  From {formatPrice(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
