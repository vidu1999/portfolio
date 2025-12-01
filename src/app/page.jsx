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
const ModelViewer = dynamic(() => import('./compenents/ModelViewer'), {
  ssr: false,
  loading: () => <div>Loading 3D Viewer...</div>
});
const grechenFuemen = Grechen_Fuemen({
  subsets: ['latin'],
  weight: '400',
});
export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between relative">
      <div className="fixed inset-0 overflow-hidden relative">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg/bg.png`} alt="background-image" fill priority className="object-cover object-center opacity-25 overflow-hidden" />
      </div>
      <div className={grechenFuemen.className && 'mt-10 fixed '}><h1 className='font-grechen text-2xl justify-center text-blue-800 items-center'>HELLO WELLCOME MY PORTFOLIO</h1></div>

      <div className="w-full h-screen bottom-0 fixed ">
        {/*<ModelViewer modelPath="/models/low_poly_stone_arche-transformed.glb" />*/}

        <RenderModels>

          <Robot></Robot>



        </RenderModels>


      </div>
      <div className="w-full h-screen flex justify-center items-center  bottom-10 proim fixed">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg/vkj1.jpg`} alt='img' width={140} height={140} />

      </div>
      <div className="w-full h-screen flex justify-center items-end lg:items-center lg:top-16 bottom-10  fixed">
        <div className="w-full h-screen flex justify-center items-end lg:items-center lg:bottom-0 lg:pt-16 lg:mt-8 bottom-16 fixed">WHO AM I</div>
        <div><Animation about={'0'}></Animation></div>
      </div>

      <Navigation />

    </main>
  );

}
