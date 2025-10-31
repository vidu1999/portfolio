import Image from "next/image";
import abg from "/public/bg/abg.png";
import RenderModels from "/src/app/compenents/RenderModels";
import About from "@/app/compenents/about";
//import ProjectList from "@/app/compenents/about";
//import {projectsData} from '/src/app/data'
import Book from "/src/app/compenents/models/Book"
//import Stump from "/src/app/compenents/models/Stump"
//import Homebtn from "/src/app/compenents/Homebtn";
export default function Home() {
  return (
    <>
      <div className="absolute inset-0">
<Image src={abg} alt="background-image" className="w-full h-full fixed object-cover object-center opacity-25"/>
</div>

<div className="w-full h-screen bottom-0 fixed">
  

<RenderModels>

<Book></Book>

</RenderModels>

</div>
<div className="w-full h-screen fixed bottom-0">
  

<RenderModels>



</RenderModels>

</div>
{<About></About>}

</>
  );
  
}
 