export default function Careers() {
  const jobs = [
    { title: "Service Advisor", location: "Jaipur", desc: "Guide customers through service options & bookings." },
    { title: "Mechanic Apprentice", location: "Jaipur", desc: "Learn from experts while assisting in repairs." },
    { title: "Marketing Executive", location: "Remote", desc: "Promote our services across digital platforms." },
  ];

  return (
    <section className="bg-cream min-h-screen text-dark font-sans px-8 py-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-steel text-xl font-bold uppercase tracking-widest mb-3">Careers</h2>
        <h1 className="text-4xl font-bold">Join Our Team</h1>
        <p className="text-dark/70 mt-3">We’re always looking for passionate people to grow with us.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {jobs.map((j, i) => (
          <div key={i} className="bg-silver text-dark rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">{j.title}</h3>
            <p className="text-steel font-semibold">{j.location}</p>
            <p className="text-sm mt-3">{j.desc}</p>
            <button className="mt-4 bg-dark text-cream px-4 py-2 rounded-lg hover:bg-steel hover:text-dark transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
