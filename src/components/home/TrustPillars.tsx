"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const processSteps = [
  {
    number: "01",
    title: "Sourcing",
    description:
      "Full-grain hides from certified tanneries — vegetable-tanned over eight weeks, chosen one hide at a time.",
  },
  {
    number: "02",
    title: "Cutting",
    description:
      "Every panel hand-cut against patterns refined over twenty years. The good parts of the hide are saved for the visible parts of the piece.",
  },
  {
    number: "03",
    title: "Stitching",
    description:
      "Saddle-stitched thread by thread, two needles, one thread — seven stitches per inch. It doesn't unravel when one stitch fails. It doesn't fail.",
  },
  {
    number: "04",
    title: "Finishing",
    description:
      "Edges hand-burnished with beeswax, hardware fitted, inspected twice — then stamped with the Zyrocrafts mark.",
  },
  {
    number: "05",
    title: "Assembly",
    description:
      "Panels brought together with solid brass hardware, zippers and rivets set by hand — every joint tested under load before it ships.",
  },
  {
    number: "06",
    title: "Quality Control",
    description:
      "Every piece inspected twice — once on the bench, once under light — then wrapped in cotton and boxed for dispatch.",
  },
];

export function TrustPillars() {
  return (
    <section className="bg-cream py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 text-center lg:text-left overflow-hidden"
            >
              <div className="w-12 h-12 mx-auto lg:mx-0 mb-4 rounded-full bg-tan/15 flex items-center justify-center">
                <span className="text-tan font-display text-base font-semibold">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink mb-2 tracking-wide uppercase">
                {step.title}
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      <div className="mt-12 text-center">
        <Link
          href="/collection/men"
          className="inline-block rounded-full bg-[#E2D9C9] px-8 py-3.5 text-sm font-medium text-[#2A1507] transition-colors hover:bg-[#C08552]"
        >
          View Full Collection
        </Link>
      </div>
    </section>
  );
}
