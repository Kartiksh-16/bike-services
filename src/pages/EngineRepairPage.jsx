import React from "react";
import OilChange from "./OilChange";  // reuse header
import HowItWorks from "@/components/HowItWorks"; // reuse your HowItWorks.jsx
import Included from "@/components/Included";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Button from "../components/Button";

export default function EngineRepairPage() {
  const engineRepairFAQs = [
    { q: "How long does repair take?", a: "Depends on damage, usually 2–5 days." },
    { q: "Is insurance claim possible?", a: "Yes, we assist with insurance paperwork for accidental claims." },
    { q: "Do you provide warranty on repair?", a: "Yes, warranty is provided on paint & parts replaced." },
  ];

  return (
    <div className="bg-dark min-h-screen text-cream font-sans">
      {/* Reuse OilChange header with props */}
      <OilChange
        title="Engine Repair Services"
        desc="Complete engine diagnostics, tuning & full overhaul by certified mechanics."
        Service_time="2–4 hrs"
        Service_title="Service Time"
        Starting_price="₹1,999+"
        Price_title="Starting Price"
        Inspection="30 Day"
        Time_tile="Warranty"
        showdetail={false}   // disable OilChange's default details section
      />

      {/* How It Works (your existing component) */}
      <HowItWorks />

      {/* Side-by-side sections */}
      <section className="px-8 py-14">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
          <Included />
          <Pricing />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button label="Book Engine Repair →" />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={engineRepairFAQs} />
    </div>
  );
}
