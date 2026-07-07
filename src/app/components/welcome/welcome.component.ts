import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Contact } from 'src/app/model/contact.model';
import { NotificationType } from 'src/app/model/notification.message';
import { Experience } from 'src/app/model/experience';
import { ContactService } from 'src/app/services/contact.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  isloading: boolean = true;
  formdata!: FormGroup;
  email!: FormControl;
  name!: FormControl;
  subject!: FormControl;
  message!: FormControl;
  currentlanguage: any;
  experiences: Experience[] = [];
  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService,
    public translateService: TranslateService,
    public experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.isloading = true;
    this.experienceService.getAllExperiences().subscribe({
      next: (experiences) => {
        this.isloading = false;
        this.experiences = experiences;
      },
    });
    this.formdata = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
    this.currentlanguage = this.translateService.getBrowserLang();
    this.translateService.onLangChange.subscribe((lan) => {
      this.currentlanguage = lan.lang;
    });
  }
  onClickSubmit(data: any) {
    if (this.formdata.valid) {
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
    } else {
      this.notificationService.sendMessage({
        message: 'Field(s) is required!',
        type: NotificationType.error,
      });
    }
  }
}
