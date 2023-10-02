import { Component } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProjectImage } from 'src/app/model/image';
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent {
  selected_project_type: string = '*';
  isLoading: boolean = false;
  projects: Project[] = [];
  selectedProjects: Project[] = [];
  selectedProject!: Project;
  indexImage: number = 0;
  images = [];

  constructor(
    private projectService: ProjectsService,
    public translateService: TranslateService
  ) {}
  sampleId!: string;
  currentlanguage: any;
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
          this.projects.push(...result);
          this.selectedProjects.push(...result);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
    this.projects.push();
    this.sampleId = 'sampleId';
    this.currentlanguage = this.translateService.getBrowserLang();
    this.translateService.onLangChange.subscribe((langObj) => {
      this.currentlanguage = langObj.lang;
    });
  }
  get_landing(images: ProjectImage[]): string {
    for (let i in images)
      if (images[i].landing == 1) {
        return images[i].thumb;
      }
    return '';
  }

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
