"use client"
import React,{useEffect,useRef} from 'react'
import pi from "/public/bg/vkj1.jpg";
import Image from "next/image";
import Link from 'next/link'
import FacebookBtn from '../Facebook';
import Animation from '../Animation';
import HomeBtn from '../HomeBtn';
import { Download } from 'lucide-react';
import { FaDownload, FaFileDownload, FaLinkedinIn } from 'react-icons/fa';
import clsx from 'clsx';
import { FileDown } from "lucide-react";
const ItemLayout = ({children, className}) => {
	return <div className={clsx('custom-bg p-2 m-4 rounded-xl flex items-center justify-center',className)}>
	{children}
	</div>
}

const About = () => {
	const divRef = useRef(null);

  
  return (
	<>
	<section  className="w-full h-screen lg:block item-center justify-center sm:grid">
		
		<div className='grid w-full h-screen/2 item-center justify-center lg:flex mb-8'>
		<div className='item-center justify-center flex'>
		<div ref={divRef} className="p-6 w-64  backdrop-blur-3xl shadow-lg rounded-lg border justify-center items-center border-white custom-bg block">
			<div className='proim justify-center items-center flex '><Image src={pi} alt='img' className='border-10 border-white block rounded-full '></Image></div>
			
			<h2 className='text-base font-normal mb-4'>VIDURA KAVINDA</h2>
				 <h6 className="text-blue-400 text-sm ">BSc. COMPUTER SCIENCE</h6>
				 <p className='max-w-none text-center text-aqua mt-2'>Welcome to my portfolio, where design meets innovation.</p>
		<div className='mx-9 flex justify-between mt-1'>
			{<FacebookBtn></FacebookBtn>}
		</div>
		</div></div>
		<div className="p-6 h-auto text-lg m-2 font-caveat font-hanalei font-indie-flower font-sans backdrop-blur-3xl shadow-lg rounded-lg border justify-between items-end border-white  custom-bg block">
			     <h1 className="text-lg font-caveat mb-4 text-green-500">HELLO! I AM</h1>
				 <h2 className="font-multiple text-3xl mb-4 text-blue-500">VIDURA KAVINDA</h2>
				 <h3 className="p-3 text-lg">I &apos;M A<br/><span className="text-cyan-400 text-2xl mt2"><Animation about={'1'}></Animation></span></h3>
			<p className='text-center'>I&apos;m a full stack developer with 4+ years of experience.<br/>
I specialize in creating scalable and secure<br/>
web applications using a variety of technologies.
			</p>
			<div className="flex my-4 w-48 h-8 border border-white rounded-lg shadow-md transition duration-500 ease-in-out justify-center items-center bg-green-500 hover:bg-aqua "><Link className='flex' href={"resume.pdf"} target={"_blank"} download={"VKJ.pdf"}>DOWNLOAD CV<Download className="animate-fli h-8 w-8 text-stone-950" strokeWidth={1.5}/></Link></div>
			
			</div></div>
			<div className='grid w-full lg:flex justify-center mr-5'>
			<ItemLayout className={' h-auto'}>
			<Image className="w-full h-auto object-cover" width={500}  
  height={250}  
  src="https://github-readme-stats.vercel.app/api?username=Vidu1999&theme=transparent&hide_border=true&title_color=" alt="vidura1999" loading="lazy" />
</ItemLayout>	
<ItemLayout className={'col-span-2 row-span-4'}>
<div className="">
<Image className="w-full h-auto" src="https://github-readme-stats.vercel.app/api/top-langs?username=Vidu1999&theme=transparent&hide_border=true&title_color=FEFESB&text_color=FFFFFF&
icon_color=FEFE5B&text_bold=false" width={500}   
height={250} alt="vidura1999" loading="lazy" />
</div>
</ItemLayout>	</div>
<div ref={divRef} className='w-full flex justify-center mr-5'>
<ItemLayout className={"h-auto"}>
<Image className="w-full h-[200px]" src="https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn" 
width={500}  
height={250}  
alt="CodeBucks" loading="lazy" />
</ItemLayout></div>
<div className='grid w-full lg:flex justify-center mr-5'>
<ItemLayout className={"col-span-6 !p-0"}>
<Image src="https://streak-stats.demolab.com/?user=Vidu1999&theme=dark&hide_border=true&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B" width={500}  
  height={250}  alt="GitHub Streak" />
</ItemLayout>
<ItemLayout className={"col-span-6 !p-0"}>
 <Image className="w-full h-auto" src="https://github-readme-stats.vercel.app/api/pin/?username=codebucks27&repo=Nextjs-contentlayer-blog&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false" width={500}  
  height={250}  alt="CodeBucks" loading="lazy" />
</ItemLayout>
</div>
	</section>
	</>
  )
}

export default About
