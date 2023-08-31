import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { AllProjectsComponent } from './components/projects/all-projects/all-projects.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      { path: '', redirectTo: 'all-projects', pathMatch: 'full' },
      { path: 'all-projects', component: AllProjectsComponent },
      { path: 'project-details/:id', component: ProjectDetailsComponent },
    ],
  },
  {
    path: 'landing',
    component: WelcomeComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
