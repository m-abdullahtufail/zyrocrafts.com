"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart/CartContext";

const tabs = ["Details", "Materials & care", "Shipping"] as const;

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Details");
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  const handleAddToBag = () => {
    const sizeToAdd = selectedSize ?? product.sizes?.[0] ?? null;
    addItem(product, sizeToAdd);
  };

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav className="mb-6 sm:mb-8 text-xs sm:text-sm text-ink/50 flex flex-wrap gap-y-1">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/collection/${product.gender.toLowerCase()}`} className="hover:text-ink transition-colors">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-saddle/15 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink/30 font-display text-3xl">
                  {product.name}
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      activeImage === idx ? "border-tan" : "border-transparent hover:border-saddle/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-tan text-sm font-medium tracking-wider uppercase mb-3">
              {product.kicker}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-ink font-medium">
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 text-ink/70 leading-relaxed">
              {product.description}
            </p>

            {product.sizes && (
              <div className="mt-8">
                <p className="text-sm text-ink/60 mb-3">
                  Size {product.sizes && !selectedSize && <span className="text-oxblood">*</span>}
                </p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-tan bg-tan/10 text-tan"
                          : "border-saddle text-ink/60 hover:border-tan/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToBag}
              className="mt-8 w-full py-4 bg-[#E2D9C9] text-[#2A1507] font-semibold rounded-full hover:bg-[#C08552] transition-colors"
            >
              Add to bag
            </button>

            <div className="mt-12 border-t border-saddle/20 pt-8">
              <div className="flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-1 border-b border-saddle/20 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
                      activeTab === tab
                        ? "border-tan text-tan"
                        : "border-transparent text-ink/50 hover:text-ink"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-ink/70 text-sm leading-relaxed">
                {activeTab === "Details" && (
                  <ul className="space-y-2">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="text-tan mt-1">·</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "Materials & care" && (
                  <p>{product.materials}</p>
                )}
                {activeTab === "Shipping" && (
                  <p>{product.shipping}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-semibold text-ink mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] bg-saddle/15 rounded-lg overflow-hidden mb-4">
                    <div className="w-full h-full flex items-center justify-center text-ink/30 font-display text-lg">
                      {item.name}
                    </div>
                  </div>
                  <h3 className="font-display text-sm sm:text-lg font-semibold text-ink group-hover:text-tan transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-tan text-sm">
                    From {formatPrice(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
