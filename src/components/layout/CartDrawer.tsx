"use client";

import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-ink border-l border-saddle/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-saddle/30">
              <h2 className="font-display text-xl font-semibold text-cream">
                Bag ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="text-cream/50 hover:text-cream transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-cream/50 text-lg mb-4">Your bag is empty</p>
                  <Link
                    href="/collection/men"
                    onClick={closeCart}
                    className="px-8 py-3 bg-[#E2D9C9] text-[#2A1507] font-medium rounded-full hover:bg-[#C08552] transition-colors"
                  >
                    Browse the collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.slug}-${item.size}`}
                      className="flex gap-4"
                    >
                      {/* Product image placeholder */}
                      <div className="w-20 h-24 bg-saddle/40 rounded flex items-center justify-center shrink-0">
                        <span className="text-cream/30 text-xs text-center px-1">
                          {item.product.name}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold text-cream truncate">
                          {item.product.name}
                        </h3>
                        {item.size && (
                          <p className="text-cream/50 text-xs mt-0.5">Size: {item.size}</p>
                        )}
                        <p className="text-tan text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-7 h-7 rounded border border-saddle text-cream/60 flex items-center justify-center hover:border-tan hover:text-tan transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="text-cream text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="w-7 h-7 rounded border border-saddle text-cream/60 flex items-center justify-center hover:border-tan hover:text-tan transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.slug, item.size)}
                        className="text-cream/30 hover:text-oxblood transition-colors self-start"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-saddle/30 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream/60 text-sm">Subtotal</span>
                  <span className="text-cream font-semibold text-lg">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-cream/40 text-xs">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-[#E2D9C9] text-[#2A1507] font-semibold rounded-full text-center hover:bg-[#C08552] transition-colors"
                >
                  Proceed to checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-cream/50 text-sm hover:text-cream transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
