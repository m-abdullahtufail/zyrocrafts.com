"use client";

import { motion } from "framer-motion";

export function BrandStatement() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-snug italic">
            &ldquo;Zyrocrafts began with a simple refusal — to laminate, coat, or rush a hide that took three years to tan properly. Every garment we sell is still repairable the day it&apos;s fifty years old.&rdquo;
          </p>
          <footer className="mt-8">
            <cite className="not-italic text-tan text-sm tracking-wider uppercase">
              — Hassan Raza, Founder &amp; Head Cutter
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
