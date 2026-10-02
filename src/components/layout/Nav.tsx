"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { useCart } from "@/lib/cart/CartContext";

export function Nav() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const showBrown = !isHome || scrolled || menuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-orbitron transition-colors duration-300 ${
        showBrown ? "bg-[#2A1507]/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-5 sm:px-9 lg:px-11">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img src="/Logo/1 (1).png" alt="Zyrocrafts" className="h-10 sm:h-12 w-auto" />
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

          <div className="flex items-center gap-1 sm:gap-4">
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

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden text-cream p-2 hover:text-tan transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-cream/10 px-5 pt-2 pb-6 max-h-[calc(80vh-4rem)] overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-cream/10 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3.5 text-sm font-medium tracking-wide transition-colors ${
                    pathname === item.href ? "text-tan" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/collection"
            onClick={() => setMenuOpen(false)}
            className="mt-5 block px-8 py-3 text-center text-sm font-medium bg-[#EDE3D5] text-[#2A1507] rounded-full hover:bg-[#E0D5C5] transition-colors"
          >
            Shop the collection
          </Link>
        </div>
      </div>
    </nav>
  );
}
