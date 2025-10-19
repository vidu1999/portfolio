'use client'
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  // Optional: Add rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ModelViewer({ modelPath }) {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: '#f0f0f0' }}
      >
        <Suspense fallback={<Loader />}>
          <Model url={modelPath} />
          <OrbitControls enableZoom={true} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  );
}