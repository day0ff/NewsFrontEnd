import {browser, by, element, promise, ElementFinder, ElementArrayFinder} from 'protractor';

export class PassportPo {
  navigateToPassports(): promise.Promise<any> {
    return browser.get('/passports');
  }

  navigateToNewPassport(): promise.Promise<any> {
    return browser.get('/passports/detail/new');
  }

  getNewPassportButton(): ElementFinder {
    return element(by.css('h2 a'));
  }

  getInputPassportNumber(): promise.Promise<string> {
    return element(by.css('#name')).getAttribute('value');
  }

  setInputPassportNumber(number: string) {
    element(by.css('#name')).clear().then(() => {
      element(by.css('#name')).sendKeys(number);
    });
  }

  getButtonByPassportNumber(passportNumber: string): ElementFinder {
    return element(by.cssContainingText('li a', passportNumber));
  }

  getButtonSavePassport(): ElementFinder {
    return element(by.cssContainingText('app-save-modal button', 'Save'));
  }

  getModalBodyText(): promise.Promise<string> {
    browser.driver.sleep(500);
    browser.waitForAngular();
    return element(by.css('app-save-modal .modal-body')).getText();
  }

  getModalSaveButton(): ElementFinder {
    browser.driver.sleep(500);
    browser.waitForAngular();
    return element(by.cssContainingText('app-save-modal .modal-footer button', 'Save'));
  }

  getButtonUpdatePassport(): ElementFinder {
    return element(by.cssContainingText('app-update-modal button', 'Update'));
  }

  getModalUpdateButton(): ElementFinder {
    browser.driver.sleep(500);
    browser.waitForAngular();
    return element(by.cssContainingText('app-update-modal .modal-footer button', 'Update'));
  }

  getButtonDeletePassport(): ElementFinder {
    return element(by.cssContainingText('app-delete-modal button', 'Delete'));
  }

  getModalDeleteButton(): ElementFinder {
    browser.driver.sleep(500);
    browser.waitForAngular();
    return element(by.cssContainingText('app-delete-modal .modal-footer button', 'Delete'));
  }

  wait(time: number) {
    browser.driver.sleep(time);
    browser.waitForAngular();
  }
}
