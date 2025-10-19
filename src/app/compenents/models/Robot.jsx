"use client"
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  try {
    const modelPath = process.env.NODE_ENV === 'production' 
    ? '/portfolio/models/low_poly_stone_arche-transformed.glb'
    : '/models/low_poly_stone_arche-transformed.glb';
  
  const { nodes, materials } = useGLTF(modelPath);
    
    return (
      <group {...props} dispose={null} position={[-0.2, -2, 0]} scale={[7, 7, 7]} rotation={[0, 1.6, 0]}>
        <mesh
          name="mesh_base_material_0"
          castShadow
          receiveShadow
          geometry={nodes.mesh_base_material_0.geometry}
          material={materials.base_material}
          scale={2.146}
        />
      </group>
    );
  } catch (error) {
    console.error("Error loading model:", error);
    // Fallback cube when model fails to load
    return (
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}