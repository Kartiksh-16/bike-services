// import { useState, useRef, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Button from "./Button";

// const links = [
//   { label: "Home", path: "/" },
//   { label: "About", path: "/about" },
//   { label: "Gallery", path: "/gallery" },
//   { label: "Contact", path: "/contact" },
//   { label: "Services", path: "/services" },
// ];

// const services = [
//   { label: "Oil Change", path: "/services/oil-change" },
//   { label: "Spare Parts", path: "/services/spare-parts" },
//   { label: "Engine Repair", path: "/services/engine-repair" },
//   { label: "Accidental Repair", path: "/services/accidental-repair" },
//   { label: "RSA Services", path: "/services/ras-service-page" },
// ];

// export default function Navbar() {
//   const [dropOpen, setDropOpen] = useState(false);
//   const [active, setActive] = useState("Home");
//   const [user, setUser] = useState(null);
//   const dropRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     } else {
//       setUser(null);
//     }
//   }, [location]);

//   const onLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropRef.current && !dropRef.current.contains(e.target)) {
//         setDropOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-dark shadow-md font-sans">
//       <div className="max-w-6xl mx-auto px-7 flex items-center justify-around h-16">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-1 shrink-0">
//           <img
//             className="h-30 w-30"
//             src="./Logo.png"
//             alt="Bike_Services_logo"
//           />
//           <span className="text-cream font-bold text-lg">Bike Services</span>
//         </Link>

//         {/* Links */}
//         <ul className="flex items-center gap-3 list-none m-0 p-0">
//           {links.map((l) => (
//             <li key={l.label}>
//               <Link
//                 to={l.path}
//                 onClick={() => setActive(l.label)}
//                 className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors
//                   ${active === l.label ? "text-cream bg-white/10" : "text-silver hover:text-cream"}`}
//               >
//                 {l.label}
//               </Link>
//             </li>
//           ))}

//           {/* Dropdown */}
//           <li className="relative" ref={dropRef}>
//             <button
//               onClick={() => setDropOpen((p) => !p)}
//               className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors
//                 ${dropOpen ? "text-cream bg-white/10" : "text-silver hover:text-cream"}`}
//             >
//               More
//               <span
//                 className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
//               >
//                 ▾
//               </span>
//             </button>

//             {dropOpen && (
//               <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-56 bg-cream rounded-xl shadow-xl border border-silver overflow-hidden z-50">
//                 <p className="m-0 px-4 py-2.5 text-[11px] font-bold text-steel uppercase tracking-widest border-b border-silver">
//                   Our Services
//                 </p>
//                 {services.map((s) => (
//                   <Link
//                     key={s.label}
//                     to={s.path}
//                     onClick={() => setDropOpen(false)}
//                     className="block px-4 py-2.5 text-sm font-medium text-dark no-underline hover:bg-silver/40 transition-colors"
//                   >
//                     {s.label}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </li>
//         </ul>

//         {/* Auth & CTA */}
//         <div className="flex items-center gap-3">
//           {user ? (
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-cream bg-white/10 px-3 py-1.5 rounded-md">
//                 {user.email.split("@")[0]}
//               </span>
//               <button
//                 onClick={onLogout}
//                 className="bg-red-500/90 text-cream px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link
//                 to="/login"
//                 className="bg-steel text-cream px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors"
//                 onClick={() => setActive("")}
//               >
//                 Login
//               </Link>
              
//             </div>
//           )}
//           <Button
//             label="Book Now"
//             className="bg-steel text-cream px-5 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors hidden sm:block"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }





// Second transition 




import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

