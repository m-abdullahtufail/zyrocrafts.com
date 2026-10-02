"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Selecting the hide",
    description:
      "Our cutters reject roughly one in three hides for grain inconsistency before it ever touches a pattern. Only vegetable-tanned, full-grain leather leaves the floor.",
  },
  {
    number: "02",
    title: "Hand-cutting the pattern",
    description:
      "Each panel is cut to follow the natural stretch of the hide, so the finished garment moves with your shoulders instead of against them.",
  },
  {
    number: "03",
    title: "Saddle-stitching by hand",
    description:
      "Two needles, one thread, pulled through the same hole from opposite sides — a seam that won't unravel even if a single stitch is cut.",
  },
  {
    number: "04",
    title: "Edge finishing & burnishing",
    description:
      "Raw edges are sanded, dyed, and burnished by hand until they're smooth enough to run a fingernail across without catching.",
  },
  {
    number: "05",
    title: "Final inspection",
    description:
      "Every garment is checked seam by seam under raking light before it's packed — the same standard whether it's piece one or eighty of the run.",
  },
];

const stats = [
  { value: "12", label: "years running the Sialkot atelier" },
  { value: "3,400+", label: "garments shipped to 22 countries" },
  { value: "1", label: "hide lot per style, never repeated" },
  { value: "Lifetime", label: "stitching & lining repairs" },
];

export default function CraftsmanshipPage() {
  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-10 sm:pb-12 text-center">
        <p className="text-tan text-sm font-medium tracking-widest uppercase mb-4">
          Hide to seam
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
          Nothing here is outsourced.
        </h1>
        <p className="mt-6 text-ink/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Every Zyrocrafts piece passes through the same six hands, in the same Sialkot workshop, from raw hide to finished garment.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4 sm:gap-8 items-start"
            >
              <span className="text-tan font-display text-2xl sm:text-3xl font-semibold shrink-0">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-ink/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-saddle/10 border-y border-saddle/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-tan">
                  {stat.value}
                </p>
                <p className="mt-2 text-ink/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
