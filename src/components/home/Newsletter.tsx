"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-saddle/10 py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
            Get first access to new hide lots before they sell through.
          </h2>

          {submitted ? (
            <p className="mt-6 text-tan">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-cream border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#E2D9C9] text-[#2A1507] font-medium rounded-full hover:bg-[#C08552] transition-colors"
              >
                Sign up
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
