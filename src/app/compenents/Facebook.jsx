"use client"
import Link from 'next/link'
import React from 'react'
import { FaWhatsapp,FaFacebook } from 'react-icons/fa';
const FacebookBtn = () => {
return (
    <>
<Link
href={"https://web.facebook.com/vidura.kavinda.5/"}
target={"_blank"}
className="text-foreground rounded-full flex items-center justify-center hover:text-accent
 self-start
"

aria-label={"facebook"}
name={"facebook"}
>
<span className=" w-12 h-12 p-1 hover:text-accent custom-bg hover:bg-gray-800 hover:text-blue-500">
<FaFacebook className='w-full h-auto' strokeWidth={1.5}/>
</span>

</Link>
<Link
href={"https://wa.link/9i5yp2"}
target={"_blank"}
className="text-foreground rounded-full flex items-center justify-center hover:text-accent
 self-start
"

aria-label={"whatsapp"}
name={"whatsapp"}
>
<span className=" w-12 h-12 p-1 hover:text-accent custom-bg hover:bg-gray-800 hover:text-green-500">
<FaWhatsapp className="w-full h-auto" strokeWidth={1.5} />
</span>

</Link></>
)
}
export default FacebookBtn;