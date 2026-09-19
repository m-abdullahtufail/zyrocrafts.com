"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2014",
    title: "The first cutting table",
    description:
      "Hassan Raza opens a one-room workshop with two apprentices and a single roll of vegetable-tanned hide.",
  },
  {
    year: "2019",
    title: "Zyrocrafts is founded",
    description:
      "The workshop formalizes into Zyrocrafts, moving to a larger space and taking on its first international orders.",
  },
  {
    year: "2026",
    title: "3,400 garments and counting",
    description:
      "Now a team of eleven cutters and stitchers, shipping to 22 countries without changing a single step of the process.",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-12 text-center">
        <p className="text-tan text-sm font-medium tracking-widest uppercase mb-4">
          Our atelier
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink">
          Twelve years, one workshop, one standard.
        </h1>
        <p className="mt-6 text-ink/60 max-w-2xl mx-auto text-lg leading-relaxed">
          Zyrocrafts started as a two-person cutting table in Sialkot&apos;s leather quarter. It&apos;s grown, but the table hasn&apos;t moved.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-display text-xl md:text-2xl text-ink leading-relaxed italic">
            &ldquo;I wanted to build something my father, a saddler, would have recognized as honest work. Everything else followed from that.&rdquo;
          </p>
          <footer className="mt-6">
            <cite className="not-italic text-tan text-sm tracking-wider uppercase">
              — Hassan Raza, Founder
            </cite>
          </footer>
        </motion.blockquote>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex gap-8 items-start"
            >
              <span className="text-tan font-display text-3xl font-semibold shrink-0">
                {milestone.year}
              </span>
              <div className="border-l border-saddle/30 pl-8">
                <h3 className="font-display text-xl font-semibold text-ink mb-2">
                  {milestone.title}
                </h3>
                <p className="text-ink/60 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
