"use client"
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export default function Model(props) {
  const gltf = useRef()
  
  const { nodes, materials } = useGLTF('/models/easel_cartoon-transformed.glb')
  let rotateDirection=1; // Initial rotation direction (1: right, -1: left) // Rotation limit in degrees
  let rotationAngle = 0;

  useFrame(() => {
    rotationAngle += rotateDirection;

       if (rotationAngle >= 30 || rotationAngle <= -30) {
      rotateDirection *= -1;
    }
gltf.current.position.y += (Math.PI / 180) * rotationAngle*0.05;

  });
  return (
    <group ref={gltf} {...props} dispose={null}
        position={[7,-4,-1]}
    scale={[1,1,1]}
    rotation={[0,0,0.1]}
    >
      <mesh
        name="Object_2"
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.map_Easel01}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}