"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anvil,
  Briefcase,
  Brush,
  Cog,
  DraftingCompass,
  Droplets,
  Factory,
  Flame,
  Hammer,
  Handbag,
  Layers,
  Leaf,
  Ruler,
  Scissors,
  Slice,
  Sparkle,
  Wallet,
} from "lucide-react";

function SectionLabel({
  children,
  align = "center",
}: {
  children: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <Sparkle className="h-3 w-3 text-[#FBDBAF]/70" strokeWidth={1.5} />
      <span className="uppercase tracking-[0.22em] text-[11px] text-[#FBDBAF]/70">
        {children}
      </span>
      <Sparkle className="h-3 w-3 text-[#FBDBAF]/70" strokeWidth={1.5} />
    </div>
  );
}

function CategoryPhoto({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_40%,#8C5E34_0%,#3A1E0B_55%,#2A1507_100%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
    </>
  );
}

const ROW_ONE = [Scissors, Slice, Ruler, Hammer, Anvil, DraftingCompass, Cog, Layers];
const ROW_TWO = [Leaf, Droplets, Brush, Flame, Wallet, Handbag, Briefcase, Factory];

function MarqueeRow({
  icons,
  direction,
}: {
  icons: typeof ROW_ONE;
  direction: "left" | "right";
}) {
  const doubled = [...icons, ...icons];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((Icon, i) => (
          <div
            key={i}
            className="liquid-glass grid h-14 w-14 shrink-0 place-items-center rounded-xl md:h-16 md:w-16"
          >
            <Icon className="h-6 w-6 text-[#FBDBAF]/80" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoriesSection() {
  const [gender, setGender] = useState<"Men" | "Women">("Men");
  const g = gender.toLowerCase();

  return (
    <section className="bg-[#2A1507] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,#4A2A12_0%,#2A1507_62%)] text-[#FBDBAF] antialiased px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-14 md:py-16 lg:h-screen lg:min-h-[780px] flex flex-col">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] tracking-tight">
            Shop by category
          </h2>
          <p className="mt-3 max-w-3xl text-sm md:text-[15px] leading-[1.6] text-[#FBDBAF]/60">
            Five crafts cut from full-grain, vegetable-tanned leather and
            saddle-stitched by hand — jackets, bags, belts, wallets and small
            goods built to inherit, not to replace.
          </p>
        </div>
        <div className="flex rounded-full bg-white/10 backdrop-blur-md p-1 shrink-0 self-start">
          {(["Men", "Women"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                gender === g
                  ? "bg-[#FBDBAF] text-[#2A1507]"
                  : "text-[#FBDBAF]/60 hover:text-[#FBDBAF]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {/* Column 1 — Jackets */}
        <Link
          href={`/collection/${g}`}
          className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-2xl bg-[#2A1507] p-5 md:p-6"
        >
          <CategoryPhoto src="/categories/jackets.png" alt="Brown leather jacket" />
          <div className="relative">
            <SectionLabel>Jackets</SectionLabel>
          </div>
        </Link>

        {/* Column 2 */}
        <div className="grid gap-4 md:grid-rows-[auto_1fr] md:gap-5">
          {/* Bags */}
          <Link
            href={`/collection/${g}`}
            aria-label="Shop bags"
            className="group relative block min-h-[280px] overflow-hidden rounded-2xl bg-[#2A1507] p-5 md:p-6"
          >
            <CategoryPhoto src="/categories/bags.png" alt="Leather duffle bag" />
            <div className="relative">
              <SectionLabel align="left">Bags</SectionLabel>
            </div>
          </Link>

          {/* Belts */}
          <Link
            href={`/collection/${g}`}
            className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-[#2A1507] p-5 md:p-6"
          >
            <CategoryPhoto src="/categories/belts.png" alt="Rolled leather belts" />
            <div className="relative">
              <SectionLabel>Belts</SectionLabel>
            </div>
          </Link>
        </div>

        {/* Column 3 */}
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2 md:gap-5 lg:col-span-1 lg:grid-cols-1">
          {/* Wallets */}
          <Link
            href={`/collection/${g}`}
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#2A1507] p-5 md:p-6"
          >
            <CategoryPhoto src="/categories/wallets.png" alt="Leather wallets" />
            <div className="relative">
              <SectionLabel>Wallets</SectionLabel>
            </div>
            <div className="relative mt-auto space-y-3 pt-8">
              <MarqueeRow icons={ROW_ONE} direction="left" />
              <MarqueeRow icons={ROW_TWO} direction="right" />
              <p className="pt-1 text-center text-[11px] uppercase tracking-[0.22em] text-[#FBDBAF]/70">
                Minimal · Continental · Card Holders
              </p>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            href={`/collection/${g}`}
            aria-label="Shop accessories"
            className="group relative block min-h-[240px] overflow-hidden rounded-2xl bg-[#2A1507] p-5 md:p-6"
          >
            <CategoryPhoto src="/categories/accessories.png" alt="Leather gloves and small goods" />
            <div className="relative">
              <SectionLabel align="left">Accessories</SectionLabel>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
