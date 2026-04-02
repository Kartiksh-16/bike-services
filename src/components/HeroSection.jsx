import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Button from "./Button";

// 3D Bike Component
function Bike() {
  const { scene } = useGLTF("/sports_bike.glb");
  const bikeRef = useRef();

  // Apply black color to all red parts
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        if (m && m.color) {
          const { r, g, b } = m.color;
          if (r > 0.4 && g < 0.35 && b < 0.35) {
            m.color.set(0x080808);
            m.roughness = 0.3;
            m.metalness = 0.75;
          }
        }
      });
    }
  });

  return (
    <primitive
      ref={bikeRef}
      object={scene}
      scale={1.5}
      position={[0, -0.8, 0]}
      rotation={[0, Math.PI / 5, 0]}
    />
  );
}

function HeroSection() {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
      
      {/* Left side */}
      <div className="flex-1 flex flex-col justify-center max-w-xl">
        <p className="text-steel font-bold text-2xl uppercase mb-5 text-left tracking-widest">
          Trusted Auto Experts
        </p>
        <h1 className="text-dark text-left text-5xl font-black leading-tight !mb-3 !mt-3 drop-shadow-lg">
          Premium
          <span className="text-steel"> Bike </span>
          Services
        </h1>
        <p className="text-lg leading-tight !mb-5 max-w-xl text-left">
          We provide top quality bike repair, oil changes, tire replacement and
          full inspections. Your bike deserves the best care.
        </p>
        <Button label="Book a Service" className="w-fit mx-auto" />
      </div>

      {/* Right side — 3D Bike */}
      <div className="flex-1 w-full h-[500px]">
        <Canvas
          camera={{ position: [3, 1.2, 3], fov: 45 }}
          style={{ background: "transparent" }}
          shadows
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-5, 3, -3]} intensity={0.6} />
          <directionalLight position={[0, 6, -8]} intensity={0.9} />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Bike */}
          <Suspense fallback={null}>
            <Bike />
            <ContactShadows
              position={[0, -0.85, 0]}
              opacity={0.35}
              scale={6}
              blur={2}
              far={4}
            />
          </Suspense>

          {/* Controls — only rotate, no pan */}
          <OrbitControls
            autoRotate
            autoRotateSpeed={1.2}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>
    </section>
  );
}

export default HeroSection;