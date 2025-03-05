"use client"
import React, { useRef , useEffect,useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model(props) {
  
  
  const { nodes, materials } = useGLTF('/models/low_poly_stone_arche-transformed.glb')
  try {const gltf = useRef();
   // Initial rotation angle
  const [scaleZ, setScaleZ] = useState(1); // Initial scale along Z-axis
  const decreaseRate = -0.01;
  let rotateDirection=1; // Initial rotation direction (1: right, -1: left) // Rotation limit in degrees
  let rotationAngle = 0;
  // Assign the loaded model to the ref inside the GLTF loading callback
 /*useEffect(() => {
    const timer = setInterval(() => {
      setScaleZ(prevScaleZ => prevScaleZ - decreaseRate);
    }, 10); // Decrease the scale every 10 milliseconds

    // Clear the interval when the component unmounts or when scaleZ reaches 0
    return () => clearInterval(timer);
  }, [scaleZ]);
useFrame(()=>{
  gltf.current.scale.z = scaleZ;
  gltf.current.scale.y = scaleZ;
  gltf.current.scale.x = scaleZ;
})*/
  useFrame(() => {
    rotationAngle += rotateDirection;

    // If rotation angle reaches 30 or -30, reverse rotation direction
    
    // if (scaleZ > 0 && gltf.current.position.y>-2) {
    //   setScaleZ(prevScaleZ => prevScaleZ - decreaseRate);
    //   gltf.current.scale.z = scaleZ*1.5;
    //   gltf.current.scale.y = scaleZ*5;
    //   gltf.current.scale.x = scaleZ*4;
    //   gltf.current.position.z = scaleZ*-2;
    //   gltf.current.position.y -=.01 ;
    // }else{
       if (rotationAngle >= 30 || rotationAngle <= -30) {
      rotateDirection *= -1;
    }
gltf.current.rotation.y = (Math.PI / 180) * rotationAngle;
//}
    // Set the scale along the Z-axis
   
    // Set the rotation angle
     // Convert degrees to radians
    
    console.log(rotationAngle);
  });
  return (
    <group {...props} dispose={null}
    ref={gltf}
    position={[0,2,-1]}
    scale={[0,-0.4,-2]}
    rotation={[0.6,0,0]}
    >
      
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
    
  }
}
