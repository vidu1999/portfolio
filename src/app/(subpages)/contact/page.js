import Image from "next/image";
import cbg from "/public/bg/cbg.png";
import RenderModels from "/src/app/compenents/RenderModels";
import ProjectList from "@/app/compenents/projects";
import {projectsData} from '/src/app/data'
import Branch from "/src/app/compenents/models/Branch"
import Stump from "/src/app/compenents/models/Stump"
import Contact from "@/app/compenents/contact";
//import Homebtn from "/src/app/compenents/Homebtn";
export default function Home() {
  return (
    <>
      <div className="absolute inset-0">
<Image src={cbg} alt="background-image" className="w-full h-full fixed object-cover object-center opacity-25"/>
</div>

{<Contact></Contact>}
</>
  );
  
}
 