import {LoginPo} from './login.po';

describe('user log in test', () => {
  let page: LoginPo;

  beforeEach(() => {
    page = new LoginPo();
  });

  it('should click Sig in button, open modal window', () => {
    page.navigateToHome();
    page.getSigInButton().click();
    page.waitAngulat();
    expect(page.getLogInButton().isDisplayed()).toBeTruthy();
  });

  it('should fill login information with login "vlad" and password "1234"', () => {
    page.navigateToHome();
    page.getSigInButton().click();
    page.waitAngulat();
    page.setInputUserLogin('vlad');
    page.setInputUserPassword('1234');
    expect(page.getInputUserLogin()).toContain('vlad');
    expect(page.getInputPasswordLogin()).toContain('1234');
  });

  it('should fill login information in modal window and sig in', () => {
    page.navigateToHome();
    page.getSigInButton().click();
    page.waitAngulat();
    page.setInputUserLogin('asd');
    page.setInputUserPassword('asd');
    expect(page.getInputUserLogin()).toContain('asd');
    expect(page.getInputPasswordLogin()).toContain('asd');
    expect(page.getLogInButton().isDisplayed()).toBeTruthy();
    page.getLogInButton().click();
    expect(page.getLogOutButton().isDisplayed()).toBeTruthy();
  });
});
