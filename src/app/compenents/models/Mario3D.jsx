"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Mario3D(props) {
  const group = useRef()

  const { scene, animations } = useGLTF("/models/mario.glb")
  const { actions, names, mixer } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions || !names || names.length === 0) {
      console.log("No animations found in mario.glb")
      return
    }

    const actionName = names[0]
    const action = actions[actionName]

    if (!action) {
      console.log("Animation action not found:", actionName)
      return
    }

    mixer.timeScale = 1

    action.reset()
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(1)
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.clampWhenFinished = false
    action.fadeIn(0.2)
    action.play()

    console.log("Playing animation:", actionName)

    return () => {
      action.stop()
    }
  }, [actions, names, mixer])

  return <primitive ref={group} object={scene} {...props} dispose={null} />
}

useGLTF.preload("/models/mario.glb")