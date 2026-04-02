import { Wrench, ShieldCheck, Settings2 } from "lucide-react";

const services = [
  {
    icon: <Wrench size={24} className="text-steel" />,
    title: "Bike Repair",
    description: "Engine, brakes, and tyres repairs.",
  },
  {
    icon: <ShieldCheck size={24} className="text-steel" />,
    title: "Full Service",
    description: "Oil change and full inspection.",
  },
  {
    icon: <Settings2 size={24} className="text-steel" />,
    title: "Custom Builds",
    description: "Performance and style upgrades.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-dark py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-cream text-5xl font-semibold">Our Services</h1>
      </div>

      {/* Ye wala div teeno sections ko inline rakhega */}
      <div className="flex flex-row justify-center gap-6 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="flex-1 bg-dark/30 border border-silver/30 rounded-xl p-6 min-w-[250px]">
            <div className="w-12 h-12 bg-cream/70 rounded-xl flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-cream text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-silver text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}