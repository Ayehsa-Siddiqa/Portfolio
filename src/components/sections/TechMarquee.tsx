import { portfolioData } from "@/data/portfolio";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Duplicate the list so the -50% translate loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden marquee-mask">
      <div className={`flex shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm sm:text-base font-medium text-gray-300 whitespace-nowrap"
          >
            <span className="text-violet-400 mr-2">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const items = portfolioData.marquee;
  const half = Math.ceil(items.length / 2);
  return (
    <section aria-label="Technologies" className="section-y overflow-hidden">
      <div className="space-y-3 -rotate-1">
        <Row items={items.slice(0, half)} />
        <Row items={items.slice(half)} reverse />
      </div>
    </section>
  );
}
