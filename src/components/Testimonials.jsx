// Testimonials.jsx — Scroll-reveal + original slider logic intact
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { stars:5, quote:"Got my Royal Enfield serviced here. The team was super professional, explained every issue clearly, and delivered on time. Best service center in the city.", initials:"RK", name:"Rahul K.", city:"Jaipur" },
  { stars:5, quote:"Oil change done in under 30 minutes. Staff was friendly and didn't overcharge. I've been coming here for 2 years and I trust them completely.", initials:"PS", name:"Priya S.", city:"Jaipur" },
  { stars:4, quote:"My bike had an engine issue and they diagnosed it accurately without any guesswork. Fixed it in one day. Will definitely recommend to friends.", initials:"AM", name:"Arjun M.", city:"Jaipur" },
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

function Stars({ count }) {
  return (
    <div style={{ display:"flex", gap:"4px", marginBottom:"1.2rem" }}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={18}
          fill={s <= count ? "#F59E0B" : "none"}
          color={s <= count ? "#F59E0B" : "#7A9CB8"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent]  = useState(0);
  const [cardVis, setCardVis]  = useState(true);
  const [direction, setDir]    = useState("right");
  const [headRef, headVis]     = useReveal(0.2);
  const [wrapRef, wrapVis]     = useReveal(0.1);

  const goTo = (index, dir) => {
    if (!cardVis) return;
    setDir(dir);
    setCardVis(false);
    setTimeout(() => { setCurrent(index); setCardVis(true); }, 300);
  };
  const prev = () => goTo(current === 0 ? reviews.length - 1 : current - 1, "left");
  const next = () => goTo(current === reviews.length - 1 ? 0 : current + 1, "right");

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [current, cardVis]);

  const r = reviews[current];

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
        }}>What Riders Say</p>
        <h2 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:"clamp(2rem, 4vw, 3.6rem)", fontWeight:900,
          color:"#F0EBE0", margin:0,
        }}>Customer Reviews</h2>
      </div>

      {/* Slider */}
      <div
        ref={wrapRef}
        style={{
          maxWidth:"820px", margin:"0 auto",
          opacity: wrapVis ? 1 : 0,
          transform: wrapVis ? "translateY(0)" : "translateY(40px)",
          transition:"opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          {/* Prev */}
          <button onClick={prev} style={{
            width:"42px", height:"42px", borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.15)",
            background:"transparent", color:"#7A9CB8",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0, transition:"border-color 0.3s, color 0.3s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#2A6FA8";e.currentTarget.style.color="#F0EBE0";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="#7A9CB8";}}>
            <ChevronLeft size={18} />
          </button>

          {/* Card */}
          <div style={{
            flex:1,
            background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"20px", padding:"2.5rem",
            minHeight:"220px",
            opacity: cardVis ? 1 : 0,
            transform: cardVis ? "translateX(0)" : direction==="right" ? "translateX(-22px)" : "translateX(22px)",
            transition:"opacity 0.3s ease, transform 0.3s ease",
          }}>
            <Stars count={r.stars} />
            <p style={{
              color:"#F0EBE0", fontSize:"1rem", lineHeight:1.75,
              fontFamily:"'Playfair Display', serif", fontStyle:"italic",
              marginBottom:"1.5rem",
            }}>"{r.quote}"</p>
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"1.2rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
              <div style={{
                width:"40px", height:"40px", borderRadius:"50%",
                background:"linear-gradient(135deg,#1A4A7A,#2A6FA8)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#F0EBE0", fontSize:"0.75rem", fontWeight:700,
              }}>{r.initials}</div>
              <div>
                <p style={{ color:"#F0EBE0", fontSize:"0.9rem", fontWeight:600, margin:0 }}>{r.name}</p>
                <p style={{ color:"#7A9CB8", fontSize:"0.75rem", margin:0 }}>{r.city}</p>
              </div>
            </div>
          </div>

          {/* Next */}
          <button onClick={next} style={{
            width:"42px", height:"42px", borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.15)",
            background:"transparent", color:"#7A9CB8",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0, transition:"border-color 0.3s, color 0.3s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#2A6FA8";e.currentTarget.style.color="#F0EBE0";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="#7A9CB8";}}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"1.5rem" }}>
          {reviews.map((_, i) => (
            <button key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              style={{
                height:"6px", width: i===current ? "22px" : "6px",
                borderRadius:"3px",
                background: i===current ? "#2A6FA8" : "rgba(255,255,255,0.18)",
                border:"none", cursor:"pointer", transition:"all 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
