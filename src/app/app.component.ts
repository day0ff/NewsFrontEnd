import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './service/auth.service';
import {Categories} from './entity/categories';
import {CategoriesService} from './service/categories.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {User} from './entity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locale: string;
  categories: Categories[];

  getCategories() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  switchLanguage(language: string) {
    this.locale = language;
    this.translate.use(language);
    this.saveLocale(language);
  }

  signIn() {
    setTimeout(() => {
      document.getElementById('closeLoginModal').click();
      document.location.reload();
    }, 200);
  }

  navigateTo(link: string) {
    this.location.replaceState('/category/' + link);
    document.location.reload();
  }

  saveLocale(locale: string) {
    localStorage.setItem('locale', JSON.stringify(locale));
  }

  getLocale(): string {
    return JSON.parse(localStorage.getItem('locale'));
  }

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private categoriesService: CategoriesService,
              private router: Router,
              private location: Location) {
    if (localStorage.getItem('locale') === undefined) {
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
