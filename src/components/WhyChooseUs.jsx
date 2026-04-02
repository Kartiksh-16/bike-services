import { Clock, Users, Wrench, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: <Clock size={22} className="text-silver" />,
    stat: "10+",
    desc: "Years of experience in professional bike servicing",
  },
  {
    icon: <Users size={22} className="text-silver" />,
    stat: "8,500+",
    desc: "Happy customers across the city",
  },
  {
    icon: <Wrench size={22} className="text-silver" />,
    stat: "25+",
    desc: "Expert certified mechanics on our team",
  },
  {
    icon: <CheckCircle size={22} className="text-silver" />,
    stat: "99%",
    desc: "Customer satisfaction rate, every time",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-dark py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-silver text-xl font-bold uppercase tracking-widest mb-3">
          Why Choose Us
        </p>
        <div className="text-cream font-black text-5xl">
            
          Trusted by <span className="text-steel">thousands</span> of riders
        
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          >
            {/* Icon Box */}
            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              {item.icon}
            </div>

            {/* Stat Number */}
            <p className="text-cream text-4xl font-black">{item.stat}</p>

            {/* Description */}
            <p className="text-silver text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
