"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I break in a new leather jacket?",
    answer:
      "Wear it dry for the first two weeks before conditioning. Full-grain leather softens fastest through body heat and movement, not oil.",
  },
  {
    question: "What happens if the leather gets wet?",
    answer:
      "Let it air-dry away from direct heat, then treat with a neutral conditioner. Vegetable-tanned hide handles light rain well; avoid soaking it.",
  },
  {
    question: "How often should I condition the leather?",
    answer:
      "Every 6 months for regular wear, or sooner if the surface starts to feel dry or dull.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes — tracked express shipping to most countries, typically 5–9 business days from Sialkot.",
  },
  {
    question: "What's covered under the lifetime repair policy?",
    answer:
      "Stitching, lining, and zipper repairs are free for the life of the garment — you only cover return shipping to the atelier.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes, within 60 days if the piece is unworn beyond normal try-on, under our break-in guarantee.",
  },
];

export default function CarePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-12 text-center">
        <p className="text-tan text-sm font-medium tracking-widest uppercase mb-4">
          Keep it for decades
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink">
          Care &amp; frequently asked questions
        </h1>
        <p className="mt-6 text-ink/60 max-w-2xl mx-auto text-lg leading-relaxed">
          Leather rewards a little attention. Here&apos;s everything you need to keep a Zyrocrafts piece in shape for years.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-saddle/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-medium text-ink pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-tan shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-ink/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
