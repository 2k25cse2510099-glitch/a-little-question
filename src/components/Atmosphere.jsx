import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Drift() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.035
    }
  })
  return <group ref={ref}>
    <Stars radius={85} depth={45} count={1500} factor={3} saturation={0.25} fade speed={0.35} />
    <Sparkles count={95} scale={[24, 14, 14]} size={2.2} speed={0.22} opacity={0.55} color="#f4dce4" />
    <mesh position={[5, 4, -18]}>
      <sphereGeometry args={[2.1, 48, 48]} />
      <meshBasicMaterial color="#f5dce1" />
    </mesh>
    <mesh position={[5.8, 4.5, -17.5]}>
      <sphereGeometry args={[2.05, 48, 48]} />
      <meshBasicMaterial color="#221927" />
    </mesh>
    <pointLight position={[0, 3, 1]} color="#d9a6bb" intensity={1.2} distance={22} />
  </group>
}

export default function Atmosphere() {
  return <div className="three-layer" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 13], fov: 48 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <Drift />
    </Canvas>
  </div>
}
