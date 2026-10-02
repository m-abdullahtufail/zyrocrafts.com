"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/data";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Pakistan",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("confirmation");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <section className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4">
            Your bag is empty
          </h1>
          <p className="text-ink/60 mb-8">Add some items before checking out.</p>
          <Link
            href="/collection/men"
            className="inline-block px-8 py-3.5 bg-[#E2D9C9] text-[#2A1507] font-medium rounded-full hover:bg-[#C08552] transition-colors"
          >
            Browse the collection
          </Link>
        </div>
      </section>
    );
  }

  if (step === "confirmation") {
    return (
      <section className="bg-cream min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-tan/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-tan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4">
            Order confirmed
          </h1>
          <p className="text-ink/60 mb-2">
            Thank you, {formData.firstName}. Your order has been placed.
          </p>
          <p className="text-ink/50 text-sm mb-8">
            A confirmation email will be sent to {formData.email}.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-[#E2D9C9] text-[#2A1507] font-medium rounded-full hover:bg-[#C08552] transition-colors"
          >
            Return home
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Checkout</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 sm:mt-6">
            <button
              onClick={() => setStep("details")}
              className={`text-sm font-medium transition-colors ${
                step === "details" ? "text-tan" : "text-ink/40"
              }`}
            >
              1. Customer details
            </button>
            <span className="text-ink/20">→</span>
            <button
              onClick={() => setStep("payment")}
              className={`text-sm font-medium transition-colors ${
                step === "payment" ? "text-tan" : "text-ink/40"
              }`}
              disabled={step === "details"}
            >
              2. Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "details" && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleDetailsSubmit}
                className="space-y-6"
              >
                <h2 className="font-display text-xl font-semibold text-ink mb-4">
                  Contact information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">First name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Last name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                </div>

                <h2 className="font-display text-xl font-semibold text-ink pt-4 mb-4">
                  Shipping address
                </h2>
                <div>
                  <label className="block text-sm text-ink/60 mb-1.5">Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Province / State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Postal code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-ink/60 mb-1.5">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink focus:outline-none focus:border-tan transition-colors"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E2D9C9] text-[#2A1507] font-semibold rounded-full hover:bg-[#C08552] transition-colors mt-4"
                >
                  Continue to payment
                </button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-6"
              >
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-ink/50 hover:text-ink text-sm flex items-center gap-1 mb-4"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to details
                </button>

                <h2 className="font-display text-xl font-semibold text-ink mb-4">
                  Payment details
                </h2>

                {/* Payment methods */}
                <div className="flex gap-3 mb-6">
                  <div className="px-4 py-2 bg-tan/10 border border-tan rounded text-tan text-sm font-medium">
                    Credit card
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-ink/60 mb-1.5">Name on card</label>
                  <input
                    type="text"
                    required
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink/60 mb-1.5">Card number</label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                      setPaymentData({ ...paymentData, cardNumber: val });
                    }}
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">Expiry</label>
                    <input
                      type="text"
                      required
                      placeholder="MM / YY"
                      maxLength={7}
                      value={paymentData.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length > 2) val = val.slice(0, 2) + " / " + val.slice(2, 4);
                        setPaymentData({ ...paymentData, expiry: val });
                      }}
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink/60 mb-1.5">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={paymentData.cvv}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E2D9C9] text-[#2A1507] font-semibold rounded-full hover:bg-[#C08552] transition-colors mt-4"
                >
                  Place order — {formatPrice(totalPrice)}
                </button>

                <p className="text-ink/40 text-xs text-center">
                  Your payment is processed securely. We never store your card details.
                </p>
              </motion.form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-saddle/10 border border-saddle/20 rounded-lg p-5 sm:p-6 lg:sticky lg:top-24">
              <h3 className="font-display text-lg font-semibold text-ink mb-4">
                Order summary
              </h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.slug}-${item.size}`}
                    className="flex gap-3"
                  >
                    <div className="w-14 h-16 bg-saddle/15 rounded overflow-hidden flex items-center justify-center shrink-0">
                      {item.product.images && item.product.images.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-ink/30 text-[10px] text-center px-1">
                          {item.product.name}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-ink text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      {item.size && (
                        <p className="text-ink/40 text-xs">Size: {item.size}</p>
                      )}
                      <p className="text-ink/50 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-ink text-sm shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-saddle/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="text-ink">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">Shipping</span>
                  <span className="text-ink">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-saddle/20">
                  <span className="text-ink">Total</span>
                  <span className="text-tan">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
