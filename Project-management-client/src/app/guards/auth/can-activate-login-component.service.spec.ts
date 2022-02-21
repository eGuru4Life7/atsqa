/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivateLoginComponentService } from './can-activate-login-component.service';

describe('CanActivateLoginComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateLoginComponentService]
    });
  });

  it('should ...', inject([CanActivateLoginComponentService], (service: CanActivateLoginComponentService) => {
    expect(service).toBeTruthy();
  }));
});
