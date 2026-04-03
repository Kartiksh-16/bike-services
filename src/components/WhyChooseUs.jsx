// WhyChooseUs.jsx — Scroll-reveal version, original data intact
import { useRef, useEffect, useState } from "react";
import { Clock, Users, Wrench, CheckCircle } from "lucide-react";

const stats = [
  { icon: <Clock size={22} />,       stat: "10+",    desc: "Years of experience in professional bike servicing" },
  { icon: <Users size={22} />,       stat: "8,500+", desc: "Happy customers across the city" },
  { icon: <Wrench size={22} />,      stat: "25+",    desc: "Expert certified mechanics on our team" },
  { icon: <CheckCircle size={22} />, stat: "99%",    desc: "Customer satisfaction rate, every time" },
];

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function WhyChooseUs() {
  const [headRef, headVis] = useReveal(0.2);

  return (
    <section style={{ background:"#0A0A0F", padding:"6rem 1.5rem" }}>
      {/* Heading */}
      <div
        ref={headRef}
        style={{
          textAlign:"center", marginBottom:"3rem",
          opacity: headVis ? 1 : 0,
          transform: headVis ? "translateY(0)" : "translateY(36px)",
          transition:"opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p style={{
          color:"#2A6FA8", fontSize:"0.72rem", fontWeight:700,
          letterSpacing:"0.38em", textTransform:"uppercase",
          marginBottom:"0.75rem", fontFamily:"monospace",
        }}>Why Choose Us</p>
        <h2 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:"clamp(2rem, 4vw, 3.6rem)", fontWeight:900,
          color:"#F0EBE0", margin:0,
        }}>
          Trusted by <span style={{ color:"#2A6FA8" }}>thousands</span> of riders
        </h2>
      </div>

      {/* Cards */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(255px, 1fr))",
        gap:"1.4rem", maxWidth:"860px", margin:"0 auto",
      }}>
        {stats.map((item, i) => {
          const [cardRef, cardVis] = useReveal(0.1);
          return (
            <div
              key={i}
              ref={cardRef}
              style={{
                background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:"18px", padding:"1.75rem",
                display:"flex", flexDirection:"column", gap:"1rem",
                opacity: cardVis ? 1 : 0,
                transform: cardVis ? "translateY(0)" : "translateY(40px)",
                transition:`opacity 0.65s ease ${i * 110}ms, transform 0.65s ease ${i * 110}ms, border-color 0.3s, box-shadow 0.3s`,
                cursor:"default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#2A6FA8";
                e.currentTarget.style.boxShadow   = "0 12px 40px rgba(42,111,168,0.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow   = "none";
              }}
            >
              <div style={{
                width:"44px", height:"44px",
                background:"rgba(42,111,168,0.15)",
                borderRadius:"12px",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#2A6FA8",
              }}>
                {item.icon}
              </div>
              <p style={{ color:"#F0EBE0", fontSize:"2.6rem", fontWeight:900, margin:0, fontFamily:"'Playfair Display', serif" }}>
                {item.stat}
              </p>
              <p style={{ color:"#7A9CB8", fontSize:"0.875rem", lineHeight:1.65, margin:0 }}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}