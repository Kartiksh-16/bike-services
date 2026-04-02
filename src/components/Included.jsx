import React from "react";
import { ListChecks } from "lucide-react";

export default function Included() {
  const items = [
    "Full engine diagnostics",
    "Piston & valve check",
    "Engine tuning & calibration",
    "Worn part replacement",
    "Post repair test ride",
  ];

  return (
    <div className="bg-silver text-dark rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks size={22} className="text-steel" />
        <h2 className="text-xl font-bold">What’s Included</h2>
      </div>
      <ul className="list-disc list-inside space-y-2 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
