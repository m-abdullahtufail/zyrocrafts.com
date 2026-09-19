import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ContentWrapper } from "@/components/layout/ContentWrapper";

export const metadata: Metadata = {
  title: "Zyrocrafts — Full-Grain Leather Garments",
  description:
    "Hand-cut and saddle-stitched leather garments from a single atelier in Sialkot. Built to be repaired, not replaced.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-cream text-ink" suppressHydrationWarning>
        <CartProvider>
          <Nav />
          <CartDrawer />
          <ContentWrapper>{children}</ContentWrapper>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
