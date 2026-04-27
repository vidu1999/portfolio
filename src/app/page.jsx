'use client'
import React from 'react'
import Image from "next/image";
// bg image loaded via path string; no import needed
// profile image loaded via path string; no import needed
import RenderModels from "./compenents/RenderModels";
import Com from "./compenents/models/Com";
import Navigation from "./compenents/navigation";
import Robot from "./compenents/models/Robot"
import { IceCream } from 'lucide-react';
import { Grechen_Fuemen } from 'next/font/google';
import Animation from './compenents/Animation';
import dynamic from 'next/dynamic';
import Portfolio3D from './compenents/Portfolio3D';
import Corsorfy from './compenents/Corsorfy';
import DroneMeetup from './compenents/DroneMeetup';
const ModelViewer = dynamic(() => import('./compenents/ModelViewer'), {
  ssr: false,
  loading: () => <div>Loading 3D Viewer...</div>
});
const grechenFuemen = Grechen_Fuemen({
  subsets: ['latin'],
  weight: '400',
});
import FireFliesBackground from "./compenents/FireFliesBackground";

export default function Home() {
  return (
   <>
    {!loading ?
    (<main className=" flex min-h-screen flex-col items-center justify-between relative">
      <div className="absolute inset-0 overflow-hidden fixed">
<Image src={bg} alt="background-image" className="w-full h-full object-cover object-center opacity-25 overflow-hidden fixed"/>
</div>
<div className={grechenFuemen.className && 'mt-0 fixed '}><h1 className='font-grechen text-2xl justify-center text-blue-800 items-center'>HELLO WELLCOME MY PORTFOLIO</h1></div>

      <div className="w-full h-screen bottom-0 fixed ">
        {/*<ModelViewer modelPath="/models/low_poly_stone_arche-transformed.glb" />*/}

        <RenderModels>

          <Robot></Robot>



        </RenderModels>


</div>
<div className="w-full h-screen flex justify-center items-center  bottom-10 proim fixed">


  </div> 
  <div className="w-full h-screen flex justify-center items-end lg:items-center lg:top-16 bottom-10  fixed">
  
    
  </div>
  


<Portfolio3D></Portfolio3D>
<Corsorfy></Corsorfy>
</main>):(<Loader2Icon ></Loader2Icon>)
}</>);
  
}
