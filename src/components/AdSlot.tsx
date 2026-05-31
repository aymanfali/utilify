type Size = "banner" | "mobileBanner" | "skyscraper" | "square";

const sizes: Record<Size, { w: number; h: number; label: string }> = {
  banner: { w: 728, h: 90, label: "728 × 90" },
  mobileBanner: { w: 320, h: 100, label: "320 × 100" },
  skyscraper: { w: 300, h: 600, label: "300 × 600" },
  square: { w: 300, h: 250, label: "300 × 250" },
};

export function AdSlot({ size, className = "" }: { size: Size; className?: string }) {
  const s = sizes[size];
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-muted-foreground ${className}`}
      style={{ width: s.w, height: s.h, maxWidth: "100%" }}
      aria-label="Sponsored Advertisement"
    >
      <span className="text-[10px] uppercase tracking-widest opacity-60">Sponsored Advertisement</span>
      <span className="mt-1 text-xs font-mono opacity-50">{s.label}</span>
    </div>
  );
}

export function ResponsiveBannerAd() {
  return (
    <>
      <div className="hidden md:flex justify-center"><AdSlot size="banner" /></div>
      <div className="flex md:hidden justify-center"><AdSlot size="mobileBanner" /></div>
    </>
  );
}
