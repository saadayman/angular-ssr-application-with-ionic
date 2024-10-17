import { httpInterceptorProviders } from './http-interceptors';

describe('httpInterceptorProviders', () => {
  it('should create an instance', () => {
    expect(httpInterceptorProviders).toBeTruthy();
  });
});



// import { TestBed } from '@angular/core/testing';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenService } from './token.service';
// import { ErrorHttpInterceptor } from './nix-http-interceptor.service';

// describe('HTTP Interceptors', () => {
//   it('should provide TokenService as an HTTP interceptor', () => {
//     const interceptors = TestBed.inject(HTTP_INTERCEPTORS);
//     const tokenServiceInterceptor = interceptors.find((interceptor) => interceptor instanceof TokenService);
//     expect(tokenServiceInterceptor).toBeTruthy();
//   });

//   it('should provide ErrorHttpInterceptor as an HTTP interceptor', () => {
//     const interceptors = TestBed.inject(HTTP_INTERCEPTORS);
//     const errorInterceptor = interceptors.find((interceptor) => interceptor instanceof ErrorHttpInterceptor);
//     expect(errorInterceptor).toBeTruthy();
//   });
// });