const links = [
  { label: "Home",    path: "/" },
  { label: "About",   path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const services = [
  { label: "Oil Change",        path: "/services/oil-change" },
  { label: "Spare Parts",       path: "/services/spare-parts" },
  { label: "Engine Repair",     path: "/services/engine-repair" },
  { label: "Accidental Repair", path: "/services/accidental-repair" },
  { label: "RSA Services",      path: "/services/ras-service-page" },
  { label: "Tire Services",     path: "/services/tire-services" },
];

export default function Navbar() {
  const [dropOpen,  setDropOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [active,    setActive]    = useState("Home");
  const [user,      setUser]      = useState(null);
  const dropRef  = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* ── Auth state ─────────────────────────────────────────── */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  }, [location]);

  /* ── Scroll → blur navbar ───────────────────────────────── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close dropdown on outside click ───────────────────── */
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* ── Active link from URL ───────────────────────────────── */
  useEffect(() => {
    const match = links.find((l) => l.path === location.pathname);
    if (match) setActive(match.label);
    else if (location.pathname.startsWith("/services")) setActive("Services");
    else setActive("");
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  /* ── Styles ─────────────────────────────────────────────── */
  const navBase = {
    position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 200,
    height: "64px",
    display: "flex", alignItems: "center",
    padding: "0 2rem",
    transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    background: scrolled ? "rgba(8,9,15,0.88)" : "rgba(8,9,15,0.6)",
    backdropFilter: scrolled ? "blur(22px) saturate(180%)" : "blur(8px)",
    WebkitBackdropFilter: scrolled ? "blur(22px) saturate(180%)" : "blur(8px)",
    borderBottom: scrolled ? "1px solid rgba(42,111,168,0.18)" : "1px solid transparent",
    boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.45)" : "none",
  };

  const linkStyle = (label) => ({
    display: "inline-flex", alignItems: "center",
    padding: "6px 14px", borderRadius: "8px",
    fontSize: "0.875rem", fontWeight: 500,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "color 0.2s, background 0.2s",
    color: active === label ? "#F0EBE0" : "#7A9CB8",
    background: active === label ? "rgba(42,111,168,0.18)" : "transparent",
    fontFamily: "var(--font-sans)",
  });

  const dropItemStyle = {
    display: "block", padding: "10px 18px",
    fontSize: "0.875rem", fontWeight: 500,
    color: "#7A9CB8", textDecoration: "none",
    transition: "color 0.2s, background 0.2s, padding-left 0.2s",
    fontFamily: "var(--font-sans)",
  };

  return (
    <>
      <nav style={navBase}>
        <div style={{
          maxWidth: "1200px", width: "100%", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* ── Logo ──────────────────────────────────────── */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
            onClick={() => setActive("Home")}>
            <img src="./Logo.png" alt="Bike Services" style={{ height: "42px", width: "42px", objectFit: "contain" }} />
            <span style={{
              color: "#F0EBE0", fontWeight: 700, fontSize: "1.1rem",
              letterSpacing: "0.03em", fontFamily: "var(--font-display, 'Playfair Display', serif)",
            }}>
              Bike<span style={{ color: "#2A6FA8" }}>Serv</span>
            </span>
          </Link>

          {/* ── Desktop Links ─────────────────────────────── */}
          <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.path} onClick={() => setActive(l.label)} style={linkStyle(l.label)}
                  onMouseEnter={e => { if (active !== l.label) { e.currentTarget.style.color="#F0EBE0"; e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}}
                  onMouseLeave={e => { if (active !== l.label) { e.currentTarget.style.color="#7A9CB8"; e.currentTarget.style.background="transparent"; }}}>
                  {l.label}
                </Link>
              </li>
            ))}

            {/* Services dropdown */}
            <li style={{ position: "relative" }} ref={dropRef}>
              <button
                onClick={() => setDropOpen((p) => !p)}
                style={{
                  ...linkStyle(active === "Services" ? "Services" : ""),
                  border: "none", cursor: "pointer", gap: "5px",
                  color: active === "Services" ? "#F0EBE0" : dropOpen ? "#F0EBE0" : "#7A9CB8",
                  background: dropOpen ? "rgba(42,111,168,0.18)" : active === "Services" ? "rgba(42,111,168,0.18)" : "transparent",
                }}
              >
                Services
                <span style={{
                  display: "inline-block",
                  transition: "transform 0.25s ease",
                  transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                  fontSize: "0.7rem", marginLeft: "2px",
                }}>▾</span>
              </button>

              {/* Dropdown panel */}
              <div style={{
                position: "absolute", top: "calc(100% + 10px)", left: "50%",
                transform: "translateX(-50%)",
                width: "220px",
                background: "rgba(8,9,15,0.96)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(42,111,168,0.22)",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(42,111,168,0.1)",
                opacity: dropOpen ? 1 : 0,
                pointerEvents: dropOpen ? "all" : "none",
                transform: dropOpen
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-8px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                zIndex: 100,
              }}>
                <p style={{
                  margin: 0, padding: "10px 18px 8px",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "#2A6FA8",
                  borderBottom: "1px solid rgba(42,111,168,0.15)",
                  fontFamily: "monospace",
                }}>Our Services</p>
                {services.map((s) => (
                  <Link key={s.label} to={s.path}
                    onClick={() => { setDropOpen(false); setActive("Services"); }}
                    style={dropItemStyle}
                    onMouseEnter={e => { e.currentTarget.style.color="#F0EBE0"; e.currentTarget.style.background="rgba(42,111,168,0.12)"; e.currentTarget.style.paddingLeft="24px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color="#7A9CB8"; e.currentTarget.style.background="transparent"; e.currentTarget.style.paddingLeft="18px"; }}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          {/* ── Right: Auth + CTA ─────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {user ? (
              <>
                <span style={{
                  fontSize: "0.8rem", fontWeight: 600, color: "#F0EBE0",
                  background: "rgba(42,111,168,0.18)", padding: "6px 14px",
                  borderRadius: "8px", border: "1px solid rgba(42,111,168,0.25)",
                }}>{user.email.split("@")[0]}</span>
                <button onClick={onLogout} style={{
                  background: "rgba(239,68,68,0.15)", color: "#FCA5A5",
                  border: "1px solid rgba(239,68,68,0.3)",
                  padding: "6px 14px", borderRadius: "8px",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.28)"; e.currentTarget.style.color="#FECACA"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(239,68,68,0.15)"; e.currentTarget.style.color="#FCA5A5"; }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setActive("")} style={{
                color: "#7A9CB8", textDecoration: "none",
                fontSize: "0.875rem", fontWeight: 500,
                padding: "6px 14px", borderRadius: "8px",
                border: "1px solid rgba(42,111,168,0.2)",
                transition: "color 0.2s, border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color="#F0EBE0"; e.currentTarget.style.borderColor="rgba(42,111,168,0.5)"; e.currentTarget.style.background="rgba(42,111,168,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#7A9CB8"; e.currentTarget.style.borderColor="rgba(42,111,168,0.2)"; e.currentTarget.style.background="transparent"; }}>
                Login
              </Link>
            )}

            {/* Book Now button */}
            <Button label="Book Now" />
          </div>
        </div>
      </nav>

      {/* ── Navbar height spacer (only on non-hero pages) ───── */}
      {/* Hero handles its own top padding */}
    </>
  );
}