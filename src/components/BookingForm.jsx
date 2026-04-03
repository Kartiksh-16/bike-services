// import React, { useState, useEffect } from "react";

// export default function BookingForm({ show, onClose }) {

//   // "left" = hidden left | "open" = visible | "right" = hidden right
//   const [status, setStatus] = useState("left");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     if (show) {
//       setMounted(true);          // DOM mein aao
//       setStatus("left");         // silently left pe snap (no transition)

//       // ✅ 2 frames baad transition start karo — taaki snap pehle ho
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           setStatus("open");     // left se right aao (transition ke saath)
//         });
//       });
//     }
//   }, [show]);

//   const handleClose = () => {
//     setStatus("right");          // right bahar jao (transition ke saath) ✅
//     setTimeout(() => {
//       onClose();                 // parent ko batao
//       setMounted(false);         // DOM se hatao (koi snap nahi dikhta) ✅
//     }, 500);
//   };

//   if (!mounted) return null;     // sirf tab render karo jab zaroor ho

//   return (
//     <div className="fixed inset-0 z-50">

//       {/* Overlay */}
//       <div
//         onClick={handleClose}
//         className={`absolute inset-0 bg-black/40 transition-opacity duration-500
//           ${status === "open" ? "opacity-100" : "opacity-0"}`}
//       />

//       {/* Panel */}
//       <div
//         className={`absolute top-0 right-0 h-full w-full md:w-1/2 bg-silver/80 text-dark shadow-lg
//           ease-in-out duration-500
//           ${status === "left"
//             ? "-translate-x-[100vw]"              // left hidden — no transition
//             : status === "open"
//             ? "translate-x-0 transition-transform" // right pe aa gaya ✅
//             : "translate-x-[100vw] transition-transform"} // right bahar ✅
//         `}
//       >
//         <div className="p-6">
//           <button onClick={handleClose}
//             className="absolute top-4 right-4 text-dark font-bold text-xl cursor-pointer">
//             ✕
//           </button>

//           <h2 className="text-3xl font-bold mb-6 text-center">Book Service</h2>

//           <form className="space-y-4">
//             <div>
//               <label className="block text-m font-bold mb-1 text-left">Name</label>
//               <input type="text"
//                 className="w-full p-2 rounded border bg-white border-black-300"
//                 placeholder="Enter your name" />
//             </div>
//             <div>
//               <label className="block text-m font-bold mb-1 text-left">Phone</label>
//               <input type="tel"
//                 className="w-full p-2 rounded border bg-white border-black-300"
//                 placeholder="Enter your phone number" />
//             </div>
//             <div>
//               <label className="block text-m font-bold mb-1 text-left">Preferred Date</label>
//               <input type="date"
//                 className="w-full p-2 rounded border bg-white border-black-300" />
//             </div>
//             <div>
//               <label className="block text-m font-bold mb-1 text-left">Notes</label>
//               <textarea
//                 className="w-full p-2 rounded border bg-white border-black-300"
//                 placeholder="Any special requests?"  />
//             </div>
//             <div className="flex justify-between mt-6">
//               <button type="button" onClick={handleClose}
//                 className="bg-dark text-cream px-4 py-2 rounded cursor-pointer">
//                 Cancel
//               </button>
//               <button type="submit"
//                 className="bg-steel text-cream px-4 py-2 rounded cursor-pointer">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

//Second transition

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ─── Shared input styles ─────────────────────────────────────── */

const INPUT_STYLE = {
  width: "100%",
  padding: "11px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(42,111,168,0.22)",
  background: "rgba(42,111,168,0.06)",
  color: "#F0EBE0",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
  boxSizing: "border-box",
};

const LABEL_STYLE = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#7A9CB8",
  marginBottom: "6px",
  fontFamily: "monospace",
};

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

