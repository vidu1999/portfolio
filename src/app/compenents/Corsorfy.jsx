"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import AnimatedDroneModel from "./DroneMeetup"

export default function Corsorfy() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <Canvas
       style={{ pointerEvents: "none" }} // âœ… FORCE disable
        className="pointer-events-none"
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={2} />

          <AnimatedDroneModel
            glbPath="/models/animated_drone.glb"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
