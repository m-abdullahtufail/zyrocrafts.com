"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/data";
import { useCart } from "@/lib/cart/CartContext";

export function Nav() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const showBrown = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-orbitron transition-colors duration-300 ${
        showBrown ? "bg-[#2A1507]/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-9 lg:px-11">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img src="/Logo/1 (1).png" alt="Zyrocrafts" className="h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-cream ${
                  pathname === item.href ? "text-tan" : "text-cream/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/collection"
              className="ml-4 px-8 py-3 text-sm font-medium bg-[#EDE3D5] text-[#2A1507] rounded-full hover:bg-[#E0D5C5] transition-colors"
            >
              Shop the collection
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-cream p-2 hover:text-tan transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-tan text-cream text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
