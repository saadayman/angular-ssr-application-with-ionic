import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';


@Injectable({providedIn:'root'})
export class NixConsole {
    constructor(
    ){}
    
log(force: boolean, ...args: any[]) {
    if (isDevMode() || force) {
      console.log(...args);
    }
  }
}