import Image from "next/image";
import pbg from "/public/bg/pbg.png";
import RenderModels from "/src/app/compenents/RenderModels";
import ProjectList from "@/app/compenents/projects";
import {projectsData} from '/src/app/data'
import Branch from "/src/app/compenents/models/Branch"
import Stump from "/src/app/compenents/models/Stump"
//import Homebtn from "/src/app/compenents/Homebtn";
export default function Home() {
  return (
    <>
      <div className="absolute inset-0">
<Image src={pbg} alt="background-image" className="w-full h-full fixed object-cover object-center opacity-25"/>
</div>
<div className="w-full h-screen bottom-0 fixed">
  

<RenderModels>

<Branch></Branch>

</RenderModels>

</div>
<div className="w-full h-screen fixed bottom-0">
  

<RenderModels>

<Stump></Stump>

</RenderModels>

</div>
{<ProjectList projects={projectsData}></ProjectList>}

</>
  );
  
}
 