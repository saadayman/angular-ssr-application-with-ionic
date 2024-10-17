import { Injectable } from "@angular/core";
import { isDevMode } from "@angular/core";
@Injectable({providedIn:'root'})
export class LoggingService{
constructor(){}

log(force:boolean,...args:any[]){
    if (isDevMode() || force) {
        console.log(...args);
    }
}
logWithCallBack(force: boolean, cb: () => void) {
    if (isDevMode() || force) {
     cb();
    }
   }
}