"use client"
import React,{Suspense} from 'react'
import clsx from 'clsx'
import {Canvas} from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Navigation from './navigation'
function RenderModels({children,className}) {
  return (
    
      <Canvas className={clsx("w-screen h-screen relative",className)}>
        <Suspense fallback={null}>
            {children}
        </Suspense>
        <Environment preset='city'/>
        
      </Canvas> 
  )
}

export default RenderModels
