import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, tap, throwError } from 'rxjs';
import { NIX_ALERT } from '../../NIX_ALERT';
import { User } from 'src/provider/user/user';
import { AuthService } from 'src/app/pages/login/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ErrorHttpInterceptor implements HttpInterceptor {
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(private _NIX_ALERT: NIX_ALERT,
     private _User: User,
     private _AuthService: AuthService
    ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          // insert here fun to calculate time
          if (event instanceof HttpResponse) {
            // http response status code
            // to remove alert if exist
            // this._NixAuth.token = true;
            this._NIX_ALERT.Network_Error(false);
          }
        },
        error: (error) => {
          this.errorHandler(error);
        },
      })
    );
  }

  private errorHandler(err) {
    let errorMessage: any = '';
    // Get Client-Side error
    if (err.error instanceof ErrorEvent) {
      console.log('Client-Side error ', err);
      errorMessage = err.error.message;
    }

    // Get server-side error
    if (err instanceof HttpErrorResponse) {
      console.log('server-Side error', err.status + ' Error', err);
      // skipLogin
      if (
        // err.url.endsWith('/login') || 
      err.url.includes('medical/public') 
      // err.url.includes('medical/public/forgot_password') || 
      // err.url.includes('medical/public/site?url=')
      ) {
        return err
      } else {
        switch (err.status) {
          // (401 wrong pass)
          case 401: {
            if (err.error.msg === 'Unauthorized') {
              console.log('UnauthorizedUnauthorizedUnauthorizedUnauthorizedUnauthorizedUnauthorizedUnauthorizedUnauthorizedUnauthorized');
              // this._User.isLoggedIn.next({when: '-- nix-http.ts.75', val: false})
              this._AuthService.isLoggedIn.next({when: '-- nix-http.ts.76', val: false})
            } else {
              this._NIX_ALERT.Error(
                `Status: (${err.status}) - This account has no permission to access this data`, err, 1, 1);
              errorMessage = err;
            }
            break;
          }
  
          // (417 wrong ip_address)
          case 417:
            if (err.error === 'jwt expired') {
              console.log('jwt expired');
              errorMessage = err.error;
              // if (this._NixAuth.token) {
              //   this._NixAuth.token = false;
              //   this._NixAuth.Authorization.Reauthorization_Alert(
              //     `Status: (${err.status}) - Your Session Has Expired, Please Login Again!`
              //   );
              // }
              // ********** new auth
              break;
            } else {
              this._NIX_ALERT.Error(err.error.msg, err, 1, 1);
              errorMessage = err;
              break;
            }
          // (422 wrong syntax),
          case 422:
            this._NIX_ALERT.Error(err.error.message, err, 1, 1);
            errorMessage = err;
            break;
  
          case 403:
            errorMessage = err;
            break;
  
          case 404:
            this._NIX_ALERT.Error(
              err.error.message ||
                err.error ||
                err.message ||
                `Status: (${err.status}) - Contact Support team and retry please.`, err, 1, 1);
            errorMessage = err;
            break;
  
          case 0:
            this._NIX_ALERT.Error(
              `Status: (${err.status}) - Contact Support team and retry please.`, err, 1, 1);
            errorMessage = err;
            break;
  
          case 504:
            this._NIX_ALERT.Error(err.status, err, 1, 1);
            this._NIX_ALERT.Error(
              `Status: (${err.status}) - Contact Support team and retry please.`, err, 1, 1);
            errorMessage = err;
            break;
  
          case 500:
            this._NIX_ALERT.Error(
              `Status: (${err.status}) - Contact Support team and retry please.`, err, 1, 1);
            this._NIX_ALERT.Network_Error(true);
            errorMessage = err;
            break;
  
          default:
            this._NIX_ALERT.Error(
              `Status: (${err.status}) - Contact Support team and retry please.`, err, 1, 1);
            errorMessage = err;
            break;
        }

      }
      // this._NIX_ALERT.Error(`Test Status: ${err.status}`, err, 1, 1);

    } else {
      errorMessage = `Error Code: ${err.status}\n Message: ${err.message}`;
    }
    return throwError(() => errorMessage);
  }

  // logging
  //     private getUrlVars($method, req){

  //         var vars = [], hash;

  //         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  //         for(var i = 0; i < hashes.length; i++)
  //         {
  //                 hash = hashes[i].split('=');
  //                 vars[hash[0]] = hash[1];
  //         }
  //         return vars;
  // }
}

// // const startTime: Date = new Date();  //time tracking
// const startTime = Date.now();  //time tracking
// let status: string;
// console.log("method", req.method);
// console.log("params", req.params);
// console.log("params", req);
// console.log("req", req);
// let msg  = ''

// finalize(() => {
//   const elapsedTime = (Date.now() - startTime).toFixed(2);
//   const message = req.method + " " + req.urlWithParams +" "+ status

//   + " in " + elapsedTime + "seconds";
//   console.log("message", message);

//   // this.logDetails(message);
// })
