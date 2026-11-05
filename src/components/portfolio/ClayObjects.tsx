"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

// Glossy, soft "clay" 3D objects themed on marketing (brief §Section 3/4):
// a pen tile, a chat bubble and a camera. They float gently, rotate slowly and
// drift slightly with the cursor. Rendered only when motion is allowed — the
// sections fall back to static CSS shapes under reduced motion.

const COLORS = {
  ink: "#242424",
  inkSoft: "#343434",
  yellow: "#ffe862",
  orange: "#e8763a",
  cream: "#f7f1ed",
};

function clayMaterial(color: string, extra?: Partial<Record<string, number>>) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.35}
      metalness={0}
      clearcoat={0.8}
      clearcoatRoughness={0.4}
      {...extra}
    />
  );
}

// A note/pen tile.
function PenTile() {
  return (
    <group rotation={[0.3, 0.4, 0.1]}>
      <RoundedBox args={[1.5, 1.5, 0.4]} radius={0.22} smoothness={6}>
        {clayMaterial(COLORS.inkSoft)}
      </RoundedBox>
      <mesh position={[0, 0, 0.21]}>
        <torusGeometry args={[0.66, 0.05, 12, 40]} />
        {clayMaterial(COLORS.yellow)}
      </mesh>
      {/* pen */}
      <mesh position={[0.05, 0.05, 0.4]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.07, 0.07, 1.1, 16]} />
        {clayMaterial(COLORS.yellow)}
      </mesh>
      <mesh position={[0.45, 0.45, 0.4]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.07, 0.22, 16]} />
        {clayMaterial(COLORS.cream)}
      </mesh>
    </group>
  );
}

// A chat / social bubble.
function ChatBubble() {
  return (
    <group rotation={[0.2, -0.3, 0]}>
      <RoundedBox args={[1.5, 1.1, 0.5]} radius={0.5} smoothness={8}>
        {clayMaterial(COLORS.orange)}
      </RoundedBox>
      <mesh position={[-0.4, -0.7, 0]} rotation={[0, 0, 0.6]}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        {clayMaterial(COLORS.orange)}
      </mesh>
      {/* dots */}
      {[-0.4, 0, 0.4].map((x) => (
        <mesh key={x} position={[x, 0, 0.3]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          {clayMaterial(COLORS.cream)}
        </mesh>
      ))}
    </group>
  );
}

// A camera / visual-content object.
function Camera() {
  return (
    <group rotation={[0.3, 0.5, 0]}>
      <RoundedBox args={[1.6, 1.0, 0.7]} radius={0.16} smoothness={6}>
        {clayMaterial(COLORS.ink)}
      </RoundedBox>
      <mesh position={[0, 0, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.5, 32]} />
        {clayMaterial(COLORS.inkSoft)}
      </mesh>
      <mesh position={[0, 0, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 32]} />
        {clayMaterial(COLORS.yellow)}
      </mesh>
      {/* flash */}
      <RoundedBox args={[0.3, 0.2, 0.1]} radius={0.04} position={[0.5, 0.6, 0.2]}>
        {clayMaterial(COLORS.yellow)}
      </RoundedBox>
    </group>
  );
}

function Spinner({
  children,
  speed = 0.3,
  floatRange = 0.4,
}: {
  children: React.ReactNode;
  speed?: number;
  floatRange?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      // gentle pointer drift
      ref.current.rotation.x +=
        (state.pointer.y * 0.3 - ref.current.rotation.x) * 0.03;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={floatRange}>
      <group ref={ref}>{children}</group>
    </Float>
  );
}

type Item = { el: React.ReactNode; position: [number, number, number]; scale?: number };

function Scene({ items }: { items: Item[] }) {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#2a2a2a", 1.1]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, -2]} intensity={0.7} color="#ffe862" />
      <pointLight position={[0, -3, 4]} intensity={0.6} color="#ffd640" />
      {items.map((it, i) => (
        <group key={i} position={it.position} scale={it.scale ?? 1}>
          <Spinner speed={0.25 + i * 0.1}>{it.el}</Spinner>
        </group>
      ))}
    </>
  );
}

export default function ClayObjects({
  kind,
  className,
}: {
  kind: "statement" | "services";
  className?: string;
}) {
  const items: Item[] =
    kind === "statement"
      ? [
          { el: <PenTile />, position: [-4.2, 1.6, 0], scale: 0.9 },
          { el: <ChatBubble />, position: [4.3, 1.9, -1], scale: 0.85 },
          { el: <Camera />, position: [3.4, -2.0, 0], scale: 0.8 },
        ]
      : [{ el: <PenTile />, position: [0, 0, 0], scale: 1.1 }];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene items={items} />
      </Canvas>
    </div>
  );
}
