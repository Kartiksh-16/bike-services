import React, { useState } from "react";

export default function FAQ() {
  const faqs = [
    { q: "How long does repair take?", a: "Depends on damage, usually 2–5 days." },
    { q: "Is insurance claim possible?", a: "Yes, we assist with insurance paperwork for accidental claims." },
    { q: "Do you provide warranty on repair?", a: "Yes, warranty is provided on paint & parts replaced." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-cream text-dark font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-gray-300 pb-2">
              {/* Question row */}
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center text-left font-semibold text-dark"
              >
                {f.q}
                <span className="text-xl font-bold">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>

              {/* Answer (only visible when open) */}
              {openIndex === i && (
                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
