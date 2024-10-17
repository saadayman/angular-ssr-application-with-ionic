import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { NIX_ALERT } from 'src/provider/tools/NIX_ALERT';

@Injectable({
  providedIn: 'root'
})
export class HelperService { 
  
  constructor(public _NIX_ALERT:NIX_ALERT) {}

  async checkPasswordBasedOnSHA256(enteredPassword,actualPassword): Promise<boolean> {
    if (SHA256(enteredPassword).toString() === actualPassword) {
      return true;
    } else {
      this._NIX_ALERT.Error("The Password is not Correct", null, 1, 1);
      return false;
    }
  }

}
