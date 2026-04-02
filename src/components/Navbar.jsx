import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
  { label: "Services", path: "/services" },
];

const services = [
  { label: "Oil Change", path: "/services/oil-change" },
  { label: "Spare Parts", path: "/services/spare-parts" },
  { label: "Engine Repair", path: "/services/engine-repair" },
  { label: "Accidental Repair", path: "/services/accidental-repair" },
  { label: "RSA Services", path: "/services/ras-service-page" },
];

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState(null);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark shadow-md font-sans">
      <div className="max-w-6xl mx-auto px-7 flex items-center justify-around h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img
            className="h-30 w-30"
            src="./Logo.png"
            alt="Bike_Services_logo"
          />
          <span className="text-cream font-bold text-lg">Bike Services</span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-3 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.path}
                onClick={() => setActive(l.label)}
                className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors
                  ${active === l.label ? "text-cream bg-white/10" : "text-silver hover:text-cream"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Dropdown */}
          <li className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen((p) => !p)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors
                ${dropOpen ? "text-cream bg-white/10" : "text-silver hover:text-cream"}`}
            >
              More
              <span
                className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {dropOpen && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-56 bg-cream rounded-xl shadow-xl border border-silver overflow-hidden z-50">
                <p className="m-0 px-4 py-2.5 text-[11px] font-bold text-steel uppercase tracking-widest border-b border-silver">
                  Our Services
                </p>
                {services.map((s) => (
                  <Link
                    key={s.label}
                    to={s.path}
                    onClick={() => setDropOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-dark no-underline hover:bg-silver/40 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Auth & CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-cream bg-white/10 px-3 py-1.5 rounded-md">
                {user.email.split("@")[0]}
              </span>
              <button
                onClick={onLogout}
                className="bg-red-500/90 text-cream px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="bg-steel text-cream px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors"
                onClick={() => setActive("")}
              >
                Login
              </Link>
              
            </div>
          )}
          <Button
            label="Book Now"
            className="bg-steel text-cream px-5 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-steel/80 transition-colors hidden sm:block"
          />
        </div>
      </div>
    </nav>
  );
}
