import React from "react";
import { IndianRupee } from "lucide-react";

export default function Pricing() {
  const plans = [
    "Basic Tuning — ₹1,999",
    "Top Overhaul — ₹3,999",
    "Full Engine Rebuild — ₹7,999+",
  ];

  return (
    <div className="bg-silver text-dark rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <IndianRupee size={22} className="text-steel" />
        <h2 className="text-xl font-bold">Pricing</h2>
      </div>
      <ul className="space-y-2 text-sm">
        {plans.map((plan, idx) => (
          <li key={idx}>{plan}</li>
        ))}
      </ul>
    </div>
  );
}
