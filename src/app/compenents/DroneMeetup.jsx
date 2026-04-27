"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import {ImgList} from "../data"
export default function DroneMeetup({
  glbPath,
    iconImages = ImgList.map(item => item.name),
  dropInterval = 900,
}) {
  const group = useRef()
  const { scene, animations } = useGLTF(glbPath)
  const { actions } = useAnimations(animations, group)
  const { viewport, camera, size } = useThree()

  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3())
  const lastDropTime = useRef(0)

  useEffect(() => {
    const idleAction = actions?.Idle || actions?.[Object.keys(actions || {})[0]]
    if (idleAction) idleAction.play()

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [actions])

const dropProgrammingImage = () => {
  if (!group.current || !iconImages.length) return

  const worldPos = new THREE.Vector3()
  group.current.getWorldPosition(worldPos)

  const projected = worldPos.clone().project(camera)

  const startX = ((projected.x + 1) / 2) * size.width
  const startY = ((-projected.y + 1) / 2) * size.height

  const img = document.createElement("img")
  img.src = `${'/icon/'+iconImages[Math.floor(Math.random() * iconImages.length)]}`
  img.alt = "programming icon"
  img.className =
    "fixed w-10 h-10 object-contain pointer-events-none z-[9999] select-none"
    img.style.pointerEvents = "none"
  img.style.left = `${startX}px`
  img.style.top = `${startY + 20}px`
  img.style.transform = "translate(-50%, -50%)"
  img.style.transition = "opacity 1.2s ease, transform 1.2s ease"
  img.style.opacity = "1"

  document.body.appendChild(img)

  let currentX = startX
  let currentY = startY + 20
  let velocityY = 0
  const gravity = 0.45
  const driftX = (Math.random() - 0.5) * 1.2
  const rotateSpeed = (Math.random() - 0.5) * 8
  let rotation = 0

  const groundY = window.innerHeight - 40

  const timer = setInterval(() => {
    velocityY += gravity
    currentY += velocityY
    currentX += driftX
    rotation += rotateSpeed

    img.style.left = `${currentX}px`
    img.style.top = `${currentY}px`
    img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`

    if (currentY >= groundY) {
      clearInterval(timer)
      img.style.top = `${groundY}px`

      setTimeout(() => {
        img.style.opacity = "0"
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0.85)`
      }, 10000)

      setTimeout(() => {
        img.remove()
      }, 11200)
    }
  }, 16)
}

  useFrame((state) => {
    if (!group.current) return

    target.current.x = mouse.current.x * viewport.width * 0.5
    target.current.y = mouse.current.y * viewport.height * 0.5

    group.current.position.lerp(target.current, 0.08)

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.5,
      0.1
    )

    if (state.clock.elapsedTime * 1000 - lastDropTime.current > dropInterval) {
      lastDropTime.current = state.clock.elapsedTime * 1000
      dropProgrammingImage()
    }
  })

  return <primitive ref={group} object={scene} scale={10} />
}

useGLTF.preload("/models/animated_drone.glb")