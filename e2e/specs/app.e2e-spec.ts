import { AppPage } from '../pos/app.po';

describe('music App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should exist app-root and contains element h1', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeDefined();
  });
});
