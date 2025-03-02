"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export default function Model(props) {
  const gltf = useRef()
  const { nodes, materials, animations } = useGLTF('/portfolio//models/low_poly_stone_arche-transformed.glb')
  return(
    <group ref={gltf} {...props} dispose={null}
    position={[-0.2,-2,0]}
    scale={[7,7,7]}
    rotation={[0,1.6,0]}>

<mesh
        name="mesh_base_material_0"
        castShadow
        receiveShadow
        geometry={nodes.mesh_base_material_0.geometry}
        material={materials.base_material}
        scale={2.146}
      />
    </group>
  )
}