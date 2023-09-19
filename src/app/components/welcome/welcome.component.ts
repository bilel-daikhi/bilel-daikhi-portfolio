import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Contact } from 'src/app/model/contact.model';
import { NotificationType } from 'src/app/model/notification.message';
import { Project } from 'src/app/model/project';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  isloading:boolean=true;
  formdata!: FormGroup;
  email!: FormControl;
  name!: FormControl;
  subject!: FormControl;
  message!: FormControl;
  currentlanguage: any;
  projects: Project[] = [];
  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService,
    public translateService: TranslateService,
    public projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.isloading=true;
    this.projectService.getAllProjects().subscribe({next:(projects) => {
     this.isloading=false;
      this.projects = projects;
    }});
    this.formdata = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
    this.currentlanguage = this.translateService.getBrowserLang();
    this.translateService.onLangChange.subscribe((lan) => {
      this.currentlanguage = lan.lang;
    });
  }
  onClickSubmit(data: any) {
    /* this.email = data.email;
    this.name= data.name;
    this.subject= data.subject;
    this.message= data.message;*/
    console.log('is form valide: ' + this.formdata.valid);
    if(this.formdata.valid){
    let contact: Contact = {
      email: data.email,
      id: -1,
      message: data.message,
      name: data.name,
      subject: data.subject,
    };
    this.contactService.createContact(contact).subscribe({
      next: () => {
        this.notificationService.sendMessage({
          message: 'message was sent successfuly!',
          type: NotificationType.success,
        });
        this.formdata.reset();
      },
      error: () => {
        this.notificationService.sendMessage({
          message: 'something wrong happened!',
          type: NotificationType.error,
        });
      },
    });
  }else{
    this.notificationService.sendMessage({
      message: 'Field(s) is required!',
      type: NotificationType.error,
    });
  }
  }
  proj: Project | undefined;
  getProjectById(selectedId: number): Project | undefined {
    /* this.projectService.getProjectById(selectedId).subscribe(project=>{
      this.proj=project;
    })*/

    /* this.proj= this.projects.find(project=>{
      project.id==selectedId;
    }); */
    this.proj = this.projects.find((item) => item.id == selectedId); //find()
    console.log('selected proj: ' + JSON.stringify(this.proj));
    return this.proj;
  }
}
