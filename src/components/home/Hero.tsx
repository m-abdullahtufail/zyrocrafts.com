"use client";

import { useEffect, useRef } from "react";
import "./HeroRonin.css";

type Spec = { label: string; value: string };

type HeroProps = {
  backgroundSrc?: string;
  revealSrc?: string;
  titleLines?: string[];
  copy?: string;
  specs?: Spec[];
};

function getRadius() {
  if (typeof window === "undefined") return 260;
  const w = window.innerWidth;
  return w < 480 ? 120 : w < 720 ? 160 : 260;
}

const DEFAULT_SPECS: Spec[] = [
  { label: "Leather", value: "Full-Grain Veg-Tan" },
  { label: "Stitch", value: "Hand Saddle-Stitched" },
  { label: "Hardware", value: "Solid Brass YKK" },
  { label: "Fit", value: "Tailored Biker Cut" },
];

export function Hero({
  backgroundSrc = "/ronin-background.png",
  revealSrc = "/ronin-reveal.png",
  titleLines = ["Where Luxury", "Meets Authentic", "Craftsmanship"],
  copy = "Full-grain leather, vegetable-tanned and saddle-stitched by hand — jackets, bags and small goods built to inherit, not to replace.",
  specs = DEFAULT_SPECS,
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // 1. Spotlight reveal (cursor / touch)
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    function onMove(e: MouseEvent | TouchEvent) {
      const rect = el!.getBoundingClientRect();
      let x: number;
      let y: number;
      if ("touches" in e && e.touches.length) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        const m = e as MouseEvent;
        x = m.clientX - rect.left;
        y = m.clientY - rect.top;
      }
      const r = getRadius();
      const grad =
        "radial-gradient(circle " +
        r +
        "px at " +
        x +
        "px " +
        y +
        "px, #fff 0%, #fff 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)";
      el!.style.webkitMaskImage = grad;
      el!.style.maskImage = grad;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  // 2. Word split + scroll reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll(".words-pull-up").forEach((el) => {
      const node = el as HTMLElement;
      if (node.dataset.split) return;
      node.dataset.split = "1";
      if (node.tagName === "H1") {
        const lines = node.querySelectorAll(":scope > span");
        let wordIdx = 0;
        lines.forEach((span) => {
          span.classList.add("pull-line");
          const words = (span.textContent || "").trim().split(/\s+/);
          span.innerHTML = "";
          words.forEach((w, i) => {
            const s = document.createElement("span");
            s.className = "pull-word";
            s.textContent = w;
            s.style.animationDelay = wordIdx * 0.1 + "s";
            span.appendChild(s);
            if (i < words.length - 1)
              span.appendChild(document.createTextNode(" "));
            wordIdx++;
          });
        });
      } else {
        const words = (node.textContent || "").trim().split(/\s+/);
        node.innerHTML = "";
        words.forEach((w, i) => {
          const s = document.createElement("span");
          s.className = "pull-word";
          s.textContent = w;
          s.style.animationDelay = i * 0.1 + "s";
          node.appendChild(s);
          if (i < words.length - 1)
            node.appendChild(document.createTextNode(" "));
        });
      }
    });

    if (!("IntersectionObserver" in window)) {
      root
        .querySelectorAll(".words-pull-up")
        .forEach((el) => el.classList.add("words-visible"));
      root.querySelectorAll(".fade-up-reveal").forEach((el) => {
        const n = el as HTMLElement;
        const d = n.getAttribute("data-delay");
        if (d) n.style.animationDelay = d + "s";
        n.classList.add("is-visible");
      });
      return;
    }

    const wordsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("words-visible");
            wordsObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    root.querySelectorAll(".words-pull-up").forEach((el) => wordsObs.observe(el));

    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const n = entry.target as HTMLElement;
            const d = n.getAttribute("data-delay");
            if (d) n.style.animationDelay = d + "s";
            n.classList.add("is-visible");
            fadeObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".fade-up-reveal").forEach((el) => fadeObs.observe(el));

    return () => {
      wordsObs.disconnect();
      fadeObs.disconnect();
    };
  }, []);

  return (
    <main className="hero" ref={rootRef}>
      <div
        className="hero-base-img hero-image-animate"
        style={{ backgroundImage: `url('${backgroundSrc}')` }}
      />
      <div
        ref={revealRef}
        className="hero-reveal-img"
        id="reveal-img"
        style={{ backgroundImage: `url('${revealSrc}')` }}
      />

      <div className="hero-ui">
        <div className="hero-left">
          <div className="hero-copy">
            <h1 className="words-pull-up">
              {titleLines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
            <p className="fade-up-reveal" data-delay="0.5">
              {copy}
            </p>
            <div className="icon-row fade-up-reveal" data-delay="0.65">
              <button className="icon-btn" aria-label="Main core">
                <svg viewBox="0 0 16 16">
                  <path d="M8 1.4L13.8 4.7V11.3L8 14.6L2.2 11.3V4.7L8 1.4Z" />
                  <circle cx="8" cy="8" r="1.35" fill="currentColor" stroke="none" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="Vision">
                <svg viewBox="0 0 16 16">
                  <path d="M2 5.2V2h3.2" strokeLinecap="round" />
                  <path d="M14 5.2V2h-3.2" strokeLinecap="round" />
                  <path d="M2 10.8V14h3.2" strokeLinecap="round" />
                  <path d="M14 10.8V14h-3.2" strokeLinecap="round" />
                  <rect x="5.2" y="5.2" width="5.6" height="5.6" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="Force">
                <svg viewBox="0 0 16 16">
                  <path
                    d="M9.2 1.6L4 9.1h3.5L6.8 14.4 12 6.9H8.5L9.2 1.6Z"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="specs">
          <h3 className="words-pull-up">Jacket Specs</h3>
          {specs.map((s, i) => (
            <div
              key={s.label}
              className="spec-row fade-up-reveal"
              data-delay={(1.2 + i * 0.1).toFixed(1)}
            >
              <span className="spec-label">{s.label}</span>
              <span className="spec-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
