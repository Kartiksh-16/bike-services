// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from 'react-hot-toast';
// import { useEffect, useRef } from "react";
// import ScrollToTop from "./components/ScrollToTop.jsx";
// import Navbar from "./components/Navbar.jsx";
// import HeroSection from "./components/HeroSection.jsx";
// import Button from "./components/Button.jsx";
// import Footer from "./components/Footer.jsx";
// import OurServices from "./components/Our_services.jsx";
// import Subscription from "./components/Subscription.jsx";
// import WhyChooseUs from "./components/WhyChooseUs.jsx";
// import HowItWorks from "./components/HowItWorks.jsx";
// import Testimonials from "./components/Testimonials.jsx";
// import About from "./pages/About.jsx";
// import Gallery from "./pages/Gallery.jsx";
// import Services from "./pages/Services.jsx";
// import ServiceCard from "./components/ServiceCard.jsx";
// import OilChange from "./pages/OilChange";
// import BookingForm from "./components/BookingForm";
// import AccidentalRepair from "./pages/AccidentalRepair";
// import Contact from "./pages/Contact";
// import "./App.css";
// import SpareParts from "./pages/SpareParts.jsx";
// import RSAServicePage from "./pages/RSAServicePage.jsx";
// import EngineRepairPage from "./pages/EngineRepairPage.jsx";
// import TireServices from "./pages/TireServices.jsx";
// import Team from "./pages/Team.jsx";
// import Careers from "./pages/Careers.jsx";
// import Blog from "./pages/Blog.jsx";
// import Login from "./pages/Login.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// // import Register from "./pages/Register.jsx";

// // ── lerp helper ───────────────────────────────────────────────
// const lerp = (a, b, t) => a + (b - a) * t;

// // ── Custom Cursor ─────────────────────────────────────────────
// function CustomCursor() {
//   const dot  = useRef(null);
//   const ring = useRef(null);
//   const pos  = useRef({ x: 0, y: 0 });
//   const lag  = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
//     window.addEventListener("mousemove", onMove, { passive: true });

//     let raf;
//     const tick = () => {
//       lag.current.x = lerp(lag.current.x, pos.current.x, 0.11);
//       lag.current.y = lerp(lag.current.y, pos.current.y, 0.11);
//       if (dot.current) {
//         dot.current.style.left = pos.current.x + "px";
//         dot.current.style.top  = pos.current.y + "px";
//       }
//       if (ring.current) {
//         ring.current.style.left = lag.current.x + "px";
//         ring.current.style.top  = lag.current.y + "px";
//       }
//       raf = requestAnimationFrame(tick);
//     };
//     tick();

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(raf);
//     };
//   }, []);

//   return (
//     <>
//       {/* Inner dot */}
//       <div ref={dot} style={{
//         position: "fixed",
//         width: "7px", height: "7px",
//         borderRadius: "50%",
//         background: "#2A6FA8",
//         transform: "translate(-50%, -50%)",
//         zIndex: 99999,
//         pointerEvents: "none",
//         mixBlendMode: "difference",
//       }} />
//       {/* Lagging ring */}
//       <div ref={ring} style={{
//         position: "fixed",
//         width: "34px", height: "34px",
//         borderRadius: "50%",
//         border: "1.5px solid rgba(42, 111, 168, 0.7)",
//         transform: "translate(-50%, -50%)",
//         zIndex: 99998,
//         pointerEvents: "none",
//         transition: "transform 0.25s ease",
//       }} />
//     </>
//   );
// }

