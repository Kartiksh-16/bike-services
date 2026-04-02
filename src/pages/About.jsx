import { Wrench, Users, ShieldCheck, Clock } from "lucide-react";
import Button from "../components/Button";
// import Card from "../components/Card";
import Our_services from "../components/Our_services";
import ServicesSection from "../components/Our_services";
import HowItWork from "../components/HowItWorks";
import CardHoverEffectDemo, { projects } from "../components/card-hover-effect-demo";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "8,500+", label: "Happy Customers" },
  { number: "25+", label: "Expert Mechanics" },
  { number: "99%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: <Wrench size={20} className="text-steel" />, 
    title: "Quality Repairs",
    desc: "We use genuine parts and follow manufacturer standards on every job.",
  },
  {
    icon: <ShieldCheck size={20} className="text-steel" />,
    title: "Trusted Service",
    desc: "Transparent pricing with no hidden charges. Ever.",
  },
  {
    icon: <Users size={20} className="text-steel" />,
    title: "Expert Team",
    desc: "All our mechanics are certified and trained on the latest bike models.",
  },
  {
    icon: <Clock size={20} className="text-steel" />,
    title: "On-Time Delivery",
    desc: "We respect your time. Most services are done same day.",
  },
];

const team = [
  { initials: "RV", name: "Rajan Verma", role: "Head Mechanic" },
  { initials: "AS", name: "Amit Sharma", role: "Engine Specialist" },
  { initials: "PK", name: "Pooja Kaur", role: "Customer Manager" },
];

const services = [
  {
    title: "Bike Repair",
    description: "Engine, brakes, and tyres repairs.",
  },
  {
    title: "Full Service",
    description: "Oil change and full inspection.",
  },
  {
    title: "Custom Builds",
    description: "Performance and style upgrades.",
  },
];

export default function About() {
  return (
    <div className="bg-cream font-sans">

      {/* Hero Banner */}
      <section className="bg-dark py-20 px-6 text-center">
        <p className="text-silver text-[14px] font-bold uppercase tracking-widest mt-8 mb-2">
          Who We Are
        </p>
        <h1 className="text-cream text-5xl font-black mb-4">
          About <span className="text-steel">Us</span>
        </h1>
        <p className="text-silver text-base max-w-xl mx-auto leading-relaxed">
          We are a passionate team of bike enthusiasts and certified mechanics dedicated to keeping your ride in peak condition.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-18">

        {/* Image placeholder */}
        <div className="flex-1 w-full h-72 bg-dark/10 rounded-2xl overflow-hidden">
          <img
            src="/about_hero_img.jpg"
            alt="Our garage"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-steel text-xs font-bold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h2 className="text-dark text-3xl font-black mb-4 leading-snug">
            Started with a passion for bikes
          </h2>
          <p className="text-dark/70 text-sm leading-relaxed mb-4">
            Founded in 2014, Bike Services began as a small garage in Jaipur with just two mechanics and a dream to provide honest, high-quality bike care to every rider.
          </p>
          <p className="text-dark/70 text-sm leading-relaxed mb-6">
            Today, we've grown into a full-service center trusted by thousands of customers across the city — but our values remain the same: quality work, fair prices, and respect for every customer.
          </p>
          <Button label="Book a Service" />
        </div>

      </section>

      {/* Stats */}
      <section className="bg-dark py-14 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-cream text-4xl font-black">{s.number}</p>
              <p className="text-silver text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <CardHoverEffectDemo items={projects} />

      {/* Our Values */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-steel text-xs font-bold uppercase tracking-widest mb-3">
            What We Stand For
          </p>
          <h2 className="text-dark text-3xl font-black">Our values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white border border-silver/40 rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-steel/10 rounded-xl flex items-center justify-center">
                {v.icon}
              </div>
              <div>
                <p className="text-dark font-bold text-sm mb-1">{v.title}</p>
                <p className="text-dark/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}