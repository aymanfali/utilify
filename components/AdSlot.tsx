"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Size = "banner" | "mobileBanner" | "skyscraper" | "square";

const adSlots: Record<Size, string> = {
  banner: "YOUR_BANNER_SLOT_ID",
  mobileBanner: "YOUR_MOBILE_SLOT_ID",
  skyscraper: "YOUR_SKYSCRAPER_SLOT_ID",
  square: "YOUR_SQUARE_SLOT_ID",
};

export function AdSlot({
  size,
  className = "",
}: {
  size: Size;
  className?: string;
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-5549712635720663"
      data-ad-slot={adSlots[size]}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export function ResponsiveBannerAd() {
  return (
    <>
      <div className="hidden md:block">
        <AdSlot size="banner" />
      </div>

      <div className="block md:hidden">
        <AdSlot size="mobileBanner" />
      </div>
    </>
  );
}
