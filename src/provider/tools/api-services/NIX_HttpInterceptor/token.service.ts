import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap, tap } from 'rxjs';
import { NIX_ALERT } from '../../NIX_ALERT';
import { NIX_STORAGE } from '../../NIX_STORAGE';
import PackageInfo from '../../../../../package.json'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
    constructor(
      private _NIX_STORAGE: NIX_STORAGE,
      private _NIX_ALERT: NIX_ALERT,
    ) {  }
          
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      this._NIX_ALERT.Error("Connection lost, Please check your Network", {}, 1, 1)
      throw new Error("Connection lost, Please check your Network") //return error, capture it in catch statement
    }
    if (window.navigator.onLine) {
      return from(this._NIX_STORAGE.get("token") as Promise<string>).pipe(
        switchMap(token => {

        let url = req.url.split('/')[0] + '//' +req.url.split('/')[2]+'/medical';
        if(url==environment.API){
        
        let modifiedRequest = req.clone({
          setHeaders: { token: token || ""},
        });
      
        return next.handle(modifiedRequest).pipe(
          tap({
            next: (event)=>{
              if (event instanceof HttpResponse) {
                let url = event.url.split('/')[0] + '//' +event.url.split('/')[2]+'/medical';
                
                if(url==environment.API){
                  const token = event.headers.get("token")
                  if (token) {
                    this._NIX_STORAGE.set("token", token, false, false)
                  }     
                         
                  if (event.headers.get("version") && event.headers.get("version") !== PackageInfo.version) {
                    this._NIX_ALERT.Version_Error()
                  }
              }
            }
          }})
        )
        }else{
          return next.handle(req)
        }
      }))
    }
  }
}