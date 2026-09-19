"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const slides = [
  { src: "/about/exterior.png", alt: "Zyrocrafts exterior at sunset" },
  { src: "/about/showroom.png", alt: "Zyrocrafts interior showroom" },
  { src: "/about/store.png", alt: "Zyrocrafts flagship store" },
];

const whyChoose = [
  "Premium Genuine Leather",
  "Expert Handcrafted Construction",
  "Timeless Luxury Designs",
  "Durable & Long-Lasting Quality",
  "Worldwide Shipping",
  "Customer Satisfaction Guaranteed",
];

export function AboutUsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-[2000px] mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-tan text-sm font-medium tracking-widest uppercase mb-4"
            >
              About Us
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] tracking-tight text-ink"
            >
              Crafted for Those Who Appreciate True Luxury
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 space-y-4 text-sm md:text-[15px] leading-[1.7] text-ink/60 max-w-2xl"
            >
              <p>
                At ZYRO CRAFTS, we believe leather is more than a material — it&apos;s a
                statement of character, confidence, and timeless elegance. Our journey
                began with a passion for creating premium handcrafted leather products
                that combine traditional craftsmanship with modern design.
              </p>
              <p>
                Every leather jacket, bag, wallet, and accessory is meticulously
                crafted using high-quality genuine leather and premium hardware to
                ensure durability, comfort, and sophistication. Our skilled artisans
                pay attention to every detail, from precise stitching to flawless
                finishing, creating products that age beautifully and develop a unique
                character over time.
              </p>
              <p>
                Whether you&apos;re looking for a classic leather jacket, a stylish travel
                bag, or premium everyday accessories, ZYRO CRAFTS delivers exceptional
                quality that stands the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <h3 className="text-tan text-sm font-semibold tracking-widest uppercase mb-4">
                Why Choose ZYRO CRAFTS?
              </h3>
              <ul className="space-y-2">
                {whyChoose.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm md:text-[15px] text-ink/70">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tan/15">
                      <Check className="h-3 w-3 text-tan" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="mt-8 inline-block rounded-full bg-[#E2D9C9] px-8 py-3.5 text-sm font-medium text-[#2A1507] transition-colors hover:bg-[#C08552]"
              >
                Explore More
              </Link>
            </motion.div>
          </div>

          {/* Right — Cinematic slideshow */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[800px] rounded-2xl overflow-hidden bg-saddle/10">
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  style={{
                    animation: i === current ? "kenBurns 4s ease-in-out forwards" : "none",
                  }}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1507]/40 via-transparent to-transparent" />

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-6 bg-tan"
                      : "w-1.5 bg-cream/40 hover:bg-cream/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
