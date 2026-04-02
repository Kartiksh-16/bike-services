import { useState } from "react";
import { X } from "lucide-react";
// import oilChange from "../assets/Quik_oil_change_in_bike.webp";

const categories = ["All", "Oil Change", "Engine Repair", "Spare Parts", "Custom Builds"];

const galleryItems = [
  { id: 1, category: "Oil Change",    label: "Quick Oil Change",     src: "./Quik _oil_ change _in_bike.webp" },
  { id: 2, category: "Engine Repair", label: "Engine Overhaul",      src: "./Engine Overhaul.webp" },
  { id: 3, category: "Spare Parts",   label: "New Clutch & Gearbox", src: "./New Clutch & Gearbox.jpg" },
  { id: 4, category: "Custom Builds", label: "Performance Upgrade",  src: "./Performance Upgrade.webp" },
  { id: 5, category: "Oil Change",    label: "Filter Replacement",   src: "./Oil-Filter.avif" },
  { id: 6, category: "Engine Repair", label: "Carburettor Cleaning", src: "./Carburettor Cleaning.webp" },
  { id: 7, category: "Spare Parts",   label: "Chain Replacement",    src: "./Chain Replacement.png" },
  { id: 8, category: "Custom Builds", label: "Custom Exhaust Fit",   src: "./Custom exhaust.webp" },
  { id: 9, category: "Oil Change",    label: "Full Service Package", src: "./Full Service Package.avif" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-cream font-sans">

      {/* Hero Banner */}
      <section className="bg-dark py-20 px-6 text-center">
        <p className="text-silver text-xs font-bold uppercase tracking-widest mb-3">
          Our Work
        </p>
        <h1 className="text-cream text-5xl font-black mb-4">
          Service <span className="text-steel">Gallery</span>
        </h1>
        <p className="text-silver text-base max-w-lg mx-auto leading-relaxed">
          A look at some of our finest work — from routine oil changes to full custom builds.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 px-6">
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer
                ${activeCategory === cat
                  ? "bg-dark text-cream border-dark"
                  : "bg-white text-dark border-silver hover:border-steel hover:text-steel"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className="rounded-2xl h-56 overflow-hidden relative cursor-pointer group border border-silver/30 hover:border-steel transition-all duration-200"
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Label overlay — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <div className="bg-dark/70 rounded-xl px-4 py-2 text-center">
                  <p className="text-cream text-sm font-semibold">{item.label}</p>
                  <p className="text-silver text-xs">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-center text-dark/40 text-sm mt-10">No items found.</p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-dark/80 z-50 flex items-center justify-center px-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="rounded-2xl w-full max-w-lg overflow-hidden relative border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="w-full h-80 object-cover"
            />

            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark/60 flex items-center justify-center text-cream hover:bg-dark transition-colors cursor-pointer border-0"
            >
              <X size={16} />
            </button>

            {/* Info bar */}
            <div className="bg-dark px-6 py-4 text-center">
              <p className="text-cream text-base font-bold">{lightbox.label}</p>
              <p className="text-silver text-sm">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}