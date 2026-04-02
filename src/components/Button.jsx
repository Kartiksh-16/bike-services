import React, { useState } from "react";
import BookingForm from "./BookingForm";

export default function Button({ label }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className="bg-steel text-cream px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors"
        onClick={() => setShowForm(true)}
      >
        {label}
      </button>

      {/* Form Modal */}
      <BookingForm show={showForm} onClose={() => setShowForm(false)} />
    </>
  );
}
