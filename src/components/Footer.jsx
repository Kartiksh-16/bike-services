// import { Link } from "react-router-dom";

// const footerLinks = {
//   Services: [
//     { label: "Oil Change", href: "/services/oil-change" },
//     { label: "Spare Parts", href: "/services/spare-parts" },
//     { label: "Engine Repair", href: "/services/engine-repair" },
//     { label: "Accidental Repair", href: "/services/accidental-repair" },
//     { label: "RSA Services", href: "/services/ras-service-page" }, // ✅ matched with App.jsx
//     { label: "Tire Services", href: "/services/tire-services" },   // ✅ added
//   ],
//   Company: [
//     { label: "About Us", href: "/about" },
//     { label: "Our Team", href: "/team" },
//     { label: "Careers", href: "/careers" },
//     { label: "Blog", href: "/blog" },
//   ],
//   Support: [
//     { label: "Contact Us", href: "/contact" },
//     { label: "Book a Service", href: "/book" },
//     { label: "Track Order", href: "/track" },
//   ],
// };

// export default function Footer() {
//   return (
//     <footer className="bg-dark text-silver font-sans">
//       <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
//         {/* Brand Column */}
//         <div className="lg:col-span-2 flex flex-col gap-5">
//           <Link to="/" className="flex items-center gap-2 no-underline w-fit">
//             <img
//               className="h-40 w-40 mr-1"
//               src="./Logo.png"
//               alt="Bike_Services_logo"
//             />
//             <span className="text-cream font-semibold text-xl">Bike Services</span>
//           </Link>
//           <p className="text-silver text-sm leading-relaxed max-w-xs">
//             Your trusted partner for premium Bike care. We provide expert repair,
//             maintenance, and inspection services to keep your vehicle running at
//             its best.
//           </p>
//         </div>

//         {/* Links Columns */}
//         {Object.entries(footerLinks).map(([heading, links]) => (
//           <div key={heading} className="flex flex-col gap-4">
//             <h4 className="text-cream text-sm font-bold uppercase tracking-widest">
//               {heading}
//             </h4>
//             <ul className="flex flex-col gap-2 list-none m-0 p-0">
//               {links.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     to={link.href}
//                     className="text-silver text-sm no-underline hover:text-cream transition-colors"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Divider */}
//       <div className="border-t border-white/10" />

//       {/* Bottom Bar */}
//       <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
//         <p className="text-silver text-xs">
//           © {new Date().getFullYear()} Bike Services. All rights reserved.
//         </p>
//         <div className="flex items-center gap-5">
//           {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
//             <Link
//               key={item}
//               to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
//               className="text-silver text-xs no-underline hover:text-cream transition-colors"
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }







// Second transition 





import { Link } from "react-router-dom";

const footerLinks = {
  Services: [
    { label: "Oil Change",        href: "/services/oil-change" },
    { label: "Spare Parts",       href: "/services/spare-parts" },
    { label: "Engine Repair",     href: "/services/engine-repair" },
    { label: "Accidental Repair", href: "/services/accidental-repair" },
    { label: "RSA Services",      href: "/services/ras-service-page" },
    { label: "Tire Services",     href: "/services/tire-services" },
  ],
  Company: [
    { label: "About Us",  href: "/about" },
    { label: "Our Team",  href: "/team" },
    { label: "Careers",   href: "/careers" },
    { label: "Blog",      href: "/blog" },
  ],
  Support: [
    { label: "Contact Us",    href: "/contact" },
    { label: "Book a Service",href: "/book" },
    { label: "Track Order",   href: "/track" },
  ],
};

const linkStyle = {
  color: "#4A6A88",
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: 400,
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "color 0.22s ease, padding-left 0.22s ease",
  paddingLeft: "0",
};

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #08090F 0%, #050508 100%)",
      borderTop: "1px solid rgba(42,111,168,0.15)",
      color: "#7A9CB8",
      fontFamily: "var(--font-sans, 'Geist Variable', sans-serif)",
    }}>

      {/* ── Top animated road strip ──────────────────────── */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #1A4A7A, #2A6FA8, #1A4A7A, transparent)", marginBottom: "0" }} />

      {/* ── Main grid ────────────────────────────────────── */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "4rem 2rem 3rem",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "2.5rem",
      }}>

        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", width: "fit-content" }}>
            <img src="./Logo.png" alt="Bike Services"
              style={{ height: "44px", width: "44px", objectFit: "contain" }} />
            <span style={{
              color: "#F0EBE0", fontWeight: 700, fontSize: "1.15rem",
              letterSpacing: "0.03em",
              fontFamily: "var(--font-display, 'Playfair Display', serif)",
            }}>
              Bike<span style={{ color: "#2A6FA8" }}>Serv</span>
            </span>
          </Link>

          <p style={{ color: "#4A6A88", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "280px", margin: 0 }}>
            Your trusted partner for premium bike care in Jaipur. Expert repair,
            maintenance, and inspection — keeping your ride at its best.
          </p>

          {/* Social icons row */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {[
              { label: "FB",  icon: "f" },
              { label: "IG",  icon: "◎" },
              { label: "YT",  icon: "▶" },
              { label: "WA",  icon: "✆" },
            ].map((s) => (
              <div key={s.label} style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                border: "1px solid rgba(42,111,168,0.22)",
                background: "rgba(42,111,168,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4A6A88", fontSize: "0.8rem", cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(42,111,168,0.2)"; e.currentTarget.style.borderColor="rgba(42,111,168,0.5)"; e.currentTarget.style.color="#2A6FA8"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(42,111,168,0.06)"; e.currentTarget.style.borderColor="rgba(42,111,168,0.22)"; e.currentTarget.style.color="#4A6A88"; }}>
                {s.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4 style={{
              color: "#F0EBE0", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.32em", textTransform: "uppercase",
              margin: 0, fontFamily: "monospace",
            }}>
              {heading}
            </h4>
            {/* Steel underline accent */}
            <div style={{ width: "28px", height: "2px", background: "linear-gradient(90deg,#2A6FA8,#1A4A7A)", borderRadius: "2px", marginTop: "-6px" }} />

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    style={linkStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#F0EBE0";
                      e.currentTarget.style.paddingLeft = "6px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#4A6A88";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span style={{ color: "#1A4A7A", fontSize: "0.6rem" }}>▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Contact strip ────────────────────────────────── */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 2rem 2rem",
        display: "flex", gap: "2rem", flexWrap: "wrap",
      }}>
        {[
          { icon: "📍", label: "Jaipur, Rajasthan, India" },
          { icon: "📞", label: "+91 98765 43210" },
          { icon: "✉️", label: "hello@bikeserv.in" },
        ].map((item) => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "#4A6A88", fontSize: "0.8rem",
          }}>
            <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(42,111,168,0.1)" }} />

      {/* ── Bottom bar ───────────────────────────────────── */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "1.25rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px",
      }}>
        <p style={{ color: "#2A3A4A", fontSize: "0.78rem", margin: 0 }}>
          © {new Date().getFullYear()} BikeServ. All rights reserved. Made with ♥ in Jaipur.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ color: "#2A3A4A", fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#2A6FA8"}
              onMouseLeave={e => e.currentTarget.style.color = "#2A3A4A"}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}