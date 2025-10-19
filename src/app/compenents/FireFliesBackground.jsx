"use client"
import React, { useEffect, useState } from 'react'
import { ImgList } from '/src/app/data';
import Image from 'next/image';
const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * ImgList.length); // Generate a random index
    return ImgList[randomIndex].name; // Return the image object
  };
  

const createFirefly = () => (
    
    {
id: Math.random(),
top: `${Math.random()*100}%`,
left: `${Math.random()*100}%`,
animationDuration: `${Math.random()*5 + 5}s`,
img:`${getRandomImage()}`
})

const FireFliesBackground = () =>{

const [fireflies, setFireflies] = useState([])
//const randomImage = getRandomImage();
useEffect(() => {
    
    const addFireflyPeriodically = () => {
    const newFirefly = createFirefly();
    setFireflies(currentFireflies =>
[
        ... currentFireflies.slice(-14),
        newFirefly]);
    }
    const interval = setInterval(addFireflyPeriodically, 1000);

return () => clearInterval(interval)

 }, [])
 return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
    {fireflies.map((firefly) => {
        console.log(fireflies)
    return (
    <div
    key={firefly.id}
    className="absolute roudned-full w-[20px] h-[20px] bg-firefly-radial bg-firefly-radial"
    style={{
    top: firefly.top,
    left: firefly.left,
    animation: `move ${firefly.animationDuration} infinite alternate`
    }}
    ><Image src={`/icon/${firefly.img}`} alt={`Random Image ${firefly.img}` }  width={300} // Set width as needed
    height={200}// Set width as needed
    /></div>
);
})}
    </div>
    );
}

export default FireFliesBackground