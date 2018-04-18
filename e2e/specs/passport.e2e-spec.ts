import {PassportPo} from '../pos/passport.po';

describe('music passport', () => {
  let page: PassportPo;

  beforeEach(() => {
    page = new PassportPo();
  });

  it('should click on button "New Passport" and show details', () => {
    page.navigateToPassports();
    page.getNewPassportButton().click();
    expect(page.getInputPassportNumber()).toContain('New Number');
  });

  it('should past value "POIU83YTREWQ"', () => {
    page.navigateToNewPassport();
    page.setInputPassportNumber('POIU83YTREWQ');
    expect(page.getInputPassportNumber()).toContain('POIU83YTREWQ');
  });

  it('should open modal window', () => {
    page.navigateToNewPassport();
    page.getButtonSavePassport().click();
    expect(page.getModalBodyText()).toContain('New Number');
  });

  it('should open modal window and message will be "POIU83YTREWQ"', () => {
    page.navigateToNewPassport();
    page.setInputPassportNumber('POIU83YTREWQ');
    page.getButtonSavePassport().click();
    expect(page.getModalBodyText()).toContain('POIU83YTREWQ');
  });

  it('should save new passport with number "POIU83YTREWQ"', () => {
    page.navigateToNewPassport();
    page.setInputPassportNumber('POIU83YTREWQ');
    page.getButtonSavePassport().click();
    page.getModalSaveButton().click();
    page.navigateToPassports();
    expect(page.getButtonByPassportNumber('POIU83YTREWQ').isPresent())
      .toBeTruthy('new passport with number "POIU83YTREWQ" have ben saved');
    expect(page.getButtonByPassportNumber('POIU83YTREWQ').getText())
      .toContain('POIU83YTREWQ');
  });

  it('should update passport with number "POIU83YTREWQ" to "qwe42rtyu8iop"', () => {
    page.navigateToPassports();
    page.getButtonByPassportNumber('POIU83YTREWQ').click();
    page.setInputPassportNumber('qwe42rtyu8iop');
    page.getButtonUpdatePassport().click();
    page.getModalUpdateButton().click();
    page.navigateToPassports();
    expect(page.getButtonByPassportNumber('qwe42rtyu8iop').isPresent())
      .toBeTruthy('new passport with number "qwe42rtyu8iop" have ben saved');
    expect(page.getButtonByPassportNumber('qwe42rtyu8iop').getText())
      .toContain('qwe42rtyu8iop');
  });

  it('should delete passport with number "qwe42rtyu8iop"', () => {
    page.navigateToPassports();
    page.getButtonByPassportNumber('qwe42rtyu8iop').click();
    page.getButtonDeletePassport().click();
    page.getModalDeleteButton().click();
    page.navigateToPassports();
    expect(page.getButtonByPassportNumber('qwe42rtyu8iop').isPresent())
      .toBeFalsy('passport with number "qwe42rtyu8iop" have ben delete');
  });

});
