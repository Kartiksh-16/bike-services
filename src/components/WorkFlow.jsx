import React from "react";

export default function WorkFlow() {
  const steps = [
    { title: "Drop your bike", desc: "Bring your bike to our garage anytime." },
    { title: "Damage Assessment", desc: "Our mechanic checks all damage & gives estimate." },
    { title: "Repair & Paint", desc: "Dent removal, part fix & color matching done." },
    { title: "Ready to Ride", desc: "Pick up your bike, good as new!" },
  ];

  return (
    <div className="bg-silver text-dark font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Work Flow</h2>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-400"></div>

          <ul className="space-y-8">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4 relative">
                {/* circle with number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark text-cream flex items-center justify-center font-bold z-10">
                  {i + 1}
                </div>
                {/* text */}
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-gray-700">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

