import { Link } from "react-router-dom";

const footerLinks = {
  Services: [
    { label: "Oil Change", href: "/services/oil-change" },
    { label: "Spare Parts", href: "/services/spare-parts" },
    { label: "Engine Repair", href: "/services/engine-repair" },
    { label: "Accidental Repair", href: "/services/accidental-repair" },
    { label: "RSA Services", href: "/services/ras-service-page" }, // ✅ matched with App.jsx
    { label: "Tire Services", href: "/services/tire-services" },   // ✅ added
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Book a Service", href: "/book" },
    { label: "Track Order", href: "/track" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-silver font-sans">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-2 no-underline w-fit">
            <img
              className="h-40 w-40 mr-1"
              src="./Logo.png"
              alt="Bike_Services_logo"
            />
            <span className="text-cream font-semibold text-xl">Bike Services</span>
          </Link>
          <p className="text-silver text-sm leading-relaxed max-w-xs">
            Your trusted partner for premium Bike care. We provide expert repair,
            maintenance, and inspection services to keep your vehicle running at
            its best.
          </p>
        </div>

        {/* Links Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <h4 className="text-cream text-sm font-bold uppercase tracking-widest">
              {heading}
            </h4>
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-silver text-sm no-underline hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-silver text-xs">
          © {new Date().getFullYear()} Bike Services. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-silver text-xs no-underline hover:text-cream transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
