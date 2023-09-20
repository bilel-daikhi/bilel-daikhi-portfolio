import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

 
import {share } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeFragment = this.activatedRoute.fragment.pipe(share()); 
 // currentFragment:string='home';
  is_project_details: boolean = false;
  is_all_projects: boolean = false;
  is_main: boolean = false;
  isShow!: boolean;
  currentlanguage: any;
  constructor(
    public translateService: TranslateService,
    private router: Router,private activatedRoute:ActivatedRoute
  ) {
    translateService.addLangs(['fr', 'en']);
    translateService.setDefaultLang('en');
    const browserLang = translateService.getBrowserLang();
    console.log('browserLang: ' + browserLang);
    translateService.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
    this.currentlanguage = browserLang?.match(/en|fr/) ? browserLang : 'en';
    this.router.events.subscribe((value) => {
      //console.log('current route: ', );
      if (this.router.url.toString().startsWith('/projects/all-projects')) {
        this.is_all_projects = true;
      } else {
        this.is_all_projects = false;
      }
      if (this.router.url.toString().startsWith('/projects/project-details')) {
        this.is_project_details = true;
      } else {
        this.is_project_details = false;
      }
      if (this.router.url.toString().startsWith('/landing')) {
        this.is_main = true;
      } else {
        this.is_main = false;
      }
    });
    this.activatedRoute.fragment.subscribe( currentFragment =>{
      console.log('fragment is: '+currentFragment);
     // this.currentFragment!=currentFragment;
 })
  }

  ngOnInit(): void {
    console.log('currentlanguage: ' + JSON.stringify(this.currentlanguage));
  }

  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  changeLanguage() {
    if (this.currentlanguage == 'en') {
      this.currentlanguage = 'fr';
    } else if (this.currentlanguage == 'en') {
      this.currentlanguage = 'en';
    } else {
      this.currentlanguage = 'en';
    }
    this.translateService.use(this.currentlanguage);
  }
}
