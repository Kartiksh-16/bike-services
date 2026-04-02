import React from "react";

export default function ServiceCard({ title, description, price, time }) {
  return (
    <div className="bg-silver text-dark rounded-lg p-6 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-2">{description}</p>
      <p className="text-steel font-semibold">{price} • {time}</p>
    </div>
  );
} 


