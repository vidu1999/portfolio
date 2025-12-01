"use client"
import React,{Suspense} from 'react'
import clsx from 'clsx'
import {Canvas} from '@react-three/fiber'
import { Environment } from '@react-three/drei'

// Simple error boundary to avoid crashing the page on WebGL/model load issues
class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(){
    return { hasError: true }
  }
  componentDidCatch(err, info){
    // eslint-disable-next-line no-console
    console.error('3D ErrorBoundary caught:', err, info)
  }
  render(){
    if(this.state.hasError){
      return (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/80">
          3D content failed to load. Please refresh the page.
        </div>
      )
    }
    return this.props.children
  }
}

function Fallback(){
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-aqua border-t-transparent" />
    </div>
  )
}

function RenderModels({children,className}) {
  return (
    <Canvas
      className={clsx("w-screen h-screen relative",className)}
      dpr={[1, 2]}
      shadows={false}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        // Try to gracefully handle context loss
        gl.getContext().canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          // eslint-disable-next-line no-console
          console.warn('WebGL context lost')
        }, false)
        gl.getContext().canvas.addEventListener('webglcontextrestored', () => {
          // eslint-disable-next-line no-console
          console.warn('WebGL context restored')
        }, false)
      }}
    >
      <Suspense fallback={null}> 
        {children}
      </Suspense>
      <Environment preset='city'/>
    </Canvas>
  )
}

export default RenderModels
