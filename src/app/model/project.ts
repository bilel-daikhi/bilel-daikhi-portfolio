import { ProjectImage } from "./image";

export interface Project {
    id:number;
   icon:string;
   time:string;
   developers:string;
  name:string;
  subName_fr:string;
  subName_en:string;
  description_fr:string;
  description_en:string;
  functionalities_fr:string[];
  functionalities_en:string[];
  project_type:string[];
  languages:string[];
  images:ProjectImage[];
  client:string;
}
