// import React, { useState } from "react";
// import BookingForm from "./BookingForm";

// export default function Button({ label }) {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <>
//       <button
//         className="bg-steel text-cream px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors"
//         onClick={() => setShowForm(true)}
//       >
//         {label}
//       </button>

//       {/* Form Modal */}
//       <BookingForm show={showForm} onClose={() => setShowForm(false)} />
//     </>
//   );
// }












// Second transition 

import { useState } from "react";
import BookingForm from "./BookingForm";

export default function Button({ label = "Book Now", onClick, style = {} }) {
  const [showForm, setShowForm] = useState(false);
  const [hovered, setHovered]  = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    else setShowForm(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "linear-gradient(135deg, #1A4A7A 0%, #2A6FA8 100%)",
          color: "#F0EBE0",
          border: "1px solid rgba(42,111,168,0.4)",
          padding: "8px 20px",
          borderRadius: "10px",
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.03em",
          cursor: "pointer",
          fontFamily: "var(--font-sans, 'Geist Variable', sans-serif)",
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
          boxShadow: hovered
            ? "0 0 32px rgba(42,111,168,0.65), 0 4px 20px rgba(0,0,0,0.3)"
            : "0 0 16px rgba(42,111,168,0.25), 0 2px 8px rgba(0,0,0,0.2)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {label}
      </button>

      <BookingForm show={showForm} onClose={() => setShowForm(false)} />
    </>
  );
}