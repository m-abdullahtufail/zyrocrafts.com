export interface Product {
  slug: string;
  name: string;
  gender: "Men" | "Women";
  category: "Jackets" | "Bags" | "Belts" | "Wallets" | "Accessories";
  price: number;
  description: string;
  kicker: string;
  details: string[];
  materials: string;
  shipping: string;
  sizes?: string[];
  relatedProducts: string[];
  images?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
