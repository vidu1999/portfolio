"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
    const { nodes, materials } = useGLTF('models/tree_branch-transformed.glb')
  try {

  const gltf = useRef();
  return (
    <group {...props} dispose={null}
     position={[-3,0,0]}
    scale={[0.5,0.5,0.5]}
    rotation={[0,0,0]}
    >
       
      <mesh
        name="Object_4"
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.TreeBranch_2K}
      />
      <mesh
        name="Object_6"
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.Leaf}
      />
      <mesh
        name="Object_7"
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.Stem}
      />
    </group>
  );  
  } catch (error) {
    console.log(error)
  }
}