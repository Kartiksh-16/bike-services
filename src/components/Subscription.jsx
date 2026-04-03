// Subscription.jsx — Scroll-reveal, original data intact
import { useRef, useEffect, useState } from "react";

const plans = [
  {
    name: "Monthly Plan",
    price: "₹499",
    period: "/ month",
    desc: "Get access to all our premium Bike services on a monthly basis.",
    cta: "Subscribe Monthly",
    highlight: false,
  },
  {
    name: "6-Month Plan",
    price: "₹2,499",
    period: "/ 6 months",
    descJSX: (
      <span>
        Enjoy services for 6 months and get{" "}
        <strong style={{ color: "#0A0A0F" }}>15 days free</strong> extra
        validity.
      </span>
    ),
    cta: "Subscribe 6-Months",
    highlight: true,
    badge: "POPULAR",
  },
  {
    name: "Yearly Plan",
    price: "₹4,499",
    period: "/ year",
    descJSX: (
      <span>
        Get services for a full year and enjoy{" "}
        <strong style={{ color: "#0A0A0F" }}>1 month free</strong> validity.
      </span>
    ),
    cta: "Subscribe Yearly",
    highlight: false,
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function Subscription() {
  const [headRef, headVis] = useReveal(0.2);

  return (
    <section style={{ background: "#F0EBE0", padding: "6rem 1.5rem" }}>
      {/* Heading */}
      <div
        ref={headRef}
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          opacity: headVis ? 1 : 0,
          transform: headVis ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p
          style={{
            color: "#1A4A7A",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            fontFamily: "monospace",
          }}
        >
          Plans &amp; Pricing
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.6rem)",
            fontWeight: 900,
            color: "#0A0A0F",
            margin: 0,
          }}
        >
          Choose Your Subscription
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
          gap: "1.5rem",
          maxWidth: "980px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        {plans.map((plan, i) => {
          const [cardRef, cardVis] = useReveal(0.1);
          return (
            <div
              key={i}
              ref={cardRef}
              style={{
                position: "relative",
                background: plan.highlight ? "#0A0A0F" : "#FFFFFF",
                border: plan.highlight
                  ? "2px solid #2A6FA8"
                  : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "20px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                boxShadow: plan.highlight
                  ? "0 24px 60px rgba(42,111,168,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.07)",
                transform: cardVis
                  ? plan.highlight
                    ? "scale(1.04)"
                    : "scale(1)"
                  : "translateY(44px)",
                opacity: cardVis ? 1 : 0,
                transition: `opacity 0.65s ease ${i * 130}ms, transform 0.65s ease ${i * 130}ms`,
              }}
              onMouseEnter={(e) => {
                if (!plan.highlight)
                  e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                if (!plan.highlight)
                  e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg,#1A4A7A,#2A6FA8)",
                    color: "#F0EBE0",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    padding: "4px 16px",
                    borderRadius: "20px",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: plan.highlight ? "#F0EBE0" : "#0A0A0F",
                  marginBottom: "0.9rem",
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  color: plan.highlight ? "#7A9CB8" : "#556",
                  fontSize: "0.9rem",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                {plan.descJSX || plan.desc}
              </p>

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: plan.highlight ? "#F0EBE0" : "#0A0A0F",
                  margin: "0 0 0.2rem",
                }}
              >
                {plan.price}
              </p>

              <p
                style={{
                  color: plan.highlight ? "#7A9CB8" : "#888",
                  fontSize: "0.85rem",
                  marginBottom: "2rem",
                }}
              >
                {plan.period}
              </p>

              <button
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg,#1A4A7A,#2A6FA8)"
                    : "#0A0A0F",
                  color: "#F0EBE0",
                  border: "none",
                  padding: "0.9rem 2rem",
                  borderRadius: "10px",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  transition: "opacity 0.2s, box-shadow 0.3s",
                  boxShadow: plan.highlight
                    ? "0 0 24px rgba(42,111,168,0.4)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = "0.88";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "1";
                }}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
