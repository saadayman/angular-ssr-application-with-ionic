import { Inject, Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
import { NIX_ALERT } from './NIX_ALERT';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment'; 
import { STORAGE } from '../../app/storage';

@Injectable(
  {providedIn: 'root'}
  )
export class NIX_STORAGE {
  private SecreteKEY: string = "NIXpend2020"
  constructor(@Inject(STORAGE) private storage: Storage,
     private _NIX_ALERT: NIX_ALERT,
     ) {
    this.init();

     }

     async init() {
      // const storage = await this.storage['create']();
      // this.storage = storage;     
    }
  set($storage_name, $data, $message_console, $message_alert) {
    return new Promise((resolve, reject)=>{
      let store : {
        type: string,
        data: any
       }
      if (typeof($data) === "string") {
          store = {
          type: 'string',
          data:this.encrypt($data)
        }
      }
      if (typeof($data) !== "string") {
          store = {
          type: typeof($data),
          data:this.encrypt(JSON.stringify($data))
        }
      }
      this._NIX_ALERT.Success("Save Storage " + $storage_name, $data, $message_console, $message_alert)
      this.storage['set']($storage_name, store).then(($set)=>{        
        resolve($data)
      })
    })
  }



  async get($storage_name): Promise<any> {    
    return new Promise((resolve, reject)=>{
       this.storage['get']($storage_name).then(($get)=>{
        if ($get) {
          let data
           if ($get.type === 'string') {
              data = this.decrypt($get.data)
           }
           if ($get.type !== 'string') {
              data = JSON.parse(this.decrypt($get.data))
           }           
           resolve(data)
        } else {
          resolve(null)
        }
      })
    })
  }
  remove($storage_name) {
    this.storage['remove']($storage_name).then(() => {
      this._NIX_ALERT.Success("Remove Storage " + $storage_name, null, 1, 0)
    })
  }
  clear() {
    return new Promise<void>((resolve, reject) => {
      this.storage.clear()
    })
  }

  encrypt(value : any) : string{
    if (environment.production){
      return CryptoJS.AES.encrypt(value, this.SecreteKEY.trim()).toString();
    } else {
      return value
    }
  }

  decrypt(textToDecrypt : string){
    if (environment.production){
      try {
        let x = CryptoJS.AES.decrypt(textToDecrypt, this.SecreteKEY.trim()).toString(CryptoJS.enc.Utf8);
        return x
      } catch (error) {
        console.log(error);
        this.clear()
        return null
      }
    } else {
      return textToDecrypt
    }
  }

/**                        */

  // set($storage_name, $data, $message_console, $message_alert) {
  //   this._NIX_ALERT.Success("Save Storage " + $storage_name, $data, $message_console, $message_alert)
  //   return this.storage.set($storage_name, $data)
  // }
  // async get($storage_name) {
  //   return await this.storage.get($storage_name);
  // }
  // remove($storage_name) {
  //   this.storage.remove($storage_name).then(() => {
  //     this._NIX_ALERT.Success("Remove Storage " + $storage_name, null, 1, 0)
  //   })
  // }
  // clear() {
  //   this.storage.clear().then(() => {
  //     this._NIX_ALERT.Success("Clear Storage ", null, 0, 0)
  //   })
  // }
}
