import {browser, by, element, promise, ElementFinder} from 'protractor';

export class LoginPo {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/Новости');
  }

  getSigInButton(): ElementFinder {
    return element(by.id('loginButton'));
  }

  waitAngulat() {
    browser.driver.sleep(1000);
    browser.waitForAngular();
  }

  setInputUserLogin(login: string) {
    element(by.css('#login')).clear().then(() => {
      element(by.css('#login')).sendKeys(login);
    });
  }

  getInputUserLogin(): promise.Promise<string>  {
    return element(by.css('#login')).getAttribute('value');
  }

  setInputUserPassword(password: string) {
    element(by.css('#password')).clear().then(() => {
      element(by.css('#password')).sendKeys(password);
    });
  }

  getInputPasswordLogin(): promise.Promise<string>  {
    return element(by.id('password')).getAttribute('value');
  }

  getLogInButton(): ElementFinder {
    // return element(by.id('loginConfirm'));
    return element(by.cssContainingText('app-login-modal button', 'Sign in'));
  }

  getLogOutButton(): ElementFinder {
    return element(by.id('getLogOutButton'));
  }
}
