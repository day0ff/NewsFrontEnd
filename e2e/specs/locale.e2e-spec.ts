import { LocalePo } from '../pos/locale.po';

describe('music locale', () => {
  let page: LocalePo;

  beforeEach(() => {
    page = new LocalePo();
  });

  it('should change locale to "en" and display message "Music for everyone."', () => {
    page.navigateToHome();
    page.getLocaleDropDawnMenuButton().click();
    page.getLocaleButton('en').click();
    expect(page.getHomeMessage()).toContain('Music for everyone.');
  });

  it('should change locale to "ru" and display message "Музыка для всех."', () => {
    page.navigateToHome();
    page.getLocaleDropDawnMenuButton().click();
    page.getLocaleButton('ru').click();
    expect(page.getHomeMessage()).toContain('Музыка для всех.');
  });
});
