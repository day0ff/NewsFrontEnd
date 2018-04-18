import {browser, by, element, promise, ElementFinder, ElementArrayFinder} from 'protractor';

export class LocalePo {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/');
  }

  getLocaleDropDawnMenuButton(): ElementFinder  {
    return element.all(by.css('.dropdown-toggle')).first();
  }

  getLocaleButton(locale: string): ElementFinder {
    return element(by.buttonText(locale));
  }

  getHomeMessage(): promise.Promise<string> {
    return element.all(by.css('a.nav-link')).first().getText();
  }
}
