// HeroSection.jsx — Full 3D Hero with:
//  • Cursor-driven bike rotation + incline (X/Z tilt)
//  • Animated glowing path ring beneath the bike
//  • Bike recolored to match site theme (#0A1628 deep navy + steel blue accents)
//  • Scroll-driven camera dolly (unchanged)
//  • Mouse parallax on camera

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ── Module-level shared state (no re-renders) ─────────────────
export const scroll = { target: 0, smooth: 0 };
export const mouse  = { x: 0, y: 0, sx: 0, sy: 0 }; // sx/sy = smoothed

// ── Scroll keyframes ──────────────────────────────────────────
export const SECTIONS = [
  {
    tag:       "TRUSTED AUTO EXPERTS",
    heading:   "Premium\nBike Services",
    sub:       "Top quality repair, oil changes, tire replacement & full inspections.",
    cta:       false,
    camPos:    [0,    1.8,  12 ],
    camTarget: [0,    0.5,  0  ],
    bikeRotY:  Math.PI / 5,
    bikeRotX:  -0.10,
    bg:        "#08090f",
  },
  {
    tag:       "PRECISION WORK",
    heading:   "Every Detail\nMatters",
    sub:       "Precision-tuned by certified mechanics who care.",
    cta:       false,
    camPos:    [1.5,  1.4,  8  ],
    camTarget: [0,    0.5,  0  ],
    bikeRotY:  0.2,
    bikeRotX:  -0.14,
    bg:        "#0e0a06",
  },
  {
    tag:       "PERFORMANCE",
    heading:   "Engineered\nFor Thrill",
    sub:       "Track-grade servicing brought to your doorstep.",
    cta:       false,
    camPos:    [-1.5, 1.0,  5.5],
    camTarget: [0,    0.4,  0  ],
    bikeRotY:  -0.2,
    bikeRotX:  -0.16,
    bg:        "#060810",
  },
  {
    tag:       "CRAFTSMANSHIP",
    heading:   "Masters\nOf The Machine",
    sub:       "Decades of experience. Unmatched expertise.",
    cta:       false,
    camPos:    [0,    0.6,  3.2],
    camTarget: [0,    0.3,  0  ],
    bikeRotY:  0,
    bikeRotX:  -0.12,
    bg:        "#0c0808",
  },
  {
    tag:       "BOOK NOW",
    heading:   "Your Bike\nAwaits",
    sub:       "Expert hands. Guaranteed results. Book today.",
    cta:       true,
    camPos:    [2,    1.5,  5  ],
    camTarget: [0,    0.6,  0  ],
    bikeRotY:  Math.PI / 6,
    bikeRotX:  -0.09,
    bg:        "#080808",
  },
];

// ── Helpers ───────────────────────────────────────────────────
export const lerp      = (a, b, t) => a + (b - a) * t;
export const clamp     = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const easeInOut = (t) => t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;

function getKF(progress, key) {
  const max = SECTIONS.length - 1;
  const raw = clamp(progress * max, 0, max);
  const lo  = Math.floor(clamp(raw, 0, max - 1));
  const hi  = lo + 1;
  const t   = easeInOut(clamp(raw - lo, 0, 1));
  const a   = SECTIONS[lo][key];
  const b   = SECTIONS[hi][key];
  if (Array.isArray(a)) return a.map((v, i) => lerp(v, b[i], t));
  return lerp(a, b, t);
}

// ── Camera ────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const posVec = useRef(new THREE.Vector3(0, 1.8, 12));

  useFrame((_, delta) => {
    const p   = scroll.smooth;
    const spd = 1 - Math.pow(0.015, delta);

    posVec.current.set(...getKF(p, "camPos"));
    // Subtle mouse parallax on camera position
    posVec.current.x += mouse.sx * 0.35;
    posVec.current.y += mouse.sy * 0.15;

    camera.position.lerp(posVec.current, spd);
    lookAt.current.set(...getKF(p, "camTarget"));
    camera.lookAt(lookAt.current);
    camera.position.y += Math.sin(Date.now() * 0.0005) * 0.003;
  });

  return null;
}

