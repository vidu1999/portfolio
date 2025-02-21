import React from 'react'
import Link from 'next/link'
import {BtnList} from '/src/app/data'
import { Github, Home, Linkedin, NotebookText, Palette, Phone, Twitter, User } from "lucide-react";
const getIcon = (icon) => {
    switch (icon) {
    case "home":
    return <Home className="w-full h-auto" strokeWidth={1.5} />;
    case "about":
    return <User className="w-full h-auto" strokeWidth={1.5} />;
    case "projects":
    return <Palette className="w-full h-auto" strokeWidth={1.5} />;
    case "contact":
    return <Phone className="w-full h-auto" strokeWidth={1.5} />;
    case "github":
    return <Github className="w-full h-auto" strokeWidth={1.5} />;
    case "linkedin":
    return <Linkedin className="w-full h-auto" strokeWidth={1.5} />;
    case "twitter":
    return <Twitter className="w-full h-auto" strokeWidth={1.5} />;
    case "resume":
    return <NotebookText className="w-full h-auto" strokeWidth={1.5} />;
    
    default:
    return <Home className="w-full h-auto" strokeWidth={1.5} />;
    }
}

function Navigationbtnsm() {
    const leftIcons = BtnList.slice(0, 4);
  const rightIcons = BtnList.slice(4);
  {console.log(leftIcons)}
  return (
    <div className="flex w-full hover:cursor-pointer z-50 justify-between">
        
        <div className="flex-1 flex flex-col items-start space-y-4 ">
          
    {leftIcons.map((icon, index) => (
        
      <Link href={icon.link} 
      
        target={icon.newTab ? '_blank' : '_self'}
        className="text-foreground rounded-full  flex items-center justify-between custom-bg
"
aria-label={icon.label} name={icon.label}>
    {console.log("hiiiii",icon)}
      <div key={index} className="lg:hidden  relative  w-14 h-14 p-4 lg:animate-spin-slow-reverse group-hover:pause hover:text-accent">
        {getIcon(icon.icon)}
        <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
        <span className="absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap">
          {icon.icon}
        </span>
      </div></Link>
    ))}
  </div>
  <div className="flex-1 flex flex-col items-end space-y-4 space-x-44">
    {rightIcons.map((icon, index) => (
      <Link href={icon.link} 
      target={icon.newTab ? '_blank' : '_self'}
      className="text-foreground rounded-full  flex items-center justify-center custom-bg
"
aria-label={icon.label} name={BtnList.label}>
      <div key={index} className="lg:hidden  relative  w-14 h-14 p-4 lg:animate-spin-slow-reverse group-hover:pause hover:text-accent">
        {getIcon(icon.icon)}
        <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
        <span className="absolute hidden peer-hover:block px-2 py-1 right-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap">
          {icon.icon}
        </span>
      </div></Link>
    ))}
  </div>
  
</div>
  )
}

export default Navigationbtnsm