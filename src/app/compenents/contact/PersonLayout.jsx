import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { personData } from '/src/app/data';
import pi from "/public/bg/vkj.jpg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PersonLayout = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (<>
    <div className="slider-container custom-bg w-80 h-screen/2 justify-center items-center m-8">
        
    <Slider {...settings}>
      {personData.map((project, index) =>{return (
        <div key={index} >
            <div className="proim mt-8">
              <Image src={`/per/${project.img}`} alt='img' width={100} height={100} className="border-10 border-white rounded-full" />
            </div>
            <h1 className="text-left text-base font-normal mb-1">{project.name}</h1>
            <h6 className="text-teal-500 font-small">{project.info}</h6>
            <p className="max-w-none text-center text-aqua mt-8">{project.des}</p>
          
        </div>);
      
      })}
    </Slider></div></>
  );
};

export default PersonLayout;
