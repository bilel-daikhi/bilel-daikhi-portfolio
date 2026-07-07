import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../model/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private client: HttpClient) { }

  public getAllExperiences(): Observable<Experience[]> {
    return this.client.get<Experience[]>(environment.fireBaseApi + '/experiences.json');
  }
}
