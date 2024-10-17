import { TestBed } from '@angular/core/testing';

import { ModalsHandlerService } from './modals-handler.service';

describe('ModalsHandlerService', () => {
  let service: ModalsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
