// components/ModelFollower.jsx
"use client"
import { useRef,useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function AnimatedDrone({ glbPath }) {
  const group = useRef()
  const { scene, animations } = useGLTF(glbPath)
  const { actions } = useAnimations(animations, group)
  const { viewport } = useThree()
  
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3())
  
  useEffect(() => {
    // Play idle animation by default
    const idleAction = actions['Idle'] || actions[Object.keys(actions)[0]]
    if (idleAction) idleAction.play()
    
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [actions])
  
  useFrame((state) => {
    if (!group.current) return
    
    // Smooth follow cursor
    target.current.x = mouse.current.x * viewport.width * 0.5
    target.current.y = mouse.current.y * viewport.height * 0.5
    
    group.current.position.lerp(target.current, 0.08)
    
    // Rotate to face cursor direction
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.5,
      0.1
    )
  })
  
  return <primitive ref={group} object={scene} scale={10} />
}