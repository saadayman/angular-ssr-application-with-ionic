import {Injectable} from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  
export class CustomPreloadingStrategy implements PreloadingStrategy{

    // loadModule could be any function name here
    // preload(route: Route, loadModule: Function): Observable<any> {
    //     return route.data && route.data.applyPreload ? loadModule() : of(null);
    // }

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        if (route.data && route.data.applyPreload) {
          return fn();
        }
        return of(null);
      }
}