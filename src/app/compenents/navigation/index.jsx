"use client"
import React from 'react'
import {BtnList} from '/src/app/data'
import Navigationbtn from './Navigationbtn';
import Navigationbtnsm from './Navigationbtnsm';


const Navigation= ()=> {
    const angleIncrement = 360 / BtnList.length;
    
    return (
        <div className='w-full fixed h-screen flex items-center justify-center'>
            <div className='hidden w-max flex items-center justify-between relative hover:pause lg:animate-spin-slow lg:block group'>
                {BtnList.map((btn, index) => {

                    const angleRad = (index * angleIncrement * Math.PI) / 180;
                    const radius = 'calc(20vw - 1rem)';
                    const x = `calc(${radius}*${Math.cos(angleRad)})`;
                    const y = `calc(${radius}*${Math.sin(angleRad)})`;

                    return <Navigationbtn key={btn.label} x={x} y={y} {...btn}></Navigationbtn>

                })}
            </div>
            <div className='lg:hidden w-max flex items-center justify-between relative hover:pause  group'>
                

                    

                    <Navigationbtnsm/>

                
            </div>
        </div>
    );
}

export default Navigation
