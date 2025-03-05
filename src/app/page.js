'use client'
import React,{useState,useEffect} from 'react'
import Image from "next/image";
import bg from "/public/bg/bg.png";
import pi from "/public/bg/vkj1.jpg";
import RenderModels from "./compenents/RenderModels";
import Com from "./compenents/models/Com";
import Navigation from "./compenents/navigation";
import Robot from "./compenents/models/Robot"
import { IceCream, Loader2Icon } from 'lucide-react';
import { Grechen_Fuemen } from 'next/font/google';
import Animation from './compenents/Animation';
const grechenFuemen = Grechen_Fuemen({
  subsets: ['latin'],
  weight: '400',
});
export default function Home() {
   const [loading, setLoading] = useState(true);
    
   useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [loading]);
  return (
   <>
    {!loading ?
    (<main className=" flex min-h-screen flex-col items-center justify-between relative">
      <div className="absolute inset-0 overflow-hidden fixed">
<Image src={bg} alt="background-image" className="w-full h-full object-cover object-center opacity-25 overflow-hidden fixed"/>
</div>
<div className={grechenFuemen.className && 'mt-10 fixed '}><h1 className='font-grechen text-2xl justify-center text-blue-800 items-center'>HELLO WELLCOME MY PORTFOLIO</h1></div>

<div className="w-full h-screen bottom-0 fixed ">
  

<RenderModels>

  <Robot></Robot>



</RenderModels>

</div>
<div className="w-full h-screen flex justify-center items-center  bottom-10 proim fixed">
<Image src={pi} className="" alt='img' style={{width:140}}/>

  </div> 
  <div className="w-full h-screen flex justify-center items-end lg:items-center lg:top-16 bottom-10  fixed">
  <div className="w-full h-screen flex justify-center items-end lg:items-center lg:bottom-0 lg:pt-16 lg:mt-8 bottom-16 fixed">WHO AM I</div>
    <div><Animation about={'0'}></Animation></div>
  </div>
  
<Navigation />

</main>):(<Loader2Icon ></Loader2Icon>)
}</>);
  
}
 