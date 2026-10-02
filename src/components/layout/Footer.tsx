import Link from "next/link";
import { footerSections } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#2A1507]">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 mb-12">
          {/* Logo + description */}
          <div className="md:w-1/3">
            <Link href="/" className="inline-block">
              <img src="/Logo/1 (1).png" alt="Zyrocrafts" className="h-14 w-auto" />
            </Link>
            <p className="mt-4 text-[#E5DBCA] max-w-sm text-sm leading-relaxed">
              Full-grain leather garments, cut and stitched by hand in a single atelier in Sialkot. Built to be repaired, not replaced.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-display text-sm font-semibold text-[#E5DBCA] mb-4 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#E5DBCA] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E5DBCA]/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#E5DBCA]">
            &copy; 2026 Zyrocrafts. All copyrights reserved by{" "}
            <a href="https://www.primedotstudio.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              primedotstudio.com
            </a>
          </p>
          <p className="text-xs text-[#E5DBCA]">Sialkot, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
