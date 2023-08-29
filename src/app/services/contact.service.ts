import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private client:HttpClient) { }

  public createContact(contact:Contact):Observable<Contact>{
    return this.client.post<Contact>(environment.fireBaseApi+'/contacts.json',contact);
  }
}