// ── Bike — recolored to dark navy + steel blue theme ─────────
function Bike() {
  const { scene } = useGLTF("/sports_bike_white.glb");
  const ref = useRef();

  useEffect(() => {
    const BODY_COLOR   = new THREE.Color("#0D1F35"); // deep navy
    const ACCENT_COLOR = new THREE.Color("#1A4A7A"); // steel blue
    const CHROME_COLOR = new THREE.Color("#8AACCC"); // cool chrome

    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat.color) return;
        const { r, g, b } = mat.color;
        // Red / orange / yellow → navy body
        if (r > 0.45 && g < 0.45) {
          mat.color.set(BODY_COLOR);
          mat.metalness = 0.9;
          mat.roughness = 0.15;
        // White / bright grey → chrome
        } else if (r > 0.7 && g > 0.7 && b > 0.7) {
          mat.color.set(CHROME_COLOR);
          mat.metalness = 1.0;
          mat.roughness = 0.05;
        // Mid tones → accent steel blue
        } else if (r > 0.25 || g > 0.25) {
          mat.color.set(ACCENT_COLOR);
          mat.metalness = 0.8;
          mat.roughness = 0.2;
        }
      });
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const spd = 1 - Math.pow(0.015, delta);
    // Y: scroll keyframe + cursor left/right
    const tY = getKF(scroll.smooth, "bikeRotY") + mouse.sx * 0.4;
    ref.current.rotation.y = lerp(ref.current.rotation.y, tY, spd);
    // X: scroll keyframe incline + cursor up/down  
    const tX = getKF(scroll.smooth, "bikeRotX") + mouse.sy * 0.15;
    ref.current.rotation.x = lerp(ref.current.rotation.x, tX, spd);
    // Z: slight roll with cursor horizontal
    const tZ = mouse.sx * -0.07;
    ref.current.rotation.z = lerp(ref.current.rotation.z, tZ, spd);
  });

  return (
    <primitive ref={ref} object={scene} scale={1.5} position={[0, -0.85, 0]} />
  );
}

// ── Dynamic Lights ────────────────────────────────────────────
const RIM  = [[1.0,0.91,0.69],[1.0,0.55,0.1],[0.4,0.7,1.0],[0.9,0.2,0.1],[1.0,0.91,0.69]];
const GLOW = [[0.13,0.27,1.0],[0.5,0.15,0.02],[0.05,0.3,0.8],[0.4,0.05,0.02],[0.13,0.27,1.0]];

