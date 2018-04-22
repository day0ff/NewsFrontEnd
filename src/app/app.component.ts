import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locale: string;

  switchLanguage(language: string) {
    this.locale = language;
    this.translate.use(language);
  }

  signIn() {
    setTimeout(() => {
      document.getElementById('closeLoginModal').click();
      document.location.reload();
    }, 200);
  }

  constructor(private translate: TranslateService, private authService: AuthService) {
    this.locale = this.translate.getBrowserLang();
    translate.setDefaultLang(this.locale);
  }
}
