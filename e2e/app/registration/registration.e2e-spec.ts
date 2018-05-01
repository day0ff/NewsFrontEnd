import {RegistrationPo} from './registration.po';

describe('new user registration test', () => {
  let page: RegistrationPo;

  beforeEach(() => {
    page = new RegistrationPo();
  });

  it('should click Sig in button, open modal window and contain registration button', () => {
    page.navigateToHome();
    page.getSigInButton().click();
    expect(page.getLoginRegistrationButton().isDisplayed()).toBeTruthy();
  });

  it('should navigate to registration form', () => {
    page.navigateToHome();
    page.getSigInButton().click();
    page.getLoginRegistrationButton().click();
    page.navigateToRegistration();
    expect(page.getPersonImageSelectList().isDisplayed()).toBeTruthy();
  });

  it('should complete the form and open modal window and message will contain "Бульбаш"', () => {
    page.navigateToRegistration();
    page.setInputUserLogin('bulba');
    page.setInputUserPassword('1234');
    page.setInputPersonScreenName('kartocha');
    page.setInputPersonFirstName('Бульбаш');
    page.setInputPersonLastName('Бульбович');
    page.getPersonImageSelectList().click();
    page.getPersonImageSelectImage().click();
    page.getRegistrationButtonRegistration().click();
    expect(page.getModalBodyText()).toContain('Бульбаш');
  });

  it('should register new user with login "bulba" and show message "You have successfully registered."', () => {
    page.navigateToRegistration();
    page.setInputUserLogin('bulba');
    page.setInputUserPassword('1234');
    page.setInputPersonScreenName('kartocha');
    page.setInputPersonFirstName('Бульбаш');
    page.setInputPersonLastName('Бульбович');
    page.getPersonImageSelectList().click();
    page.getPersonImageSelectImage().click();
    page.getRegistrationButtonRegistration().click();
    page.getModalButtonRegistration().click();
    expect(page.getWelocomeText()).toContain('You have successfully registered.');
  });

});
