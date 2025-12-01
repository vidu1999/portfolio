import Image from "next/image";
// background image via path; no import
import RenderModels from "@/app/compenents/RenderModels";
import ProjectList from "@/app/compenents/projects";
import {projectsData} from '@/app/data'
import Branch from "@/app/compenents/models/Branch"
import Stump from "@/app/compenents/models/Stump"
//import Homebtn from "/src/app/compenents/Homebtn";
export default function Home() {
  return (
    <>
      <div className="absolute inset-0">
<Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg/pbg.png`} alt="background-image" fill priority className="object-cover object-center opacity-25"/>
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
 