import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectImage } from 'src/app/model/image';
import { Project } from 'src/app/model/project';
import { ProjectsService } from 'src/app/services/projects.service';
import {
  Image,
  ModalGalleryService,
  ModalGalleryRef,
  CarouselLibConfig,
  ModalGalleryConfig,
} from '@ks89/angular-modal-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  isLoading:boolean=true;
  isLoadingRelatedProjects:boolean=true;
  nextId: number = -1;
  previousId: number = -1;
  projectFound:boolean=false;
  currentlanguage: any;

  dynamicSlides: RelatedModel[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 20,
    autoplay: true,
    dots: true,
    navSpeed: 600,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: false,
  };

  project_id!: number;
  selectedProject!: Project;
  projects: Project[] = [];
  similaireProjects: Project[] = [];
  projectImages: ProjectImage[] = [];
  constructor(
    private modalGalleryService: ModalGalleryService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    public translateService: TranslateService
  ) {}

  imagesRect: Image[] = new Array();

  LIBCONFIG114: CarouselLibConfig = {
    carouselPreviewsConfig: {
      visible: true,
      number: 5,
      width: 'auto',
      maxHeight: '100px',
    },
    carouselConfig: {
      maxWidth: '766px',
      maxHeight: '400px',
      showArrows: false,
      objectFit: 'cover',
      keyboardEnable: true,
      modalGalleryEnable: true,
    },
  };

  ngOnInit(): void {
    this.isLoading=true;
    this.isLoadingRelatedProjects=true;
    this._activatedRoute.params.subscribe((params) => {
      this.project_id = +params['id'];
      this.nextId = -1;
      this.previousId = -1;

      this.initialiseState();
    });
    this.currentlanguage = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((langObj) => {
      this.currentlanguage = langObj.lang;
    });
  }

  initialiseState() {
    this.imagesRect = new Array();
    this.dynamicSlides = new Array();
    this.projectService
      .getSelectedProject(this.project_id)
      .subscribe({  
        next: (rprojects) => {
          this.isLoading=false;
          if(rprojects!=undefined){
            this.projectFound=true;
            this.selectedProject = rprojects!;
          this.projectImages = rprojects!.images;
          this.projectImages.forEach(
            (
              projectImage: ProjectImage,
              index: number,
              array: ProjectImage[]
            ) => {
              const new_image = new Image(
                index,
                {
                  img: projectImage.url,
                  title: this.selectedProject.name, //projectImage.url
                  description: projectImage.description,
                },
                {
                  img: projectImage.thumb,
                  title: this.selectedProject.name, //projectImage.url
                }
              );
              // this.images.push(new_image);
              this.imagesRect = [...this.imagesRect, new_image];
             // console.log('index: ' + index);
              // this.addRandomImage();
            }
          );
  
          this.projectService
            .getAllProjects()
            .pipe(
              map((data) =>
                data.filter(
                  (proj) =>
                    proj.project_type[0] == this.selectedProject.project_type[0]
                )
              )
            )
            .subscribe((projects) => {
              this.isLoadingRelatedProjects=false;
              this.dynamicSlides = new Array();
              projects.forEach((sim, index, array: Project[]) => {
                console.log(
                  'index: ' + (index + 1) + '   lenght: ' + array.length
                );
                if (this.project_id == sim.id) {
                  if (array[index + 1]) this.nextId = array[index + 1].id;
                  else this.nextId = -1;
                  if (array[index - 1]) this.previousId = array[index - 1].id;
                  else this.previousId = -1;
                }
  
                if (this.project_id != sim.id) {
                  let landing: ProjectImage = sim.images.filter(
                    (value) => value.landing == 1
                  )[0];
  
                  this.dynamicSlides = [
                    ...this.dynamicSlides,
                    {
                      id: '' + index,
                      projectId: sim.id,
                      src: landing.thumb,
                      alt: sim.subName_fr,
                      title: sim.name,
                    },
                  ];
                }
              });
  
              this.similaireProjects = [...projects];
              console.log(
                'this.similaireProjects :   ' + this.similaireProjects.length
              );
            });
  
   
   
          }else{
            this.projectFound=false;
          }
          
        },  
        error: err => console.error('An error occurred :', err),  
        complete: () => console.log('There are no more action happen.')  
      });
  }
  openModal(imageIndex: number, id: number): void {
    const imageToShow: Image = this.imagesRect[imageIndex];
    const dialogRef: ModalGalleryRef = this.modalGalleryService.open({
      id,
      images: this.imagesRect,
      currentImage: imageToShow,
    } as ModalGalleryConfig) as ModalGalleryRef;
  }

}

export interface RelatedModel {
  id: string;
  projectId: number;
  src: string;
  alt: string;
  title: string;
}
