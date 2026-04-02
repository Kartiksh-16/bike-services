import React, { useState, useEffect } from "react";

export default function BookingForm({ show, onClose }) {

  // "left" = hidden left | "open" = visible | "right" = hidden right
  const [status, setStatus] = useState("left");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);          // DOM mein aao
      setStatus("left");         // silently left pe snap (no transition)

      // ✅ 2 frames baad transition start karo — taaki snap pehle ho
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStatus("open");     // left se right aao (transition ke saath)
        });
      });
    }
  }, [show]);

  const handleClose = () => {
    setStatus("right");          // right bahar jao (transition ke saath) ✅
    setTimeout(() => {
      onClose();                 // parent ko batao
      setMounted(false);         // DOM se hatao (koi snap nahi dikhta) ✅
    }, 500);
  };

  if (!mounted) return null;     // sirf tab render karo jab zaroor ho

  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500
          ${status === "open" ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full md:w-1/2 bg-silver/80 text-dark shadow-lg
          ease-in-out duration-500
          ${status === "left"
            ? "-translate-x-[100vw]"              // left hidden — no transition
            : status === "open"
            ? "translate-x-0 transition-transform" // right pe aa gaya ✅
            : "translate-x-[100vw] transition-transform"} // right bahar ✅
        `}
      >
        <div className="p-6">
          <button onClick={handleClose}
            className="absolute top-4 right-4 text-dark font-bold text-xl cursor-pointer">
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Book Service</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-m font-bold mb-1 text-left">Name</label>
              <input type="text"
                className="w-full p-2 rounded border bg-white border-black-300"
                placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-m font-bold mb-1 text-left">Phone</label>
              <input type="tel"
                className="w-full p-2 rounded border bg-white border-black-300"
                placeholder="Enter your phone number" />
            </div>
            <div>
              <label className="block text-m font-bold mb-1 text-left">Preferred Date</label>
              <input type="date"
                className="w-full p-2 rounded border bg-white border-black-300" />
            </div>
            <div>
              <label className="block text-m font-bold mb-1 text-left">Notes</label>
              <textarea
                className="w-full p-2 rounded border bg-white border-black-300"
                placeholder="Any special requests?"  />
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleClose}
                className="bg-dark text-cream px-4 py-2 rounded cursor-pointer">
                Cancel
              </button>
              <button type="submit"
                className="bg-steel text-cream px-4 py-2 rounded cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}