import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Animation = (props) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return; // Exit early if the ref is not set

    const options = {
      strings: props.about==='1'?['FULL STACK DEVELOPER', 'GAME DEVELOPER', 'GRAPHIC DESIGNER']:['VIDURA KAVINDA JAYATHILAKE','BSc in COMPUTER SCIENCE'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    };

    const typed = new Typed(textRef.current, options);

    return () => {
      typed.destroy(); // Clean up Typed instance on component unmount
    };
  }, [props.about]);

  return (
    <div>
      <h1 className=" text-teal-300 text-2xl mt2 inline-block" ref={textRef}
       style={{ fontFamily: "'Jacquard 12', cursive" }}></h1>
    </div>
  );
};

export default Animation;
