// HowItWorks.jsx — Scroll-reveal, original data intact
import { useRef, useEffect, useState } from "react";

const steps = [
  { number:"1", title:"Book Online",      desc:"Choose your service and pick a date that works for you" },
  { number:"2", title:"Drop Off Your Bike",desc:"Bring your bike to our service center at your scheduled time" },
  { number:"3", title:"We Service It",    desc:"Our certified mechanics handle everything with care" },
  { number:"4", title:"Pick It Up",       desc:"Collect your bike — fully serviced and good as new" },
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

export default function HowItWorks() {
  const [headRef, headVis] = useReveal(0.2);

  return (
    <section style={{ background:"#F0EBE0", padding:"6rem 1.5rem" }}>
      {/* Heading */}
      <div
        ref={headRef}
        style={{
          textAlign:"center", marginBottom:"3.5rem",
          opacity: headVis ? 1 : 0,
          transform: headVis ? "translateY(0)" : "translateY(36px)",
          transition:"opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p style={{
          color:"#1A4A7A", fontSize:"0.72rem", fontWeight:700,
          letterSpacing:"0.38em", textTransform:"uppercase",
          marginBottom:"0.75rem", fontFamily:"monospace",
        }}>Simple Process</p>
        <h2 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:"clamp(2rem, 4vw, 3.6rem)", fontWeight:900,
          color:"#0A0A0F", margin:0,
        }}>How it works</h2>
      </div>

      {/* Grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(255px, 1fr))",
        gap:"2rem", maxWidth:"860px", margin:"0 auto",
      }}>
        {steps.map((step, i) => {
          const [cardRef, cardVis] = useReveal(0.1);
          return (
            <div
              key={i}
              ref={cardRef}
              style={{
                position:"relative",
                padding:"2.2rem 1.8rem 1.8rem",
                borderRadius:"18px",
                background:"#0A0A0F",
                border:"1px solid rgba(255,255,255,0.08)",
                opacity: cardVis ? 1 : 0,
                transform: cardVis ? "translateY(0)" : "translateY(40px)",
                transition:`opacity 0.65s ease ${i * 120}ms, transform 0.65s ease ${i * 120}ms, border-color 0.3s`,
                cursor:"default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#2A6FA8"; e.currentTarget.style.transform = "translateY(-5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Number badge */}
              <div style={{
                position:"absolute", top:"-16px", left:"-16px",
                width:"48px", height:"48px",
                borderRadius:"14px",
                background:"linear-gradient(135deg,#1A4A7A,#2A6FA8)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontWeight:900, fontSize:"1.3rem",
                color:"#F0EBE0",
                fontFamily:"'Playfair Display', serif",
                boxShadow:"0 0 22px rgba(42,111,168,0.6)",
              }}>{step.number}</div>

              <div style={{ marginTop:"0.8rem" }}>
                <h3 style={{
                  color:"#F0EBE0", fontSize:"1.35rem", fontWeight:700,
                  marginBottom:"0.7rem", fontFamily:"'Playfair Display', serif",
                }}>{step.title}</h3>
                <p style={{ color:"#7A9CB8", fontSize:"0.875rem", lineHeight:1.65, margin:0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}