function DynamicLights() {
  const rim  = useRef();
  const glow = useRef();

  useFrame((_, delta) => {
    const p   = scroll.smooth;
    const max = SECTIONS.length - 1;
    const raw = clamp(p * max, 0, max);
    const lo  = Math.floor(clamp(raw, 0, max - 1));
    const hi  = lo + 1;
    const t   = easeInOut(clamp(raw - lo, 0, 1));
    const spd = 1 - Math.pow(0.005, delta);

    const rc = RIM[lo].map((v, i)  => lerp(v, RIM[hi][i],  t));
    const gc = GLOW[lo].map((v, i) => lerp(v, GLOW[hi][i], t));
    rim.current?.color.lerp(new THREE.Color(...rc), spd);
    glow.current?.color.lerp(new THREE.Color(...gc), spd);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight ref={rim}  position={[-5, 4, -6]}  intensity={2.8} castShadow />
      <spotLight                    position={[0,  6,  6]}  intensity={4.5} angle={0.4} penumbra={0.6} castShadow />
      <pointLight       ref={glow} position={[0, -0.7, 0]} intensity={1.8} distance={6} />
      {/* Steel blue fill from front-right */}
      <pointLight color="#1A4A7A" position={[3, 2, 4]}  intensity={2} distance={8} />
    </>
  );
}

// ── Animated Path Ring beneath the bike ───────────────────────
function BikePathRing() {
  const groupRef = useRef();
  const matRef   = useRef();
  const phase    = useRef(0);

  // Build a flattened ellipse path
  const curve = new THREE.EllipseCurve(0, 0, 2.2, 0.7, 0, Math.PI * 2, false, 0);
  const pts2d = curve.getPoints(120);
  const pts3d = pts2d.map(p => new THREE.Vector3(p.x, 0, p.y));
  const path  = new THREE.CatmullRomCurve3(pts3d, true);
  const tubeGeo = new THREE.TubeGeometry(path, 200, 0.018, 5, true);

  // Dash material simulation via custom shader or just alpha + dashOffset trick
  useFrame((_, delta) => {
    phase.current += delta * 1.1;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    // Pulse opacity
    if (matRef.current) {
      matRef.current.opacity = 0.35 + Math.sin(phase.current * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.87, 0]}>
      {/* Outer glow ring */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial
          ref={matRef}
          color="#2A6FA8"
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
      {/* Inner bright core — thinner */}
      <mesh geometry={new THREE.TubeGeometry(path, 200, 0.006, 4, true)}>
        <meshBasicMaterial color="#7EC8F0" transparent opacity={0.9} depthWrite={false} />
      </mesh>
      {/* Ground glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[2.4, 64]} />
        <meshBasicMaterial color="#1A4A7A" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Moving Dot on the path ─────────────────────────────────────
function PathDot() {
  const ref   = useRef();
  const t     = useRef(0);
  const curve = new THREE.EllipseCurve(0, 0, 2.2, 0.7, 0, Math.PI * 2, false, 0);
  const pts2d = curve.getPoints(120);
  const pts3d = pts2d.map(p => new THREE.Vector3(p.x, 0, p.y));
  const path  = new THREE.CatmullRomCurve3(pts3d, true);

  useFrame((_, delta) => {
    t.current = (t.current + delta * 0.22) % 1;
    if (ref.current) {
      const pos = path.getPointAt(t.current);
      ref.current.position.set(pos.x, -0.87, pos.z);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color="#7EC8F0" />
    </mesh>
  );
}

// ── Particles ─────────────────────────────────────────────────
function Particles() {
  const ref = useRef();
  const geo = useRef(new THREE.BufferGeometry());

  useEffect(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 18;
    geo.current.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00025;
      ref.current.rotation.x += 0.00010;
    }
  });

  return (
    <points ref={ref} geometry={geo.current}>
      <pointsMaterial color="#2A6FA8" size={0.025} transparent opacity={0.32} depthWrite={false} />
    </points>
  );
}

// ── Main HeroSection ──────────────────────────────────────────
export default function HeroSection() {
  const containerRef           = useRef(null);
  const [activeIdx, setActive] = useState(0);
  const [bgColor, setBg]       = useState(SECTIONS[0].bg);
  const [visible, setVisible]  = useState(false);
  const [showHint, setHint]    = useState(true);

  useEffect(() => {
    // Mouse tracking
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // rAF: smooth scroll + smooth mouse
    let raf;
    const tick = () => {
      scroll.smooth = lerp(scroll.smooth, scroll.target, 0.055);
      mouse.sx      = lerp(mouse.sx, mouse.x, 0.08);
      mouse.sy      = lerp(mouse.sy, mouse.y, 0.08);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect            = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      const scrolled        = -rect.top;
      const progress        = clamp(scrolled / totalScrollable, 0, 1);
      scroll.target = progress;
      const idx = Math.round(progress * (SECTIONS.length - 1));
      setActive(idx);
      setBg(SECTIONS[idx].bg);
      setHint(scrolled < 60);
      setVisible(rect.top < window.innerHeight && rect.bottom > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (i) => {
    const el = containerRef.current;
    if (!el) return;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetScroll    = el.offsetTop + (i / (SECTIONS.length - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed canvas layer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 10,
        display: visible ? "block" : "none",
        pointerEvents: "none",
      }}>
        {/* BG */}
        <div style={{ position:"absolute", inset:0, background:bgColor, transition:"background 1.2s ease" }} />
        {/* Vignette */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
        {/* Cinematic bars */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"5.5vh", background:"rgba(0,0,0,0.82)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"5.5vh", background:"rgba(0,0,0,0.82)" }} />

        {/* 3D Canvas */}
        <Canvas
          camera={{ position:[0, 1.8, 12], fov:48 }}
          style={{ background:"transparent", position:"absolute", inset:0 }}
          shadows
        >
          <CameraRig />
          <DynamicLights />
          <Particles />
          <Environment preset="city" />
          <BikePathRing />
          <PathDot />
          <Suspense fallback={null}>
            <Bike />
            <ContactShadows position={[0,-0.88,0]} opacity={0.45} scale={9} blur={2.5} far={5} />
          </Suspense>
        </Canvas>

        {/* Text overlays */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{
              position:  "absolute",
              bottom:    "12%", left: "8%",
              maxWidth:  "520px",
              opacity:   activeIdx === i ? 1 : 0,
              transform: activeIdx === i ? "translateY(0)" : "translateY(22px)",
              transition:"opacity 0.65s ease, transform 0.65s ease",
              pointerEvents: activeIdx === i ? "auto" : "none",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"0.9rem" }}>
                <div style={{ width:"36px", height:"1px", background:"linear-gradient(90deg,#2A6FA8,transparent)" }} />
                <span style={{ color:"#2A6FA8", fontSize:"0.63rem", letterSpacing:"0.35em", fontFamily:"monospace" }}>{s.tag}</span>
              </div>

              <h1 style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:"clamp(2.2rem, 5.5vw, 4.8rem)",
                fontWeight:700, color:"#F0EBE0",
                lineHeight:1.05, letterSpacing:"0.03em",
                margin:0, textShadow:"0 4px 40px rgba(0,0,0,0.7)",
                whiteSpace:"pre-line",
              }}>{s.heading}</h1>

              <p style={{
                color:"#7A9CB8", fontSize:"clamp(0.85rem,1.4vw,1rem)",
                fontFamily:"'Playfair Display', serif", fontStyle:"italic",
                marginTop:"0.8rem", lineHeight:1.65,
              }}>{s.sub}</p>

              {s.cta && (
                <div style={{ marginTop:"1.8rem", pointerEvents:"all" }}>
                  <button style={{
                    background:"linear-gradient(135deg,#1A4A7A,#2A6FA8)",
                    color:"#F0EBE0", border:"none",
                    padding:"0.85rem 2.2rem", borderRadius:"10px",
                    fontFamily:"'Playfair Display', serif", fontSize:"1rem",
                    fontWeight:600, cursor:"pointer",
                    letterSpacing:"0.04em",
                    boxShadow:"0 0 35px rgba(42,111,168,0.5)",
                    transition:"box-shadow 0.3s, transform 0.2s",
                  }}
                    onMouseEnter={e=>{ e.target.style.boxShadow="0 0 55px rgba(42,111,168,0.8)"; e.target.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e=>{ e.target.style.boxShadow="0 0 35px rgba(42,111,168,0.5)"; e.target.style.transform="translateY(0)"; }}
                  >Book a Service</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section dots */}
        <div style={{
          position:"absolute", right:"2.5%", top:"50%",
          transform:"translateY(-50%)",
          display:"flex", flexDirection:"column", gap:"10px",
          pointerEvents:"all",
        }}>
          {SECTIONS.map((_, i) => (
            <div key={i} onClick={() => scrollToSection(i)} style={{
              width:      activeIdx===i ? "22px" : "6px",
              height:     "5px", borderRadius:"3px",
              background: activeIdx===i ? "#F0EBE0" : "rgba(255,255,255,0.2)",
              transition: "all 0.4s ease", cursor:"pointer",
            }} />
          ))}
        </div>

        {/* Counter */}
        <div style={{
          position:"absolute", top:"8%", left:"8%",
          color:"rgba(255,255,255,0.18)",
          fontSize:"0.6rem", letterSpacing:"0.35em", fontFamily:"monospace",
        }}>
          0{activeIdx+1} / 0{SECTIONS.length}
        </div>

        {/* Scroll hint */}
        <div style={{
          position:"absolute", bottom:"8%", left:"50%",
          transform:"translateX(-50%)",
          opacity: showHint ? 1 : 0, transition:"opacity 0.5s ease",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
        }}>
          <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.55rem", letterSpacing:"0.35em", fontFamily:"monospace" }}>SCROLL</span>
          <div style={{
            width:"1px", height:"34px",
            background:"linear-gradient(180deg,rgba(255,255,255,0.25),transparent)",
            animation:"hintPulse 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      {/* Scroll space */}
      <div ref={containerRef} style={{ height:`${SECTIONS.length * 100}vh`, position:"relative" }} />

      <style>{`
        @keyframes hintPulse {
          0%,100%{ opacity:0.2; transform:scaleY(0.5); transform-origin:top; }
          50%    { opacity:1;   transform:scaleY(1);   transform-origin:top; }
        }
      `}</style>
    </>
  );
}





// Second transition 




// HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
//  NEW BEHAVIOUR:
//  • Phase 0 (top): bike centered, no content text visible
//  • Phase 1 (scroll 0→30%): bike lerps RIGHT, content fades in on LEFT
//  • Phase 2 (scroll 30→100%): normal section keyframes (camera dolly)
//  • Cursor: moves mouse → bike rotates Y+X+Z smoothly
//  • Animated ellipse path ring below bike at all times
//  • Ultra-smooth CSS scroll + rAF lerp
// ─────────────────────────────────────────────────────────────────────────────

// import { Suspense, useRef, useState, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
// import * as THREE from "three";
// import Button from "./Button";

// // ── Module-level shared state (zero re-renders) ───────────────
// export const scroll = { target: 0, smooth: 0 };
// export const mouse  = { x: 0, y: 0, sx: 0, sy: 0 };

// // ── Section keyframes ─────────────────────────────────────────
// const SECTIONS = [
//   { tag:"TRUSTED AUTO EXPERTS", heading:"Premium\nBike Services",  sub:"Top quality repair, oil changes, tire replacement & full inspections.", cta:false, camPos:[0,1.8,12],   camTarget:[0,0.5,0], bikeRotY:Math.PI/5, bikeRotX:-0.08, bg:"#08090F" },
//   { tag:"PRECISION WORK",       heading:"Every Detail\nMatters",    sub:"Precision-tuned by certified mechanics who care.",                    cta:false, camPos:[1.5,1.4,8],  camTarget:[0,0.5,0], bikeRotY:0.2,       bikeRotX:-0.13, bg:"#0A0E16" },
//   { tag:"PERFORMANCE",          heading:"Engineered\nFor Thrill",   sub:"Track-grade servicing brought to your doorstep.",                    cta:false, camPos:[-1.5,1.0,5.5],camTarget:[0,0.4,0], bikeRotY:-0.2,      bikeRotX:-0.15, bg:"#060810" },
//   { tag:"CRAFTSMANSHIP",        heading:"Masters\nOf The Machine",  sub:"Decades of experience. Unmatched expertise.",                        cta:false, camPos:[0,0.6,3.2],   camTarget:[0,0.3,0], bikeRotY:0,         bikeRotX:-0.12, bg:"#0A0808" },
//   { tag:"BOOK NOW",             heading:"Your Bike\nAwaits",        sub:"Expert hands. Guaranteed results. Book today.",                      cta:true,  camPos:[2,1.5,5],     camTarget:[0,0.6,0], bikeRotY:Math.PI/6, bikeRotX:-0.08, bg:"#080808" },
// ];

// // ── Helpers ───────────────────────────────────────────────────
// const lerp      = (a, b, t) => a + (b - a) * t;
// const clamp     = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
// const easeOut   = (t) => 1 - Math.pow(1 - t, 3);
// const easeInOut = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// function getKF(progress, key) {
//   const max = SECTIONS.length - 1;
//   const raw = clamp(progress * max, 0, max);
//   const lo  = Math.floor(clamp(raw, 0, max - 1));
//   const hi  = lo + 1;
//   const t   = easeInOut(clamp(raw - lo, 0, 1));
//   const a   = SECTIONS[lo][key];
//   const b   = SECTIONS[hi][key];
//   if (Array.isArray(a)) return a.map((v, i) => lerp(v, b[i], t));
//   return lerp(a, b, t);
// }

// // ── Camera ────────────────────────────────────────────────────
// function CameraRig({ bikeOffset }) {
//   const { camera } = useThree();
//   const lookAt = useRef(new THREE.Vector3(0, 0.5, 0));
//   const posVec = useRef(new THREE.Vector3(0, 1.8, 12));

//   useFrame((_, delta) => {
//     const p   = scroll.smooth;
//     const spd = 1 - Math.pow(0.012, delta);

//     posVec.current.set(...getKF(p, "camPos"));
//     // Shift camera LEFT slightly when bike is on right
//     posVec.current.x += mouse.sx * 0.3 - bikeOffset.current * 0.8;
//     posVec.current.y += mouse.sy * 0.15;

//     camera.position.lerp(posVec.current, spd);
//     lookAt.current.set(...getKF(p, "camTarget"));
//     // Look slightly left of center when bike is on right
//     lookAt.current.x = lerp(lookAt.current.x, -bikeOffset.current * 0.4, spd);
//     camera.lookAt(lookAt.current);
//     camera.position.y += Math.sin(Date.now() * 0.0005) * 0.003;
//   });
//   return null;
// }

// // ── Bike — themed dark navy + steel chrome ────────────────────
// function Bike({ bikeOffset }) {
//   const { scene } = useGLTF("/sports_bike.glb");
//   const ref = useRef();

//   useEffect(() => {
//     const BODY    = new THREE.Color("#0D1F35");
//     const ACCENT  = new THREE.Color("#1A4A7A");
//     const CHROME  = new THREE.Color("#8AACCC");
//     scene.traverse((child) => {
//       if (!child.isMesh || !child.material) return;
//       const mats = Array.isArray(child.material) ? child.material : [child.material];
//       mats.forEach((mat) => {
//         if (!mat.color) return;
//         const { r, g, b } = mat.color;
//         if (r > 0.45 && g < 0.45) {
//           mat.color.set(BODY); mat.metalness = 0.9; mat.roughness = 0.15;
//         } else if (r > 0.7 && g > 0.7 && b > 0.7) {
//           mat.color.set(CHROME); mat.metalness = 1.0; mat.roughness = 0.04;
//         } else if (r > 0.25 || g > 0.25) {
//           mat.color.set(ACCENT); mat.metalness = 0.8; mat.roughness = 0.2;
//         }
//       });
//     });
//   }, [scene]);

//   useFrame((_, delta) => {
//     if (!ref.current) return;
//     const spd = 1 - Math.pow(0.012, delta);
//     // Y rotation: scroll keyframe + cursor
//     ref.current.rotation.y = lerp(ref.current.rotation.y, getKF(scroll.smooth, "bikeRotY") + mouse.sx * 0.4, spd);
//     // X tilt: scroll keyframe + cursor
//     ref.current.rotation.x = lerp(ref.current.rotation.x, getKF(scroll.smooth, "bikeRotX") + mouse.sy * 0.14, spd);
//     // Z lean with cursor
//     ref.current.rotation.z = lerp(ref.current.rotation.z, mouse.sx * -0.06, spd);
//     // X world position: slide right as bikeOffset increases
//     ref.current.position.x = lerp(ref.current.position.x, bikeOffset.current * 2.2, spd);
//   });

//   return <primitive ref={ref} object={scene} scale={1.5} position={[0, -0.85, 0]} />;
// }

// // ── Lights ────────────────────────────────────────────────────
// const RIM  = [[1.0,0.91,0.69],[1.0,0.55,0.1],[0.4,0.7,1.0],[0.9,0.2,0.1],[1.0,0.91,0.69]];
// const GLOW = [[0.13,0.27,1.0],[0.5,0.15,0.02],[0.05,0.3,0.8],[0.4,0.05,0.02],[0.13,0.27,1.0]];

// function DynamicLights() {
//   const rim = useRef(); const glow = useRef();
//   useFrame((_, delta) => {
//     const p   = scroll.smooth;
//     const max = SECTIONS.length - 1;
//     const raw = clamp(p * max, 0, max);
//     const lo  = Math.floor(clamp(raw, 0, max - 1));
//     const hi  = lo + 1;
//     const t   = easeInOut(clamp(raw - lo, 0, 1));
//     const spd = 1 - Math.pow(0.005, delta);
//     rim.current?.color.lerp(new THREE.Color(...RIM[lo].map((v,i)=>lerp(v,RIM[hi][i],t))), spd);
//     glow.current?.color.lerp(new THREE.Color(...GLOW[lo].map((v,i)=>lerp(v,GLOW[hi][i],t))), spd);
//   });
//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <directionalLight ref={rim}  position={[-5,4,-6]}  intensity={2.8} castShadow />
//       <spotLight                    position={[0,6,6]}   intensity={4.5} angle={0.4} penumbra={0.6} castShadow />
//       <pointLight       ref={glow} position={[0,-0.7,0]} intensity={1.8} distance={6} />
//       <pointLight color="#1A4A7A"   position={[3,2,4]}   intensity={2}   distance={8} />
//     </>
//   );
// }

// // ── Animated path ring + moving dot ───────────────────────────
// function BikePathRing() {
//   const groupRef = useRef(); const matRef = useRef(); const phase = useRef(0);
//   const curve  = new THREE.EllipseCurve(0,0,2.2,0.7,0,Math.PI*2,false,0);
//   const pts3d  = curve.getPoints(120).map(p => new THREE.Vector3(p.x, 0, p.y));
//   const path   = new THREE.CatmullRomCurve3(pts3d, true);
//   const tubeGeo = new THREE.TubeGeometry(path, 200, 0.018, 5, true);
//   const innerGeo = new THREE.TubeGeometry(path, 200, 0.006, 4, true);

//   useFrame((_, delta) => {
//     phase.current += delta * 1.1;
//     if (groupRef.current) groupRef.current.rotation.y += delta * 0.35;
//     if (matRef.current)   matRef.current.opacity = 0.35 + Math.sin(phase.current * 2) * 0.18;
//   });

//   return (
//     <group ref={groupRef} position={[0,-0.87,0]}>
//       <mesh geometry={tubeGeo}>
//         <meshBasicMaterial ref={matRef} color="#2A6FA8" transparent opacity={0.45} depthWrite={false} />
//       </mesh>
//       <mesh geometry={innerGeo}>
//         <meshBasicMaterial color="#7EC8F0" transparent opacity={0.9} depthWrite={false} />
//       </mesh>
//       <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]}>
//         <circleGeometry args={[2.5, 64]} />
//         <meshBasicMaterial color="#1A4A7A" transparent opacity={0.07} depthWrite={false} />
//       </mesh>
//     </group>
//   );
// }

// function PathDot() {
//   const ref  = useRef(); const t = useRef(0);
//   const curve = new THREE.EllipseCurve(0,0,2.2,0.7,0,Math.PI*2,false,0);
//   const path  = new THREE.CatmullRomCurve3(curve.getPoints(120).map(p=>new THREE.Vector3(p.x,0,p.y)),true);
//   useFrame((_, delta) => {
//     t.current = (t.current + delta * 0.22) % 1;
//     if (ref.current) { const p = path.getPointAt(t.current); ref.current.position.set(p.x,-0.87,p.z); }
//   });
//   return (
//     <mesh ref={ref}><sphereGeometry args={[0.045,12,12]} /><meshBasicMaterial color="#7EC8F0" /></mesh>
//   );
// }

// // ── Particles ─────────────────────────────────────────────────
// function Particles() {
//   const ref = useRef(); const geo = useRef(new THREE.BufferGeometry());
//   useEffect(() => {
//     const arr = new Float32Array(500*3);
//     for (let i=0;i<arr.length;i++) arr[i]=(Math.random()-0.5)*18;
//     geo.current.setAttribute("position", new THREE.BufferAttribute(arr,3));
//   },[]);
//   useFrame(()=>{ if(ref.current){ref.current.rotation.y+=0.00025;ref.current.rotation.x+=0.0001;} });
//   return (
//     <points ref={ref} geometry={geo.current}>
//       <pointsMaterial color="#2A6FA8" size={0.025} transparent opacity={0.32} depthWrite={false} />
//     </points>
//   );
// }

// // ── Main HeroSection ──────────────────────────────────────────
// export default function HeroSection() {
//   const containerRef = useRef(null);
//   const bikeOffset   = useRef(0); // 0=center, 1=right
//   const [activeIdx, setActive]   = useState(0);
//   const [bgColor,   setBg]       = useState(SECTIONS[0].bg);
//   const [visible,   setVisible]  = useState(false);
//   const [showHint,  setHint]     = useState(true);
//   // Content panel visibility (0→1 as bike slides right)
//   const [contentAlpha, setContentAlpha] = useState(0);
//   const [bikeOffsetState, setBikeOffsetState] = useState(0);

//   useEffect(() => {
//     // Mouse tracking
//     const onMouse = (e) => {
//       mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
//       mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
//     };
//     window.addEventListener("mousemove", onMouse, { passive: true });

//     // rAF: smooth scroll + smooth mouse
//     let raf;
//     const tick = () => {
//       scroll.smooth = lerp(scroll.smooth, scroll.target, 0.06);
//       mouse.sx      = lerp(mouse.sx, mouse.x, 0.08);
//       mouse.sy      = lerp(mouse.sy, mouse.y, 0.08);

//       // bikeOffset: 0 at top, ramps to 1 by 30% scroll
//       const offsetTarget = clamp(scroll.smooth / 0.3, 0, 1);
//       bikeOffset.current = lerp(bikeOffset.current, offsetTarget, 0.05);
//       setBikeOffsetState(bikeOffset.current);
//       setContentAlpha(easeOut(clamp(bikeOffset.current, 0, 1)));

//       raf = requestAnimationFrame(tick);
//     };
//     tick();

//     const onScroll = () => {
//       const el = containerRef.current;
//       if (!el) return;
//       const rect            = el.getBoundingClientRect();
//       const totalScrollable = el.offsetHeight - window.innerHeight;
//       const scrolled        = -rect.top;
//       const progress        = clamp(scrolled / totalScrollable, 0, 1);
//       scroll.target = progress;
//       setActive(Math.round(progress * (SECTIONS.length - 1)));
//       setBg(SECTIONS[Math.round(progress * (SECTIONS.length - 1))].bg);
//       setHint(scrolled < 60);
//       setVisible(rect.top < window.innerHeight && rect.bottom > 0);
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("mousemove", onMouse);
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, []);

//   const scrollToSection = (i) => {
//     const el = containerRef.current;
//     if (!el) return;
//     const totalScrollable = el.offsetHeight - window.innerHeight;
//     window.scrollTo({ top: el.offsetTop + (i / (SECTIONS.length-1)) * totalScrollable, behavior:"smooth" });
//   };

//   return (
//     <>
//       {/* ── Fixed 3D canvas layer ────────────────────────── */}
//       <div style={{
//         position:"fixed", inset:0, zIndex:10,
//         display: visible ? "block" : "none",
//         pointerEvents:"none",
//       }}>
//         {/* BG */}
//         <div style={{ position:"absolute", inset:0, background:bgColor, transition:"background 1.2s ease" }} />
//         {/* Vignette */}
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 70% 50%, transparent 20%, rgba(0,0,0,0.88) 100%)" }} />
//         {/* Cinematic bars */}
//         <div style={{ position:"absolute", top:0,    left:0, right:0, height:"5.5vh", background:"rgba(0,0,0,0.82)" }} />
//         <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"5.5vh", background:"rgba(0,0,0,0.82)" }} />

//         {/* 3D Canvas */}
//         <Canvas camera={{ position:[0,1.8,12], fov:48 }} style={{ position:"absolute", inset:0, background:"transparent" }} shadows>
//           <CameraRig bikeOffset={bikeOffset} />
//           <DynamicLights />
//           <Particles />
//           <BikePathRing />
//           <PathDot />
//           <Environment preset="city" />
//           <Suspense fallback={null}>
//             <Bike bikeOffset={bikeOffset} />
//             <ContactShadows position={[0,-0.88,0]} opacity={0.45} scale={10} blur={2.5} far={5} />
//           </Suspense>
//         </Canvas>

//         {/* ── LEFT content panel — fades in as bike slides right ── */}
//         <div style={{
//           position:"absolute", inset:0,
//           display:"flex", alignItems:"center",
//           paddingLeft:"7%", paddingRight:"52%",
//           pointerEvents:"none",
//         }}>
//           {SECTIONS.map((s, i) => (
//             <div key={i} style={{
//               position:"absolute", left:"7%", maxWidth:"480px",
//               opacity: activeIdx===i ? contentAlpha : 0,
//               transform: activeIdx===i
//                 ? `translateX(${(1-contentAlpha)*-30}px)`
//                 : "translateX(-30px)",
//               transition: "opacity 0.1s linear",
//               pointerEvents: activeIdx===i && contentAlpha > 0.5 ? "auto" : "none",
//             }}>
//               {/* Eyebrow */}
//               <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"1rem" }}>
//                 <div style={{ width:"32px", height:"1px", background:"linear-gradient(90deg,#2A6FA8,transparent)" }} />
//                 <span style={{ color:"#2A6FA8", fontSize:"0.62rem", letterSpacing:"0.38em", fontFamily:"monospace", textTransform:"uppercase" }}>{s.tag}</span>
//               </div>

//               {/* Heading */}
//               <h1 style={{
//                 fontFamily:"'Playfair Display', serif",
//                 fontSize:"clamp(2.4rem, 5vw, 5rem)",
//                 fontWeight:700, color:"#F0EBE0",
//                 lineHeight:1.05, letterSpacing:"0.02em",
//                 margin:0, textShadow:"0 4px 40px rgba(0,0,0,0.8)",
//                 whiteSpace:"pre-line",
//               }}>{s.heading}</h1>

//               {/* Sub */}
//               <p style={{
//                 color:"#7A9CB8", fontFamily:"'Playfair Display', serif",
//                 fontSize:"clamp(0.9rem,1.5vw,1.1rem)", fontStyle:"italic",
//                 marginTop:"1rem", lineHeight:1.7, maxWidth:"400px",
//               }}>{s.sub}</p>

//               {/* CTA */}
//               {s.cta && (
//                 <div style={{ marginTop:"2rem", pointerEvents:"all" }}>
//                   <Button label="Book a Service" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Section dots */}
//         <div style={{
//           position:"absolute", right:"2.5%", top:"50%", transform:"translateY(-50%)",
//           display:"flex", flexDirection:"column", gap:"10px", pointerEvents:"all",
//         }}>
//           {SECTIONS.map((_,i)=>(
//             <div key={i} onClick={()=>scrollToSection(i)} style={{
//               width: activeIdx===i ? "22px" : "6px", height:"5px", borderRadius:"3px",
//               background: activeIdx===i ? "#F0EBE0" : "rgba(255,255,255,0.2)",
//               transition:"all 0.4s ease", cursor:"pointer",
//             }}/>
//           ))}
//         </div>

//         {/* Section counter */}
//         <div style={{
//           position:"absolute", top:"8%", left:"7%",
//           color:"rgba(255,255,255,0.18)", fontSize:"0.6rem",
//           letterSpacing:"0.35em", fontFamily:"monospace",
//         }}>0{activeIdx+1} / 0{SECTIONS.length}</div>

//         {/* Scroll hint */}
//         <div style={{
//           position:"absolute", bottom:"8%", left:"50%",
//           transform:"translateX(-50%)",
//           opacity: showHint ? 1 : 0, transition:"opacity 0.5s ease",
//           display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
//         }}>
//           <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.55rem", letterSpacing:"0.35em", fontFamily:"monospace" }}>SCROLL</span>
//           <div style={{
//             width:"1px", height:"34px",
//             background:"linear-gradient(180deg,rgba(255,255,255,0.25),transparent)",
//             animation:"hintPulse 1.8s ease-in-out infinite",
//           }}/>
//         </div>
//       </div>

//       {/* ── Scroll space ─────────────────────────────────── */}
//       <div ref={containerRef} style={{ height:`${SECTIONS.length*100}vh`, position:"relative" }} />

//       <style>{`
//         @keyframes hintPulse {
//           0%,100%{ opacity:0.2; transform:scaleY(0.5); transform-origin:top; }
//           50%    { opacity:1;   transform:scaleY(1);   transform-origin:top; }
//         }
//       `}</style>
//     </>
//   );
// }