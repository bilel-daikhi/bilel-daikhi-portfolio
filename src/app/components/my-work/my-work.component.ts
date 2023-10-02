import { Component } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ProjectImage } from 'src/app/model/image';
@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.css'],
})
export class MyWorkComponent {
  isLoading: boolean = true;

  projects: Project[] = [];
  selectedProjects: Project[] = [];
  selectedProject!: Project;
  indexImage: number = 0;
  images = [];
  currentlanguage: any;
  //slideIndex = 0;

  isActive!: boolean;
  constructor(
    private projectService: ProjectsService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    //this.loadImages();
    this.projectService
      .getAllProjects()
      .pipe(
        map((items) =>
          items.filter(
            (item) =>
              item.project_type[0] != 'assist' &&
              item.project_type[0] != 'company'
          )
        )
      )
      .subscribe({
        next: (result: Project[]) => {
          this.isLoading = false;
          this.projects.push(...result); //.slice(0, 6)
          this.selectedProjects.push(...result.slice(0, 6));
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
    this.projects.push();

    this.currentlanguage = this.translateService.getBrowserLang();
    this.translateService.onLangChange.subscribe((langObj) => {
      this.currentlanguage = langObj.lang;
    });
  }

  onSelectProject(project: Project) {
    this.selectedProject = project;
    this.indexImage = 0;
  }

  onCloseProject() {
    this.selectedProject = {
      id: 0,
      icon: '',
      name: '',
      developers: '',
      time: '',
      subName_fr: '',
      subName_en: '',
      description_fr: ``,
      description_en: ``,
      functionalities_fr: [],
      functionalities_en: [],
      project_type: [],
      languages: [],
      images: [],
      client: '',
    };
  }

  loadImages(): void {
    this.projectService
      .getAllProjects()
      .subscribe((result) => this.projects.push(...result));
  }

  /*

   plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

   currentSlide(n:number) {
    this.showSlides(this.slideIndex = n);
  }
*/
  //showSlides(slideIndex:number);
  /* showSlides(n:number) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("images")as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none!important";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    if (dots && dots.length > 0) {
      dots[this.slideIndex-1].className += " active";
    }
  }

*/

  get_landing(images: ProjectImage[]): string {
    for (let i in images)
      if (images[i].landing == 1) {
        return images[i].thumb;
      }
    return '';
  }
  selected_project_type: string = '*';
  filter_projects(project_type: string) {
    this.selected_project_type = project_type;
    this.selectedProjects = [];
    console.log('project_type: ' + project_type);
    this.projects.forEach((value: Project, index: number, array: Project[]) => {
      if (value.project_type.includes(project_type)) {
        this.selectedProjects.push(value);
      }
      if (project_type == '*') this.selectedProjects.push(value);
    });
  }
}
