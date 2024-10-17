import { TestBed } from '@angular/core/testing';
import { ErrorHttpInterceptor } from './nix-http-interceptor.service';

describe('ErrorHttpInterceptor', () => {
  let service: ErrorHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHttpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
