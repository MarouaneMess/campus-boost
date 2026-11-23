"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  Group,
  LinearFilter,
  MathUtils,
  SRGBColorSpace,
} from "three";

type Point = [number, number, number];
const points: Point[] = [
  [-1.9, 0.7, 0.1],
  [-1.1, 1.8, -0.6],
  [0.8, 1.7, 0.2],
  [2, 0.6, -0.5],
  [1.7, -1.1, 0.6],
  [0.1, -1.9, -0.3],
  [-1.8, -1.1, 0.3],
  [-0.5, 0.8, 1.6],
  [1.1, -0.4, 1.7],
  [-0.9, -0.5, -1.5],
  [0.5, 1, -1.5],
  [-0.3, -1.1, 1.2],
];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [0, 7],
  [1, 7],
  [2, 7],
  [3, 8],
  [4, 8],
  [5, 11],
  [6, 9],
  [7, 8],
  [8, 11],
  [9, 10],
  [10, 2],
  [10, 3],
  [9, 1],
  [11, 6],
  [7, 11],
];

function NodeLabel({
  text,
  position,
  active,
}: {
  text: string;
  position: Point;
  active: boolean;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 84;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#132d53";
    context.fillRect(0, 0, 320, 84);
    context.strokeStyle = active ? "#cc6e9d" : "#526986";
    context.lineWidth = 3;
    context.strokeRect(2, 2, 316, 80);
    context.font = "500 28px 'DM Sans', sans-serif";
    context.fillStyle = active ? "#ffffff" : "#b9c9df";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 160, 43);
    const result = new CanvasTexture(canvas);
    result.colorSpace = SRGBColorSpace;
    result.minFilter = LinearFilter;
    return result;
  }, [text, active]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite
      position={[position[0], position[1] + 0.3, position[2]]}
      scale={[1.15, 0.3, 1]}
    >
      <spriteMaterial map={texture} depthTest={false} toneMapped={false} />
    </sprite>
  );
}

function Constellation({
  dark,
  selection,
  active,
}: {
  dark: boolean;
  selection: number;
  active: boolean;
}) {
  const group = useRef<Group>(null);
  const core = useRef<Group>(null);
  const rings = useMemo(
    () =>
      [0, 1].map((index) =>
        Array.from({ length: 97 }, (_, i): Point => {
          const angle = (i / 96) * Math.PI * 2;
          return index === 0
            ? [Math.cos(angle) * 2.45, Math.sin(angle) * 2.45, 0]
            : [
                Math.cos(angle) * 2.65,
                Math.sin(angle) * 0.4,
                Math.sin(angle) * 1.6,
              ];
        }),
      ),
    [],
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = MathUtils.damp(
        group.current.rotation.y,
        state.pointer.x * 0.16 +
          Math.sin(state.clock.elapsedTime * 0.12) * 0.13,
        2,
        delta,
      );
      group.current.rotation.x = MathUtils.damp(
        group.current.rotation.x,
        -state.pointer.y * 0.1 + 0.13,
        2,
        delta,
      );
    }
    if (core.current) {
      core.current.rotation.y += Math.min(delta, 0.05) * 0.13;
      core.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.07;
    }
  });

  return (
    <group ref={group} rotation={[0.13, 0, -0.15]}>
      {rings.map((ring, i) => (
        <Line
          key={i}
          points={ring}
          color={dark ? "#516286" : "#bfc9d7"}
          lineWidth={0.6}
          transparent
          opacity={0.55}
        />
      ))}
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[points[a], points[b]]}
          color={
            active && (i + selection) % 3 === 0
              ? "#b60055"
              : dark
                ? "#657fa8"
                : "#8d9fb8"
          }
          lineWidth={active && (i + selection) % 3 === 0 ? 1.2 : 0.65}
          transparent
          opacity={0.7}
        />
      ))}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry
            args={[(i + selection) % 3 === 0 ? 0.115 : 0.065, 20, 16]}
          />
          <meshStandardMaterial
            color={
              active && (i + selection) % 3 === 0
                ? "#b60055"
                : dark
                  ? "#b6c9ec"
                  : "#17365c"
            }
            metalness={0.45}
            roughness={0.25}
          />
        </mesh>
      ))}
      {dark && (
        <>
          <Line
            points={[points[0], points[1], points[2], points[3], points[4]]}
            color={active ? "#f29ac4" : "#657fa8"}
            lineWidth={active ? 2.2 : 0.7}
            transparent
            opacity={active ? 1 : 0.5}
          />
          {[
            "Entreprise",
            "Besoins",
            "Compétences",
            "Formations",
            "Projets",
          ].map((label, index) => (
            <NodeLabel
              key={label}
              text={label}
              position={points[index]}
              active={active}
            />
          ))}
        </>
      )}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.77, 0]} />
          <meshStandardMaterial
            color="#f1f0ed"
            flatShading
            metalness={0.2}
            roughness={0.36}
          />
        </mesh>
        <mesh scale={1.006}>
          <icosahedronGeometry args={[0.77, 0]} />
          <meshBasicMaterial
            color={dark ? "#ee7ca9" : "#b60055"}
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh position={[0, 0, 0.77]}>
          <sphereGeometry args={[0.075, 16, 12]} />
          <meshStandardMaterial color="#b60055" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default function NetworkScene({
  dark = false,
  selection = 0,
  active = true,
  onReady,
}: {
  dark?: boolean;
  selection?: number;
  active?: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 44 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 5]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={2} color="#efbdd5" />
      <Constellation dark={dark} selection={selection} active={active} />
    </Canvas>
  );
}
