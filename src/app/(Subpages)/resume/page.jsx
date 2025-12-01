"use client";
import React from 'react'
import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import Link from 'next/link'
function ResumePage() {
  const [numPages, setNumPages] = useState(null);
  return (
    <><div className="flex-col justify-center space-x-4 w-full">
   <embed 
  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/resume.pdf`} 
  type="application/pdf" 
  width="100%" 
  height="600px"
/>

  </div>
    <button
    onClick={() => {
      
    }}
    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
  >
    <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/resume.pdf`} target={"_blank"} download={"VKJ.pdf"}>Download Resume</Link> 
  </button>
  </>
  )
}

export default ResumePage;