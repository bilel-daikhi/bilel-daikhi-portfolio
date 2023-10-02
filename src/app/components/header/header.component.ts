import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { share } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeFragment$: BehaviorSubject<string> = new BehaviorSubject('home');
  currentLink!: string;
  is_project_details: boolean = false;
  is_all_projects: boolean = false;
  is_main: boolean = false;
  isShow!: boolean;
  currentlanguage: any;
  constructor(
    public translateService: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    translateService.addLangs(['fr', 'en']);
    translateService.setDefaultLang('en');
    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
    this.currentlanguage = browserLang?.match(/en|fr/) ? browserLang : 'en';
    this.router.events.subscribe((value) => {
      this.currentLink = this.router.url.toString();
      if (this.router.url.toString().startsWith('/projects/all-projects')) {
        this.activeFragment$.next('portfolio');
        this.is_all_projects = true;
      } else {
        this.is_all_projects = false;
      }
      if (this.router.url.toString().startsWith('/projects/project-details')) {
        this.activeFragment$.next('portfolio');
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
  }
  ngOnInit() {}

  changeFragment(selectedFragment: string) {
    this.router.navigate(['/'], { fragment: selectedFragment });
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

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (!this.currentLink.startsWith('/projects')) {
      if (this.isVisible(document.querySelector('#home') as HTMLElement)) {
        this.activeFragment$.next('home');
      } else if (
        this.isVisible(document.querySelector('#about') as HTMLElement)
      ) {
        console.log('about is visible!');
        this.activeFragment$.next('about');
      } else if (
        this.isVisible(
          document.querySelector('#about-occupation') as HTMLElement
        )
      ) {
        console.log('about is visible!');
        this.activeFragment$.next('about');
      } else if (
        this.isVisible(document.querySelector('#portfolio') as HTMLElement)
      ) {
        this.activeFragment$.next('portfolio');
      } else if (
        this.isVisible(document.querySelector('#contact') as HTMLElement)
      ) {
        this.activeFragment$.next('contact');
      }
    } else {
      this.activeFragment$.next('portfolio');
    }
  }
  isSelected(fragment: string) {
    this.activeFragment$.next(fragment);
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
  // TODO: Cross browsing
  gotoTop() {
    this.changeFragment('home');
    /* window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });*/
  }

  isVisible(elem: HTMLElement) {
    if (!(elem instanceof Element)) {
      throw Error('DomUtil: elem is not an element.');
    }

    const style = getComputedStyle(elem);

    if (style.display === 'none') {
      return false;
    }

    if (style.visibility !== 'visible') {
      return false;
    }

    if (+style.opacity < 0.1) {
      return false;
    }

    if (
      elem.offsetWidth +
        elem.offsetHeight +
        elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width ===
      0
    ) {
      return false;
    }

    const elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
    };

    if (elemCenter.x < 0) {
      return false;
    }

    if (
      elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
    ) {
      return false;
    }

    if (elemCenter.y < 0) {
      return false;
    }

    if (
      elemCenter.y >
      (document.documentElement.clientHeight || window.innerHeight)
    ) {
      return false;
    }

    let pointContainer: any = document.elementFromPoint(
      elemCenter.x,
      elemCenter.y
    );
    do {
      if (pointContainer === elem) {
        return true;
      }
    } while ((pointContainer = pointContainer.parentNode));

    return false;
  }
}
