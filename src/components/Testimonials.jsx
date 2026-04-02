import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    stars: 5,
    quote:
      "Got my Royal Enfield serviced here. The team was super professional, explained every issue clearly, and delivered on time. Best service center in the city.",
    initials: "RK",
    name: "Rahul K.",
    city: "Jaipur",
  },
  {
    stars: 5,
    quote:
      "Oil change done in under 30 minutes. Staff was friendly and didn't overcharge. I've been coming here for 2 years and I trust them completely.",
    initials: "PS",
    name: "Priya S.",
    city: "Jaipur",
  },
  {
    stars: 4,
    quote:
      "My bike had an engine issue and they diagnosed it accurately without any guesswork. Fixed it in one day. Will definitely recommend to friends.",
    initials: "AM",
    name: "Arjun M.",
    city: "Jaipur",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= count ? "text-yellow-500 text-lg" : "text-silver text-lg"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState("right");

  const goTo = (index, dir) => {
    if (!visible) return;
    setDirection(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 300);
  };

  const prev = () => goTo(current === 0 ? reviews.length - 1 : current - 1, "left");
  const next = () => goTo(current === reviews.length - 1 ? 0 : current + 1, "right");

  // Auto-play: move to next every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(interval);
  }, [current, visible]);

  const review = reviews[current];

  const cardClasses = `
    flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 min-h-64 mx-20
    transition-all duration-300 ease-in-out
    ${visible ? "opacity-100 translate-x-0" : direction === "right" ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}
  `;

  return (
    <section className="bg-dark py-16 px-6">

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-silver text-xs font-bold uppercase tracking-widest mb-3">
          What Riders Say
        </p>
        <h2 className="text-cream text-4xl font-black">Customer reviews</h2>
      </div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto">

        {/* Prev Button + Card + Next Button */}
        <div className="flex items-center gap-4">

          {/* Prev Button */}
          <button
            onClick={prev}
            className="w-10 h-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-silver hover:border-steel hover:text-cream transition-colors cursor-pointer bg-transparent"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Card */}
          <div className={cardClasses}>

            <Stars count={review.stars} />

            <p className="text-cream text-base leading-relaxed mb-6">
              "{review.quote}"
            </p>

            <div className="border-t border-white/10 mb-5" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-steel flex items-center justify-center shrink-0">
                <span className="text-cream text-xs font-bold">{review.initials}</span>
              </div>
              <div>
                <p className="text-cream text-sm font-semibold">{review.name}</p>
                <p className="text-silver text-xs">{review.city}</p>
              </div>
            </div>

          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="w-10 h-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-silver hover:border-steel hover:text-cream transition-colors cursor-pointer bg-transparent"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        {/* Dots — bottom center */}
        <div className="flex gap-2 items-center justify-center mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                i === current ? "bg-steel w-5" : "bg-white/20 w-2"
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}