// // ── Animated Road SVG Divider ─────────────────────────────────
// // flip=false → sits on a dark (#0A0A0F) bg  → use between two dark sections
// // flip=true  → sits on a cream (#F0EBE0) bg → use between two light sections
// function RoadDivider({ flip = false }) {
//   const id = flip ? "flip" : "norm";
//   return (
//     <div style={{
//       background: flip ? "#F0EBE0" : "#0A0A0F",
//       overflow: "hidden",
//       height: "90px",
//       position: "relative",
//     }}>
//       <svg
//         viewBox="0 0 1440 90"
//         preserveAspectRatio="none"
//         style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
//       >
//         <defs>
//           <linearGradient id={`rg-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%"   stopColor="#2A6FA8" stopOpacity="0" />
//             <stop offset="20%"  stopColor="#2A6FA8" stopOpacity="0.9" />
//             <stop offset="80%"  stopColor="#1A4A7A" stopOpacity="0.9" />
//             <stop offset="100%" stopColor="#1A4A7A" stopOpacity="0" />
//           </linearGradient>
//           <filter id={`glow-${id}`}>
//             <feGaussianBlur stdDeviation="2.5" result="b" />
//             <feMerge>
//               <feMergeNode in="b" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* Main morphing road line */}
//         <path
//           d="M-100,45 C250,12 550,78 900,45 C1150,18 1300,70 1540,45"
//           stroke={`url(#rg-${id})`}
//           strokeWidth="2.8"
//           fill="none"
//           filter={`url(#glow-${id})`}
//         >
//           <animate
//             attributeName="d"
//             values="
//               M-100,45 C250,12 550,78 900,45 C1150,18 1300,70 1540,45;
//               M-100,45 C200,75 550,18 900,45 C1200,70 1350,18 1540,45;
//               M-100,45 C250,12 550,78 900,45 C1150,18 1300,70 1540,45
//             "
//             dur="6s"
//             repeatCount="indefinite"
//           />
//         </path>

//         {/* Secondary faint line */}
//         <path
//           d="M-100,58 C250,25 550,90 900,58 C1150,32 1300,82 1540,58"
//           stroke="#2A6FA8"
//           strokeWidth="1"
//           fill="none"
//           opacity="0.3"
//         >
//           <animate
//             attributeName="d"
//             values="
//               M-100,58 C250,25 550,90 900,58 C1150,32 1300,82 1540,58;
//               M-100,58 C200,88 550,28 900,58 C1200,82 1350,32 1540,58;
//               M-100,58 C250,25 550,90 900,58 C1150,32 1300,82 1540,58
//             "
//             dur="8s"
//             begin="-2s"
//             repeatCount="indefinite"
//           />
//         </path>

//         {/* Moving glowing dot along the path */}
//         <circle r="4" fill="#7EC8F0" opacity="0.95">
//           <animateMotion dur="4s" repeatCount="indefinite">
//             <mpath href={`#rp-${id}`} />
//           </animateMotion>
//         </circle>
//         <path
//           id={`rp-${id}`}
//           d="M-100,45 C250,12 550,78 900,45 C1150,18 1300,70 1540,45"
//           fill="none"
//           stroke="none"
//         />

//         {/* Horizontal speed streaks */}
//         {[16, 30, 45, 62, 76].map((y, i) => (
//           <line
//             key={i}
//             x1="1600" y1={y}
//             x2="2200" y2={y}
//             stroke="#2A6FA8"
//             strokeWidth="0.6"
//             opacity="0.15"
//           >
//             <animate
//               attributeName="x1"
//               values="1600;-800"
//               dur={`${1.8 + i * 0.35}s`}
//               repeatCount="indefinite"
//             />
//             <animate
//               attributeName="x2"
//               values="2200;-200"
//               dur={`${1.8 + i * 0.35}s`}
//               repeatCount="indefinite"
//             />
//           </line>
//         ))}
//       </svg>
//     </div>
//   );
// }

// // ── Global style injection ────────────────────────────────────
// function GlobalStyles() {
//   return (
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
//       body {
//         cursor: none;
//         overflow-x: hidden;
//         -webkit-font-smoothing: antialiased;
//       }
//       a, button, [role=button] { cursor: none; }
//       ::-webkit-scrollbar { width: 4px; }
//       ::-webkit-scrollbar-track { background: #0A0A0F; }
//       ::-webkit-scrollbar-thumb { background: #1A4A7A; border-radius: 4px; }
//       ::-webkit-scrollbar-thumb:hover { background: #2A6FA8; }
//     `}</style>
//   );
// }

// // ── Home page — sections with road dividers between them ──────
// function HomePage() {
//   return (
//     <>
//       <HeroSection />
//       <RoadDivider flip={false} />
//       <WhyChooseUs />
//       <RoadDivider flip={false} />
//       <HowItWorks />
//       <RoadDivider flip={true} />
//       <OurServices />
//       <RoadDivider flip={false} />
//       <Testimonials />
//       <RoadDivider flip={true} />
//       <Subscription />
//     </>
//   );
// }

