export default function Blog() {
  const posts = [
    { title: "5 Tips for Better Mileage", date: "March 2026", desc: "Simple habits to improve your bike’s fuel efficiency." },
    { title: "Why Regular Oil Change Matters", date: "Feb 2026", desc: "Keep your engine healthy with timely oil changes." },
    { title: "RSA Services Explained", date: "Jan 2026", desc: "How roadside assistance can save your day." },
  ];

  return (
    <section className="bg-dark min-h-screen text-cream font-sans px-8 py-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-steel text-xl font-bold uppercase tracking-widest mb-3">Blog</h2>
        <h1 className="text-4xl font-bold">Latest Articles</h1>
        <p className="text-silver mt-3">Insights, tips & updates from our experts.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {posts.map((p, i) => (
          <div key={i} className="bg-silver text-dark rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-steel text-sm">{p.date}</p>
            <p className="text-sm mt-3">{p.desc}</p>
            <button className="mt-4 bg-dark text-cream px-4 py-2 rounded-lg hover:bg-steel hover:text-dark transition">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

