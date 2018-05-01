import {LocalePo} from './locale.po';

describe('news locale switch test', () => {
  let page: LocalePo;

  beforeEach(() => {
    page = new LocalePo();
  });

  it('should change locale to "en" and display message "Hamster News, here and now."', () => {
    page.navigateToHome();
    page.getLocaleDropDawnMenuButton().click();
    page.getLocaleButton('en').click();
    expect(page.getHomeMessage()).toContain('Hamster News, here and now.');
  });

  it('should change locale to "ru" and display message "Новости Хомяков, здесь и сейчас."', () => {
    page.navigateToHome();
    page.getLocaleDropDawnMenuButton().click();
    page.getLocaleButton('ru').click();
    expect(page.getHomeMessage()).toContain('Новости Хомяков, здесь и сейчас.');
  });
});