function StyledInput({ type = "text", placeholder, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...INPUT_STYLE,
        borderColor: focused ? "#2A6FA8" : "rgba(42,111,168,0.22)",
        background: focused ? "rgba(42,111,168,0.1)" : "rgba(42,111,168,0.06)",
        boxShadow: focused ? "0 0 0 3px rgba(42,111,168,0.15)" : "none",
      }}
      {...rest}
    />
  );
}

function StyledTextarea({ placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...INPUT_STYLE,
        resize: "vertical",
        minHeight: "80px",
        borderColor: focused ? "#2A6FA8" : "rgba(42,111,168,0.22)",
        background: focused ? "rgba(42,111,168,0.1)" : "rgba(42,111,168,0.06)",
        boxShadow: focused ? "0 0 0 3px rgba(42,111,168,0.15)" : "none",
      }}
    />
  );
}

function StyledSelect({ children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...INPUT_STYLE,
        cursor: "pointer",
        borderColor: focused ? "#2A6FA8" : "rgba(42,111,168,0.22)",
        background: focused ? "rgba(13,21,32,0.95)" : "rgba(13,21,32,0.85)",
        boxShadow: focused ? "0 0 0 3px rgba(42,111,168,0.15)" : "none",
      }}
    >
      {children}
    </select>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function BookingForm({ show, onClose }) {
  const [phase, setPhase] = useState("hidden");
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [submitDone, setSubmitDone] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setStep(1);
      setSubmitDone(false);
      setPhase("hidden");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("open")),
      );
    }
  }, [show]);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleClose = () => {
    setPhase("hidden");
    setTimeout(() => {
      onClose();
      setMounted(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitDone(true);
    setTimeout(handleClose, 1800);
  };

  if (!mounted) return null;

  /* ── Animation values ── */
  const isOpen = phase === "open";

  /* ── Overlay: dark + blur behind modal ── */
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    transition: "opacity 0.4s ease",
    opacity: isOpen ? 1 : 0,
  };

  /* ── Modal card: centered, max width 560px ── */
  const modalStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "560px",
    background: "rgba(8, 9, 15, 0.92)",
    backdropFilter: "blur(32px) saturate(200%)",
    WebkitBackdropFilter: "blur(32px) saturate(200%)",
    border: "1px solid rgba(42,111,168,0.25)",
    borderRadius: "20px",
    boxShadow: "0 32px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(42,111,168,0.1)",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
    transform: isOpen
      ? "scale(1) translateY(0)"
      : "scale(0.93) translateY(24px)",
    opacity: isOpen ? 1 : 0,
  };

  return createPortal(
    /* Click overlay to close */
    <div style={overlayStyle} onClick={handleClose}>
      {/* Stop click from closing when clicking inside modal */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* ── Top glow accent line ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "55%",
            height: "1px",
            borderRadius: "1px",
            background:
              "linear-gradient(90deg, transparent, #2A6FA8, transparent)",
          }}
        />

        {/* ── Header ── */}
        <div
          style={{
            padding: "1.75rem 2rem 1.25rem",
            borderBottom: "1px solid rgba(42,111,168,0.12)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  color: "#2A6FA8",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                {step === 1 ? "Step 1 of 2" : "Step 2 of 2"}
              </p>
              <h2
                style={{
                  margin: "5px 0 0",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#F0EBE0",
                  fontFamily: "var(--font-display, 'Playfair Display', serif)",
                }}
              >
                {step === 1 ? "Book a Service" : "Vehicle Details"}
              </h2>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7A9CB8",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.2s, color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                e.currentTarget.style.color = "#FCA5A5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#7A9CB8";
              }}
            >
              ✕
            </button>
          </div>

          {/* Step progress bar */}
          <div
            style={{
              marginTop: "1rem",
              height: "3px",
              background: "rgba(42,111,168,0.15)",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "2px",
                background: "linear-gradient(90deg, #1A4A7A, #2A6FA8)",
                width: step === 1 ? "50%" : "100%",
                transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 0 10px rgba(42,111,168,0.6)",
              }}
            />
          </div>
        </div>

        {/* ── Success screen ── */}
        {submitDone ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "3rem 2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(42,111,168,0.15)",
                border: "2px solid #2A6FA8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                color: "#F0EBE0",
                fontSize: "1.3rem",
                fontWeight: 700,
                margin: 0,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Booking Confirmed!
            </h3>
            <p
              style={{
                color: "#7A9CB8",
                fontSize: "0.9rem",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              We'll call you within 30 minutes to confirm your appointment.
            </p>
          </div>
        ) : (
          /* ── Form body ── */
          <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              padding: "1.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
            }}
          >
            {step === 1 ? (
              <>
                {/* Two columns on wider screens */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <Field label="Full Name">
                    <StyledInput
                      type="text"
                      placeholder="Rahul Kumar"
                      required
                    />
                  </Field>
                  <Field label="Phone Number">
                    <StyledInput
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </Field>
                </div>

                <Field label="Email (Optional)">
                  <StyledInput type="email" placeholder="rahul@example.com" />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <Field label="Preferred Date">
                    <StyledInput type="date" required />
                  </Field>
                  <Field label="Preferred Time">
                    <StyledSelect>
                      <option value="" style={{ background: "#0D1520" }}>
                        Select time
                      </option>
                      <option value="9am" style={{ background: "#0D1520" }}>
                        9:00 AM – 11:00 AM
                      </option>
                      <option value="11am" style={{ background: "#0D1520" }}>
                        11:00 AM – 1:00 PM
                      </option>
                      <option value="2pm" style={{ background: "#0D1520" }}>
                        2:00 PM – 4:00 PM
                      </option>
                      <option value="4pm" style={{ background: "#0D1520" }}>
                        4:00 PM – 6:00 PM
                      </option>
                    </StyledSelect>
                  </Field>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    marginTop: "0.5rem",
                    background: "linear-gradient(135deg, #1A4A7A, #2A6FA8)",
                    color: "#F0EBE0",
                    border: "none",
                    padding: "13px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    boxShadow: "0 0 28px rgba(42,111,168,0.4)",
                    transition: "box-shadow 0.3s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 44px rgba(42,111,168,0.7)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(42,111,168,0.4)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Continue →
                </button>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <Field label="Service Type">
                    <StyledSelect>
                      <option style={{ background: "#0D1520" }}>
                        Select service
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Oil Change
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Engine Repair
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Accidental Repair
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Tire Services
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Full Service
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Spare Parts
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        RSA Service
                      </option>
                      <option style={{ background: "#0D1520" }}>
                        Custom Build
                      </option>
                    </StyledSelect>
                  </Field>
                  <Field label="Registration Number">
                    <StyledInput type="text" placeholder="RJ14 AB 1234" />
                  </Field>
                </div>

                <Field label="Bike Brand & Model">
                  <StyledInput
                    type="text"
                    placeholder="e.g. Royal Enfield Classic 350"
                    required
                  />
                </Field>

                <Field label="Notes / Special Requests">
                  <StyledTextarea placeholder="Describe the issue or any specific requests..." />
                </Field>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "0.25rem" }}
                >
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      color: "#7A9CB8",
                      border: "1px solid rgba(42,111,168,0.2)",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(42,111,168,0.1)";
                      e.currentTarget.style.color = "#F0EBE0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "#7A9CB8";
                    }}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      background: "linear-gradient(135deg, #1A4A7A, #2A6FA8)",
                      color: "#F0EBE0",
                      border: "none",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      boxShadow: "0 0 28px rgba(42,111,168,0.4)",
                      transition: "box-shadow 0.3s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 44px rgba(42,111,168,0.7)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 28px rgba(42,111,168,0.4)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Confirm Booking ✓
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* ── Footer note ── */}
        {!submitDone && (
          <div
            style={{
              padding: "0.85rem 2rem",
              borderTop: "1px solid rgba(42,111,168,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "0.8rem" }}>🔒</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#3A5A6A" }}>
              Your information is secure and will never be shared.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
