import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, find, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private client:HttpClient) { }
public getAllProjects():Observable<Project[]>{
  return this.client.get<Project[]>(environment.fireBaseApi+'/projects.json');
}
public getProjectById(selectedId:number):Observable<Project | undefined>{
  return this.client.get<Project>(environment.fireBaseApi+'/projects.json').pipe(find(project=>project.id==selectedId));
}

getSelectedProject(id: number): Observable<Project|undefined> {
  return this.getAllProjects().pipe(map(project => project.find(project => project.id == id)));
}
}

