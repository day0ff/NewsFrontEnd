import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';

declare let readJSON: any;

export class TranslateCustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case 'ru': {
        return Observable.of(readJSON('../assets/i18n/ru.json'));
      }
      default: {
        return Observable.of(readJSON('../assets/i18n/en.json'));
      }
    }
  }
}
