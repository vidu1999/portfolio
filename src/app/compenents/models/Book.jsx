"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  try {
    
  
  const { nodes, materials } = useGLTF('/models/open_book_about_magic-transformed.glb')
  return (
    <group {...props} dispose={null}
    scale={[5,5,5]}
    >
      <mesh
        name="����������_����������_0"
        castShadow
        receiveShadow
        geometry={nodes['����������_����������_0'].geometry}
        material={materials.material}
        position={[-0.036, 0.005, -0.009]}
        rotation={[3.142, -1.565, 3.132]}
        scale={0.408}
      />
      <mesh
        name="����������_����������������_0"
        castShadow
        receiveShadow
        geometry={nodes['����������_����������������_0'].geometry}
        material={materials.material_1}
        position={[-0.036, 0.005, -0.009]}
        rotation={[3.142, -1.565, 3.132]}
        scale={0.408}
      />
      <mesh
        name="����������_������������_����������_������_����������001_0"
        castShadow
        receiveShadow
        geometry={nodes['����������_������������_����������_������_����������001_0'].geometry}
        material={materials['.001']}
        position={[-0.036, 0.005, -0.009]}
        rotation={[3.142, -1.565, 3.132]}
        scale={0.408}
      />
      <mesh
        name="����������_����������001_0"
        castShadow
        receiveShadow
        geometry={nodes['����������_����������001_0'].geometry}
        material={materials['.001_3']}
        position={[-0.036, 0.005, -0.009]}
        rotation={[3.142, -1.565, 3.132]}
        scale={0.408}
      />
      <mesh
        name="����������_��������������_0"
        castShadow
        receiveShadow
        geometry={nodes['����������_��������������_0'].geometry}
        material={materials.material_4}
        position={[-0.036, 0.005, -0.009]}
        rotation={[3.142, -1.565, 3.132]}
        scale={0.408}
      />
    </group>
  );} catch (error) {
    
  }
}