// // ── App ───────────────────────────────────────────────────────
// function App() {
//   return (
//     <BrowserRouter>
//       <GlobalStyles />
//       <CustomCursor />
//       <Toaster position="top-right" />
//       <Navbar />
//       <ScrollToTop />
//       <Routes>
//         <Route path="/"                           element={<HomePage />} />
//         <Route path="/about"                      element={<About />} />
//         <Route path="/gallery"                    element={<Gallery />} />
//         <Route path="/services"                   element={<Services />} />
//         <Route path="/services/oil-change"        element={<OilChange />} />
//         <Route path="/book"                       element={<BookingForm />} />
//         <Route path="/services/accidental-repair" element={<AccidentalRepair />} />
//         <Route path="/services/spare-parts"       element={<SpareParts />} />
//         <Route path="/services/ras-service-page"  element={<RSAServicePage />} />
//         <Route path="/services/engine-repair"     element={<EngineRepairPage />} />
//         <Route path="/services/tire-services"     element={<TireServices />} />
//         <Route path="/contact"                    element={<Contact />} />
//         <Route path="/team"                       element={<Team />} />
//         <Route path="/careers"                    element={<Careers />} />
//         <Route path="/blog"                       element={<Blog />} />
//         <Route path="/login"                      element={<Login />} />
//         {/* <Route path="/register" element={<Register />} /> */}
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;










// Second transition 


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";

import ScrollToTop    from "./components/ScrollToTop.jsx";
import Navbar         from "./components/Navbar.jsx";
import Footer         from "./components/Footer.jsx";
import HeroSection    from "./components/HeroSection.jsx";
import WhyChooseUs    from "./components/WhyChooseUs.jsx";
import HowItWorks     from "./components/HowItWorks.jsx";
import OurServices    from "./components/Our_services.jsx";
import Testimonials   from "./components/Testimonials.jsx";
import Subscription   from "./components/Subscription.jsx";
import Button         from "./components/Button.jsx";

import About          from "./pages/About.jsx";
import Gallery        from "./pages/Gallery.jsx";
import Services       from "./pages/Services.jsx";
import ServiceCard    from "./components/ServiceCard.jsx";
import OilChange      from "./pages/OilChange";
import BookingForm    from "./components/BookingForm";
import AccidentalRepair from "./pages/AccidentalRepair";
import Contact        from "./pages/Contact";
import SpareParts     from "./pages/SpareParts.jsx";
import RSAServicePage from "./pages/RSAServicePage.jsx";
import EngineRepairPage from "./pages/EngineRepairPage.jsx";
import TireServices   from "./pages/TireServices.jsx";
import Team           from "./pages/Team.jsx";
import Careers        from "./pages/Careers.jsx";
import Blog           from "./pages/Blog.jsx";
import Login          from "./pages/Login.jsx";
import Dashboard      from "./pages/Dashboard.jsx";
// import Register from "./pages/Register.jsx";

import "./App.css";

// ── Smooth lerp helper ────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: -100, y: -100 });
  const lag  = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      lag.current.x = lerp(lag.current.x, pos.current.x, 0.11);
      lag.current.y = lerp(lag.current.y, pos.current.y, 0.11);
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top  = pos.current.y + "px";
      }
      if (ring.current) {
        ring.current.style.left = lag.current.x + "px";
        ring.current.style.top  = lag.current.y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Scale ring on hover over interactive elements
    const grow = ()   => { if (ring.current) ring.current.style.transform = "translate(-50%,-50%) scale(1.9)"; };
    const shrink = () => { if (ring.current) ring.current.style.transform = "translate(-50%,-50%) scale(1)"; };
    const addListeners = () => {
      document.querySelectorAll("a,button,[role=button]").forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    };
    addListeners();
    // Re-attach on route change via MutationObserver
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:"fixed", width:"7px", height:"7px", borderRadius:"50%",
        background:"#2A6FA8", transform:"translate(-50%,-50%)",
        zIndex:99999, pointerEvents:"none", mixBlendMode:"difference",
        willChange:"left,top",
      }}/>
      <div ref={ring} style={{
        position:"fixed", width:"34px", height:"34px", borderRadius:"50%",
        border:"1.5px solid rgba(42,111,168,0.75)",
        transform:"translate(-50%,-50%)",
        zIndex:99998, pointerEvents:"none",
        transition:"transform 0.28s cubic-bezier(0.22,1,0.36,1)",
        willChange:"left,top",
      }}/>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SCROLL REVEAL — attaches IntersectionObserver to .reveal elements
// ─────────────────────────────────────────────────────────────
function ScrollRevealInit() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    const attach = () =>
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

