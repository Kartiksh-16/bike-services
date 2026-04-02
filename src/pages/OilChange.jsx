import React from "react";
import { Link } from "react-router-dom";
import { ListChecks, IndianRupee } from "lucide-react";
import Button from "../components/Button";

export default function OilChange({
  title,
  desc,
  Service_time,
  Service_title,
  Starting_price,
  Price_title,
  Time_tile,
  Inspection,
  showdetail = true, // default true
}) {
  return (
    <>
      {/* Section 1: Header + Quick Info */}
      <section className="bg-dark text-cream font-sans px-8 pt-24 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/services"
              className="text-silver text-sm hover:text-cream transition-colors"
            >
              ← Back to Services
            </Link>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-bold mb-4">
            {title ? title : "Oil Change"}
          </h1>
          <p className="text-silver mb-8">
            {desc
            ? desc
            : "Keep your engine running smooth with fresh engine & gear oil replacement."}
          </p>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-center">
            <div>
              <p className="text-cream text-2xl font-bold">
                {Service_time ? Service_time : "20 min"}
              </p>
              <p className="text-silver text-sm">
                {Service_title ? Service_title : "Service Time"}
              </p>
            </div>
            <div>
              <p className="text-cream text-2xl font-bold">
                {Starting_price ? Starting_price : "₹299+"}
              </p>
              <p className="text-silver text-sm">
                {Price_title ? Price_title : "Starting Price"}
              </p>
            </div>
            <div>
              <p className="text-cream text-2xl font-bold">
                {Inspection ? Inspection : "Free"}
              </p>
              <p className="text-silver text-sm">
                {Time_tile ? Time_tile : "Inspection"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Details (optional) */}
      {showdetail && (
      <section className=" flex pt-10 pb-10">
          <div className="max-w-4xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* What's Included */}
              <div className="bg-silver text-dark rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks size={22} className="text-steel" />
                  <h2 className="text-xl font-bold">What’s Included</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Engine oil replacement</li>
                  <li>Gear oil top-up</li>
                  <li>Oil filter change</li>
                  <li>Free bike checkup</li>
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-silver text-dark rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee size={22} className="text-steel" />
                  <h2 className="text-xl font-bold">Pricing</h2>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>Engine Oil (Standard) — ₹299</li>
                  <li>Engine Oil (Premium) — ₹499</li>
                  <li>Engine + Gear Oil — ₹699</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button label="Book Oil Change →" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}


