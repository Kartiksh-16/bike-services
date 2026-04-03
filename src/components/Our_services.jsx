// Our_services.jsx — Scroll-reveal, original data intact
import { useRef, useEffect, useState } from "react";
import { Wrench, ShieldCheck, Settings2 } from "lucide-react";

const services = [
  { icon:<Wrench size={26}/>,      title:"Bike Repair",   description:"Engine, brakes, and tyres repairs." },
  { icon:<ShieldCheck size={26}/>, title:"Full Service",  description:"Oil change and full inspection." },
  { icon:<Settings2 size={26}/>,   title:"Custom Builds", description:"Performance and style upgrades." },
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

export default function ServicesSection() {
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
        }}>What We Offer</p>
        <h2 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:"clamp(2rem, 4vw, 3.6rem)", fontWeight:900,
          color:"#F0EBE0", margin:0,
        }}>Our Services</h2>
      </div>

      {/* Cards */}
      <div style={{
        display:"flex", flexWrap:"wrap",
        justifyContent:"center", gap:"1.5rem",
        maxWidth:"920px", margin:"0 auto",
      }}>
        {services.map((service, i) => {
          const [cardRef, cardVis] = useReveal(0.1);
          return (
            <div
              key={i}
              ref={cardRef}
              style={{
                flex:"1 1 260px", maxWidth:"320px",
                background:"linear-gradient(135deg, rgba(26,74,122,0.1), rgba(42,111,168,0.06))",
                border:"1px solid rgba(42,111,168,0.22)",
                borderRadius:"18px", padding:"2rem",
                opacity: cardVis ? 1 : 0,
                transform: cardVis ? "translateY(0)" : "translateY(40px)",
                transition:`opacity 0.65s ease ${i * 130}ms, transform 0.65s ease ${i * 130}ms, border-color 0.3s, box-shadow 0.3s`,
                cursor:"default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#2A6FA8";
                e.currentTarget.style.boxShadow   = "0 18px 50px rgba(42,111,168,0.2)";
                e.currentTarget.style.transform   = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(42,111,168,0.22)";
                e.currentTarget.style.boxShadow   = "none";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >
              <div style={{
                width:"52px", height:"52px",
                background:"rgba(42,111,168,0.18)",
                borderRadius:"14px",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#2A6FA8", marginBottom:"1.2rem",
              }}>
                {service.icon}
              </div>
              <h3 style={{
                color:"#F0EBE0", fontSize:"1.2rem", fontWeight:700,
                marginBottom:"0.6rem", fontFamily:"'Playfair Display', serif",
              }}>{service.title}</h3>
              <p style={{ color:"#7A9CB8", fontSize:"0.875rem", lineHeight:1.65, margin:0 }}>
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}