import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHttpInterceptor } from './nix-http-interceptor.service';

import { TokenService } from './token.service';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHttpInterceptor, multi: true },
];