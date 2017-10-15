import { MeanAlphaPage } from './app.po';

describe('mean-alpha App', () => {
  let page: MeanAlphaPage;

  beforeEach(() => {
    page = new MeanAlphaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