// ─────────────────────────────────────────────────────────────
// ANIMATED ROAD DIVIDER
// flip=false → dark bg (between dark sections)
// flip=true  → cream bg (between light sections)
// ─────────────────────────────────────────────────────────────
function RoadDivider({ flip = false }) {
  const id = flip ? "f" : "n";
  return (
    <div style={{
      background: flip ? "#F0EBE0" : "#08090F",
      overflow:"hidden", height:"88px", position:"relative",
      flexShrink:0,
    }}>
      <svg viewBox="0 0 1440 88" preserveAspectRatio="none"
        style={{ width:"100%", height:"100%", position:"absolute", inset:0 }}>
        <defs>
          <linearGradient id={`rd-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#2A6FA8" stopOpacity="0"/>
            <stop offset="20%"  stopColor="#2A6FA8" stopOpacity="0.9"/>
            <stop offset="80%"  stopColor="#1A4A7A" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#1A4A7A" stopOpacity="0"/>
          </linearGradient>
          <filter id={`gf-${id}`}>
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Main morphing line */}
        <path d="M-100,44 C250,11 550,77 900,44 C1150,17 1300,69 1540,44"
          stroke={`url(#rd-${id})`} strokeWidth="2.8" fill="none" filter={`url(#gf-${id})`}>
          <animate attributeName="d" dur="6s" repeatCount="indefinite" values="
            M-100,44 C250,11 550,77 900,44 C1150,17 1300,69 1540,44;
            M-100,44 C200,74 550,17 900,44 C1200,69 1350,17 1540,44;
            M-100,44 C250,11 550,77 900,44 C1150,17 1300,69 1540,44"/>
        </path>

        {/* Secondary faint line */}
        <path d="M-100,57 C250,24 550,89 900,57 C1150,31 1300,81 1540,57"
          stroke="#2A6FA8" strokeWidth="1" fill="none" opacity="0.3">
          <animate attributeName="d" dur="8s" begin="-2s" repeatCount="indefinite" values="
            M-100,57 C250,24 550,89 900,57 C1150,31 1300,81 1540,57;
            M-100,57 C200,87 550,27 900,57 C1200,81 1350,31 1540,57;
            M-100,57 C250,24 550,89 900,57 C1150,31 1300,81 1540,57"/>
        </path>

        {/* Moving glowing dot */}
        <circle r="4" fill="#7EC8F0" opacity="0.95">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href={`#rp-${id}`}/>
          </animateMotion>
        </circle>
        <path id={`rp-${id}`} d="M-100,44 C250,11 550,77 900,44 C1150,17 1300,69 1540,44" fill="none" stroke="none"/>

        {/* Speed streaks */}
        {[15,29,44,61,75].map((y,i)=>(
          <line key={i} x1="1600" y1={y} x2="2200" y2={y} stroke="#2A6FA8" strokeWidth="0.6" opacity="0.14">
            <animate attributeName="x1" values="1600;-800" dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
            <animate attributeName="x2" values="2200;-200" dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
          </line>
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE — sections with road dividers between them
// ─────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <HeroSection />
      <RoadDivider flip={false} />
      <WhyChooseUs />
      <RoadDivider flip={false} />
      <HowItWorks />
      <RoadDivider flip={true} />
      <OurServices />
      <RoadDivider flip={false} />
      <Testimonials />
      <RoadDivider flip={true} />
      <Subscription />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      {/* Global utilities — render once, affect whole app */}
      <CustomCursor />
      <ScrollRevealInit />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background:"rgba(13,21,32,0.95)",
            color:"#F0EBE0",
            border:"1px solid rgba(42,111,168,0.3)",
            backdropFilter:"blur(16px)",
            borderRadius:"12px",
            fontSize:"0.875rem",
          },
        }}
      />
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/"                           element={<HomePage />} />
        <Route path="/about"                      element={<About />} />
        <Route path="/gallery"                    element={<Gallery />} />
        <Route path="/services"                   element={<Services />} />
        <Route path="/services/oil-change"        element={<OilChange />} />
        <Route path="/book"                       element={<BookingForm />} />
        <Route path="/services/accidental-repair" element={<AccidentalRepair />} />
        <Route path="/services/spare-parts"       element={<SpareParts />} />
        <Route path="/services/ras-service-page"  element={<RSAServicePage />} />
        <Route path="/services/engine-repair"     element={<EngineRepairPage />} />
        <Route path="/services/tire-services"     element={<TireServices />} />
        <Route path="/contact"                    element={<Contact />} />
        <Route path="/team"                       element={<Team />} />
        <Route path="/careers"                    element={<Careers />} />
        <Route path="/blog"                       element={<Blog />} />
        <Route path="/login"                      element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;