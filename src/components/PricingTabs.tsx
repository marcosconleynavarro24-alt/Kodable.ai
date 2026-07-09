"use client";

import { useState } from "react";
import Link from "next/link";
import type { ServicePricing } from "@/content/pricing";
import PriceGroupList from "./PriceGroupList";

export interface PricingTab {
  key: string;
  label: string;
  pricing: ServicePricing;
}

// Tab switcher for the combined /pricing page — flips between the websites
// and AI-agents price tables without leaving the page.
export default function PricingTabs({
  tabs,
  contactHref,
}: {
  tabs: PricingTab[];
  contactHref: string;
}) {
  const [active, setActive] = useState(tabs[0].key);

  // Every panel is server-rendered and stays in the DOM (inactive ones get the
  // `hidden` attribute) so all prices are crawlable in the initial HTML —
  // don't switch this to conditional rendering.
  return (
    <div>
      <div
        role="tablist"
        style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`price-tab-${t.key}`}
            aria-selected={t.key === active}
            aria-controls={`price-panel-${t.key}`}
            className={t.key === active ? "btn btn-primary" : "btn btn-ghost"}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`price-panel-${t.key}`}
          aria-labelledby={`price-tab-${t.key}`}
          hidden={t.key !== active}
        >
          <p className="sec-lead" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 28px" }}>
            {t.pricing.lead}
          </p>

          <PriceGroupList groups={t.pricing.groups} contactHref={contactHref} />

          <p className="price-foot price-disclaimer">
            {t.pricing.disclaimer} <Link href={contactHref}>{t.pricing.cta}</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
