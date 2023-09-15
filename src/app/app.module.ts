import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MyWorkComponent } from './components/my-work/my-work.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AllProjectsComponent } from './components/projects/all-projects/all-projects.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './components/header/header.component';
import { GalleryModule } from '@ks89/angular-modal-gallery'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';  
import 'mousetrap';  
import { CarouselModule } from 'ngx-owl-carousel-o'; 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MyWorkComponent,
    ProjectsComponent,
    WelcomeComponent,
    AllProjectsComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GalleryModule,
    CarouselModule,
  
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
