import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Observable, of } from 'rxjs';
import { imageModel } from '../components/projects/project-details/project-details.component';
import { ProjectImage } from '../model/image';
import { Project } from '../model/project';
import { ProjectsService } from './projects.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectResolverService implements Resolve<GalleryItem[]> {
  selectedProject!:Project;
  projectImages: ProjectImage[]=[];
  data:imageModel[] = [];
  items!:  GalleryItem[];
  constructor(private projectService:ProjectsService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    rstate: RouterStateSnapshot
  ): Observable<GalleryItem[]> {




console.log('Called Get Product in resolver...', route);
this.projectService.getSelectedProject(route.params['id']). subscribe(rprojects=>{
this.selectedProject = rprojects!;
this.projectImages=rprojects!.images;

console.log('resolver number of images: '+this.projectImages.length);
this.projectImages.forEach((projectImage: ProjectImage, index: number, array: ProjectImage[]) =>{

  this.data.push({ srcUrl:projectImage.url,
    previewUrl:projectImage.thumb
    });
  });


  console.log('resolver data number of images: '+this.data.length);

    this.items=this.data.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    console.log('resolver items number of images: '+this.items.length);
})
return  of(
this.items
);

}

}
