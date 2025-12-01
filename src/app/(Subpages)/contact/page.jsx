import Image from "next/image";
// background image via path; no import
import RenderModels from "@/app/compenents/RenderModels";
import ProjectList from "@/app/compenents/projects";
import {projectsData} from '@/app/data'
import Branch from "@/app/compenents/models/Branch"
import Stump from "@/app/compenents/models/Stump"
import Contact from "@/app/compenents/contact";
//import Homebtn from "/src/app/compenents/Homebtn";
export default function Home() {
  return (
    <>
      <div className="fixed inset-0 relative">
<Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg/cbg.png` } alt="background-image" fill priority className="object-cover object-center opacity-25"/>
</div>

{<Contact></Contact>}
</>
  );
  
}
 