export default function Subscription() {
  return (
    <section className="bg-cream py-16 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-dark text-4xl font-black !mb-14 drop-shadow-lg">
          Choose Your Subscription
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Monthly Plan */}
          <div className="bg-white shadow-lg rounded-lg p-8 py-32 border border-silver">
            <h3 className="text-dark text-2xl font-bold mb-4">Monthly Plan</h3>
            <p className="text-steel leading-relaxed mb-6">
              Get access to all our premium Bike services on a monthly basis.
            </p>
            <p className="text-dark text-3xl font-black mb-6">₹499 / month</p>
            <button className="bg-dark text-white px-6 py-2 rounded hover:bg-steel transition">
              Subscribe Monthly
            </button>
          </div>

          {/* 6-Month Plan */}
          <div className="bg-white shadow-lg rounded-lg p-8 py-32 border border-silver">
            <h3 className="text-dark text-2xl font-bold mb-4">6-Month Plan</h3>
            <p className="text-steel leading-relaxed mb-6">
              Enjoy services for 6 months and get <span className="font-black text-dark">15 days free</span> extra validity.
            </p>
            <p className="text-dark text-3xl font-black mb-6">₹2,499 / month</p>
            <button className="bg-dark text-white px-6 py-2 rounded hover:bg-steel transition">
              Subscribe 6-Months
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white shadow-lg rounded-lg p-8 py-32 border border-silver">
            <h3 className="text-dark text-2xl font-bold mb-4">Yearly Plan</h3>
            <p className="text-steel leading-relaxed mb-6">
              Get services for a full year and enjoy <span className="font-black text-dark">1 month free</span> validity.
            </p>
            <p className="text-dark text-3xl font-black mb-6">₹4,499 / month</p>
            <button className="bg-dark text-white px-6 py-2 rounded hover:bg-steel transition">
              Subscribe Yearly
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
