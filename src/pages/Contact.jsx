import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";

const contactInfo = [
  {
    icon: <Phone size={22} />,
    title: "Call Us",
    detail: "+91 98765 43210",
    sub: "Mon–Sat, 9am – 7pm",
  },
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    detail: "support@bikeservice.com",
    sub: "Reply within 24 hours",
  },
  {
    icon: <MapPin size={22} />,
    title: "Visit Us",
    detail: "123, Workshop Lane",
    sub: "Jaipur, Rajasthan 302001",
  },
  {
    icon: <Clock size={22} />,
    title: "Working Hours",
    detail: "Mon – Sat: 9am – 7pm",
    sub: "Sunday: Closed",
  },
];

export default function Contact() {
  return (
    <>
      {/* ── Dark Section: Header + Info Cards ── */}
      <div className="bg-dark  text-cream font-sans">
        <div className="max-w-4xl mx-auto text-center pt-22 pb-10 px-6">
          <h2 className="text-xl text-steel tracking-widest font-bold mb-2 uppercase">
            Get In Touch
          </h2>
          <h1 className="text-4xl text-cream font-bold mb-3">Contact Us</h1>
          <p className="text-silver max-w-xl mx-auto">
            Have a question, want to book a service, or just need advice? We're here to help — reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-6 pb-20">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="bg-dark border border-silver/20 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:border-steel/60 transition-colors"
            >
              <div className="bg-steel/20 text-steel rounded-full p-3">
                {item.icon}
              </div>
              <p className="text-cream font-semibold text-sm">{item.title}</p>
              <p className="text-silver text-sm">{item.detail}</p>
              <p className="text-silver/60 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Light Section: Contact Form ── */}
      <section className=" min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-2xl w-full px-6 py-12 rounded-x">
          <h2 className="text-dark text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
