const steps = [
  {
    number: "1",
    title: "Book Online", 
    desc: "Choose your service and pick a date that works for you",
  },
  {
    number: "2",
    title: "Drop Off Your Bike",
    desc: "Bring your bike to our service center at your scheduled time",
  },
  {
    number: "3",
    title: "We Service It",
    desc: "Our certified mechanics handle everything with care",
  },
  {
    number: "4",
    title: "Pick It Up",
    desc: "Collect your bike — fully serviced and good as new",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-steel text-xl font-bold uppercase tracking-widest mb-3">
          Simple Process
        </p>
        <h2 className="text-dark text-5xl font-black">How it works</h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative p-8 rounded-2xl bg-dark border border-white/10 backdrop-blur-sm hover:border-steel transition-all duration-300 group"
          >
            {/* Number Badge */}
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-steel text-dark flex items-center justify-center font-black text-xl shadow-lg rotate-0 group-hover:rotate-5 transition-transform">
              {step.number}
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-cream text-2xl font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-silver font-semibold text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* Optional: Line logic for Desktop */}
            {index % 2 === 0 && (
              <div className="hidden md:block absolute top-1/2 -right-10 w-8 h-px bg-silver/20" />
            )}

            {/* Text */}
            <div>
              <p className="text-dark text-base font-bold mb-1">{step.title}</p>
              {/* <p className="text-steel text-sm leading-relaxed">{step.desc}</p> */}
            </div>
          </div>
        ))}
      </div>

     
    </section>
  );
}
