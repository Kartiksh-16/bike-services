import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  // Form ka state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Input change hone par us field ka value update karo
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Submit button click pe
  function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Thanks ${form.name}! We'll get back to you soon.`);
    setForm({ name: "", email: "", phone: "", message: "" }); // form reset
  }

  return (
    <div className="bg-dark border border-silver/20 rounded-2xl p-8 shadow-xl">

      <h3 className="text-cream text-2xl font-bold mb-4">Send a Message</h3>
     

      {/* Name + Phone — side by side */}
      <div className="flex gap-4 mb-4">

        {/* Name field */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-silver text-xs font-semibold uppercase tracking-wider">
            Full Name <span className="text-steel text-base">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-dark border border-silver/30 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-silver/40 focus:outline-none focus:border-steel transition-colors"
          />
        </div>

        {/* Phone field */}
        <div className="flex-1 flex flex-col gap-1 mt-2">
          <label className="text-silver text-xs font-semibold uppercase tracking-wider">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="bg-dark border border-silver/30 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-silver/40 focus:outline-none focus:border-steel transition-colors"
          />
        </div>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-silver text-xs font-semibold uppercase tracking-wider">
          Email Address <span className="text-steel">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className="bg-dark border border-silver/30 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-silver/40 focus:outline-none focus:border-steel transition-colors"
        />
      </div>

      {/* Message field */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-silver text-xs font-semibold uppercase tracking-wider">
          Message <span className="text-steel">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us what you need..."
          className="bg-dark border border-silver/30 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-silver/40 focus:outline-none focus:border-steel transition-colors resize-none"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 bg-steel text-cream px-6 py-3 rounded-xl font-semibold text-sm hover:bg-steel/80 transition-colors cursor-pointer border-0"
      >
        <Send size={16} />
        Send Message
      </button>

    </div>
  );
}