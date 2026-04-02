import { ListChecks } from "lucide-react";

export default function CoverageList() {
  const items = [
    "Towing service",
    "On-site minor repair",
    "Flat tyre fix",
    "Battery jump start",
    "Fuel delivery",
  ];

  return (
    <div className="bg-silver text-dark rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks size={22} className="text-steel" />
        <h2 className="text-xl font-bold">What We Cover</h2>
      </div>
      <ul className="list-disc list-inside space-y-2 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
