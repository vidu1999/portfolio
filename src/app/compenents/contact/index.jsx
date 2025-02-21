"use client";
import React from 'react';
import {personData} from '/src/app/data'
import PersonList from "@/app/compenents/contact/PersonList"
import PersonLayout from './PersonLayout';
import Slider from 'react-slick';
const Contact = () => {
  return (
    
    

      <section className="overflow-hidden w-full h-screen/2 block items-center justify-center text-white">
      <div className="lg:flex flex-row top-3 mx-auto justify-center items-center ">
        <div className="h-screen/2 border border-white rounded-lg shadow-md lg:flex lg:justify-between items-center custom-bg m-2">
          <form action="https://formsubmit.co/c563775632c193a035157c933aec30f2" method="POST" name="contact">
            <div className="lg:flex m-2 ">
              <input  type="text" placeholder="FIRST NAME" name="firstname" required />
              <input type="text" placeholder="LAST NAME" name="lastname" required />
            </div>
            <div className="lg:flex m-2">
              <input type="tel" placeholder="PHONE NUMBER" name="tel" />
              <input type="email" placeholder="EMAIL" name="email" required />
            </div>
            <div className="flex lg:m-2 justify-center"><textarea  className=" m-2 border border-white rounded-md text-white font-bold px-2 bg-gray-900 custom-bg" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif', '::placeholder': { color: '#A5A5A5' } }} name="message" id="" cols="30" rows="10" placeholder="TYPE YOUR MESSAGE"></textarea></div>
            <div className="flex justify-center lg:m-auto "><input  type="submit" value="SEND MESSAGE" className="b1 custom-bg hover:bg-aqua hover:text-black cursor-pointer" name="send" /></div>
          </form>
          
          
        </div>{<PersonLayout/>}
      </div></section>
    
  );
}

export default Contact;
