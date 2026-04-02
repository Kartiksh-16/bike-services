import React from "react";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";
import Stats from "../components/StatsInfo";
import { Wrench, ShieldCheck, Settings2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Subscription from "../components/Subscription";
import FAQ from "@/components/FAQ";

// import path from "path";
// import path from "path-browserify";

const services = [
  {
    title: "Oil Change",
    description: "Synthetic & conventional oil service",
    price: "₹799+",
    time: "30 min",
    path: "/services/oil-change",
  },
  {
    title: "Tire Service",
    description: "Rotation, balancing & replacement",
    price: "₹499+",
    time: "45 min",
    path: "/services/tire-services",
  },
  {
    title: "Engine Repair",
    description: "Diagnostics, rebuild & overhaul",
    price: "₹2,999+",
    time: "2–4 hrs",
    path: "/services/engine-repair",
  },
  {
    title: "Spare Parts",
    description: "Advanced OBD & computer scanning",
    price: "₹399+",
    time: "20 min",
    path: "/services/spare-parts",
  },
  {
    title: "Accidental Repair",
    description: "Dent removal, paint & panel repair",
    price: "₹1,499+",
    time: "1–3 hrs",
    path: "/services/accidental-repair",
  },
  {
    title: "RSA Services",
    description: "Recharge, leak detection & repair",
    price: "₹999+",
    time: "1 hr",
    path: "/services/ras-service-page",
  },
];

export default function Services() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "2,500+", label: "Happy Customers" },
    { number: "25+", label: "Expert Mechanics" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="bg-dark min-h-screen text-cream font-sans py-8">
      <div className="max-w-4xl mx-auto text-center py-15">
        <h2 className="text-xl text-steel tracking-widest font-bold mb-2">
          PROFESSIONAL AUTO CARE
        </h2>
        <h2 className="text-4xl text-cream font-bold mb-2">All Our Services</h2>
        <p className="text-silver mb-8">
          From oil changes to full engine rebuilds — we handle everything your
          car needs.
        </p>
        <Button label="Book an Appointment" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <Link key={index} to={service.path}>
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              time={service.time}
            />
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-silver pb-10">Not sure? Get a free inspection.</p>
      </div>
      <div className="bg-dark py-14 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <Stats key={i} number={s.number} label={s.label} />
          ))}
        </div>
      </div>

      <Subscription className="max-w-full" />

      <div>
        <section id="faq" className="px-8 py-20">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </section>
        <div className=" flex justify-center bg-cream pb-8">
          <Button label="Book Now" />
        </div>
      </div>
    </div>
  );
}
