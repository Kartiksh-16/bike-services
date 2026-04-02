import React, { useState, useEffect, useRef } from "react";

export default function Stats({ number, label }) {
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const suffix = number.replace(/[0-9,]/g, "");

  const [count, setCount] = useState(0);
  const ref = useRef(null); // ✅ element ko track karne ke liye

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { // ✅ jab screen pe aaye tabhi andar ka code chale
          const timer = setInterval(() => {
            setCount((prev) => {
              if (prev >= numericValue) {
                clearInterval(timer);
                return numericValue;
              }
              return prev + Math.ceil(numericValue / 100);
            });
          }, 20);

          observer.disconnect(); // ✅ ek baar chalne ke baad observer band karo
        }
      },
      { threshold: 0.5 } // ✅ 50% visible hone pe trigger hoga
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-center" ref={ref}> {/* ✅ ref yahan lagao */}
      <p className="text-cream text-4xl font-black">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-silver text-sm mt-1">{label}</p>
    </div>
  );
}