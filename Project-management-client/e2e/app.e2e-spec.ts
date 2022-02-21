import { ProjectManagementClientPage } from './app.po';

describe('project-management-client App', function() {
  let page: ProjectManagementClientPage;

  beforeEach(() => {
    page = new ProjectManagementClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
