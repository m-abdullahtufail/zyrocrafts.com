"use client";

import { useEffect, useRef } from "react";

export function StitchLine() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = `draw-stitch 2.5s ease-out forwards`;
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 20"
      className="w-full max-w-md h-5 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q25 2, 50 10 T100 10 T150 10 T200 10 T250 10 T300 10 T350 10 T400 10"
        stroke="#C08552"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="8 6"
      />
      <path
        d="M10 10 L18 10 M30 10 L38 10 M50 10 L58 10 M70 10 L78 10 M90 10 L98 10 M110 10 L118 10 M130 10 L138 10 M150 10 L158 10 M170 10 L178 10 M190 10 L198 10 M210 10 L218 10 M230 10 L238 10 M250 10 L258 10 M270 10 L278 10 M290 10 L298 10 M310 10 L318 10 M330 10 L338 10 M350 10 L358 10 M370 10 L378 10 M390 10 L398 10"
        stroke="#C08552"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
