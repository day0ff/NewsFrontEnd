import {browser, by, element, promise, ElementFinder, ElementArrayFinder} from 'protractor';

export class RegistrationPo {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/Новости');
  }

  navigateToRegistration(): promise.Promise<any> {
    return browser.get('/registration');
  }

  getSigInButton(): ElementFinder {
    return element(by.id('loginButton'));
  }

  getLoginRegistrationButton(): ElementFinder {
    browser.driver.sleep(500);
    browser.waitForAngular();
    return element(by.id('registrationButton'));
  }

  setInputUserLogin(login: string) {
    element(by.css('#userName')).clear().then(() => {
      element(by.css('#userName')).sendKeys(login);
    });
  }

  setInputUserPassword(password: string) {
    element(by.css('#passwordRegistration')).clear().then(() => {
      element(by.css('#passwordRegistration')).sendKeys(password);
    });
  }

  setInputPersonScreenName(password: string) {
    element(by.css('#screenName')).clear().then(() => {
      element(by.css('#screenName')).sendKeys(password);
    });
  }

  setInputPersonFirstName(password: string) {
    element(by.css('#firstName')).clear().then(() => {
      element(by.css('#firstName')).sendKeys(password);
    });
  }

  setInputPersonLastName(password: string) {
    element(by.css('#lastName')).clear().then(() => {
      element(by.css('#lastName')).sendKeys(password);
    });
  }

  getPersonImageSelectList(): ElementFinder {
    return element(by.css('app-select-img select'));
  }

  getPersonImageSelectImage(): ElementFinder {
    return  element.all(by.css('app-select-img select option')).first();
  }

  getRegistrationButtonRegistration(): ElementFinder {
    return element(by.cssContainingText('app-registration-modal span', 'Register'));
  }

  getModalBodyText(): promise.Promise<string> {
    browser.driver.sleep(1000);
    browser.waitForAngular();
    return element(by.css('app-registration-modal .modal-body')).getText();
  }

  getModalButtonRegistration(): ElementFinder {
    browser.driver.sleep(1000);
    browser.waitForAngular();
    return element(by.id('submit'));
  }
  getWelocomeText(): promise.Promise<string> {
    browser.driver.sleep(2500);
    browser.waitForAngular();
    return element(by.id('welcome')).getText();
  }
}
