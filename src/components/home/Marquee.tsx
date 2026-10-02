export function Marquee() {
  const items = [
    "Full-grain vegetable-tanned leather",
    "Hand-cut & saddle-stitched",
    "Made in Sialkot",
    "Built to last a lifetime",
    "Ethically sourced hides",
    "No shortcuts, no compromises",
  ];

  return (
    <div className="bg-saddle/10 border-y border-saddle/20 overflow-hidden py-4 px-6 sm:px-11 lg:px-14">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-ink/70 tracking-wider uppercase">
            {item}
            <span className="ml-8 text-tan">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
