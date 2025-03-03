"use client"
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  try {
  const { nodes, materials, animations } = useGLTF("/public/models/low_poly_stone_arche-transformed.glb");

  return (
    <group {...props} dispose={null} position={[-0.2,-2,0]} scale={[7,7,7]} rotation={[0,1.6,0]}>
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
} catch (err) {
  console.error("Error loading model:", err);
  setError(err);
}

if (error) return <p>Error loading model. Check console for details.</p>;

return <p>Loading model...</p>;

}
