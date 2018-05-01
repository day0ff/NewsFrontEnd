import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './service/auth.service';
import {Categories} from './entity/categories';
import {CategoriesService} from './service/categories.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * The root component class AppComponent.
 */
export class AppComponent {
  /**
   * property - of locale
   */
  locale: string;
  /**
   * property - of news categories
   */
  categories: Categories[];
  /**
   * The method request foe all news categories.
   */
  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }
  /**
   * The method request for all news categories.
   */
  switchLanguage(language: string): void {
    this.locale = language;
    this.translate.use(language);
    this.saveLocale(language);
  }
  /**
   * The method set timer for authorized session.
   */
  signIn(): void {
    setTimeout(() => {
      document.getElementById('closeLoginModal').click();
      document.location.reload();
    }, 200);
  }
  /**
   * The method navigate to the category link.
   */
  navigateTo(link: string): void {
    this.location.replaceState('/category/' + link);
    document.location.reload();
  }
  /**
   * The method save locale to local storage.
   */
  saveLocale(locale: string): void {
    localStorage.setItem('locale', JSON.stringify(locale));
  }
  /**
   * The method get locale from local storage.
   *
   * @return locale
   */
  getLocale(): string {
    return JSON.parse(localStorage.getItem('locale'));
  }
  /**
   * Creates a new default object AppComponent
   * @constructor
   */
  constructor(private translate: TranslateService,
              private authService: AuthService,
              private categoriesService: CategoriesService,
              private router: Router,
              private location: Location) {
    if (localStorage.getItem('locale')) {
      this.locale = this.translate.getBrowserLang();
      translate.setDefaultLang(this.locale);
      this.saveLocale(this.locale);
      console.log('Locale' + this.locale);
    } else {
      this.locale = this.getLocale();
      translate.setDefaultLang(this.locale);
      console.log('Locale' + this.locale);
    }
    this.getCategories();
  }
}
