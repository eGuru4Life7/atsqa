/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanDeactivateLoginComponentService } from './can-deactivate-login-component.service';

describe('CanDeactivateLoginComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateLoginComponentService]
    });
  });

  it('should ...', inject([CanDeactivateLoginComponentService], (service: CanDeactivateLoginComponentService) => {
    expect(service).toBeTruthy();
  }));
});
