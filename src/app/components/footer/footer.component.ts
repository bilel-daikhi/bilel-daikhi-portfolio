import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 projects:string =' data is loading...'

  constructor(public projectsService:ProjectsService){

  }
  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(projects=>{
      console.log('projects lenght: '+projects.length)
      this.projects= 'projects lenght: '+projects.length;
  
    })
    }

}
