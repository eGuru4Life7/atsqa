/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequesthandlerService } from './requesthandler.service';

describe('RequesthandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequesthandlerService]
    });
  });

  it('should ...', inject([RequesthandlerService], (service: RequesthandlerService) => {
    expect(service).toBeTruthy();
  }));
});
