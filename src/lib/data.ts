import { Product, NavItem, FooterSection } from "./types";
import { newProducts } from "./new-products";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/collection/men" },
  { label: "Women", href: "/collection/women" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "About", href: "/about" },
  { label: "Care & FAQ", href: "/care" },
  { label: "Contact", href: "/contact" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Men",
    links: [
      { label: "Jackets", href: "/collection/men" },
      { label: "Bags", href: "/collection/men" },
      { label: "Belts", href: "/collection/men" },
      { label: "Wallets", href: "/collection/men" },
      { label: "Accessories", href: "/collection/men" },
    ],
  },
  {
    title: "Women",
    links: [
      { label: "Jackets", href: "/collection/women" },
      { label: "Bags", href: "/collection/women" },
      { label: "Belts", href: "/collection/women" },
      { label: "Wallets", href: "/collection/women" },
      { label: "Accessories", href: "/collection/women" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Our atelier", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Care & FAQ", href: "/care" },
      { label: "Contact us", href: "/contact" },
      { label: "Shipping & returns", href: "/care" },
    ],
  },
];

export const categories = ["All", "Jackets", "Bags", "Belts", "Wallets", "Accessories"] as const;

export type CategoryFilter = (typeof categories)[number];

export function getFilteredProducts(gender: "Men" | "Women", filter: CategoryFilter): Product[] {
  const pool = products.filter((p) => p.gender === gender);
  if (filter === "All") return pool;
  return pool.filter((p) => p.category === filter);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

export const products: Product[] = [
  ...newProducts,
];
