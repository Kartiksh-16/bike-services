export default function Team() {
  const members = [
    { name: "Rahul Sharma", role: "Lead Mechanic", desc: "10+ years of experience in bike & car engines." },
    { name: "Priya Mehta", role: "Customer Support", desc: "Ensures smooth booking & service experience." },
    { name: "Amit Verma", role: "RSA Specialist", desc: "Expert in roadside assistance & quick fixes." },
  ];

  return (
    <section className="bg-dark min-h-screen text-cream font-sans px-8 py-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-steel text-xl font-bold uppercase tracking-widest mb-3">Our Team</h2>
        <h1 className="text-4xl font-bold">Meet the Experts</h1>
        <p className="text-silver mt-3">Passionate professionals dedicated to keeping your ride safe & smooth.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {members.map((m, i) => (
          <div key={i} className="bg-silver text-dark rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">{m.name}</h3>
            <p className="text-steel font-semibold">{m.role}</p>
            <p className="text-sm mt-3">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
