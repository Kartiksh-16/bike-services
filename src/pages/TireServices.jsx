import React from "react";
import OilChange from "./OilChange";  // reuse header
import HowItWorks from "@/components/HowItWorks"; // reuse your HowItWorks.jsx
import Included from "@/components/Included";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Button from "@/components/Button";

export default function TireServices() {
  const tireFAQs = [
    { q: "How often should I replace tires?", a: "Typically every 40,000–50,000 km, or when tread depth is below 1.6mm." },
    { q: "Do you provide wheel balancing?", a: "Yes, balancing and alignment are included with tire replacement." },
    { q: "Can I choose different brands?", a: "Absolutely, we stock multiple premium and budget tire brands." },
  ];

  return (
    <div className="bg-dark min-h-screen text-cream font-sans">
      {/* Header reused from OilChange */}
      <OilChange
        title="Tire Services"
        desc="Complete tire replacement, rotation, balancing & alignment for safe rides."
        Service_time="45 min"
        Service_title="Service Time"
        Starting_price="₹999+"
        Price_title="Starting Price"
        Inspection="Free"
        Time_tile="Checkup"
        showdetail={false}
      />

      {/* How It Works */}
      <HowItWorks />

      {/* Side-by-side sections */}
      <section className="px-8 py-14">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
          {/* What's Included */}
          <Included
            items={[
              "Tire replacement (all brands)",
              "Wheel balancing",
              "Wheel alignment",
              "Tire rotation",
              "Free safety inspection",
            ]}
          />

          {/* Pricing */}
          <Pricing
            plans={[
              "Standard Tire Replacement — ₹999/tire",
              "Premium Tire Replacement — ₹1,999/tire",
              "Balancing + Alignment — ₹499",
              "Full Set Replacement (4 tires) — ₹3,999+",
            ]}
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button label="Book Tire Service →" />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={tireFAQs} />
    </div>
  );
}
