import { WebstormProjectsPage } from './app.po';

describe('webstorm-projects App', () => {
  let page: WebstormProjectsPage;

  beforeEach(() => {
    page = new WebstormProjectsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
