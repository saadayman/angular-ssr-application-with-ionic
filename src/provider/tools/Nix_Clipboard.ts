import { Injectable } from '@angular/core';
import { mongoHttpClient } from '../HttpServices/internal/mongoHttpClient';
import { NIX_ALERT } from './NIX_ALERT';

@Injectable({
  providedIn: 'root'
})
export class NIX_Clipboard {
  constructor(
    
    private _mongoHttpClient:mongoHttpClient,
    private _NIX_ALERT:NIX_ALERT,
    ){}
 

  enable_copy:any = true;

  Add_To_Clipboard(data,source){
    return new Promise((resolve,reject)=>{
      if(!this.enable_copy && source==='keyboard'){
        reject()
        return 
      }
        if(!data.text){
          reject();
          return
        }
      return this._mongoHttpClient.POST_MONGO('clipboard',data).then(($response)=>{
        this._NIX_ALERT.Success('Added to clipboard!', null, 0, 1);
        resolve(true); 
      }).catch(($error)=>{
        console.log($error)
          this._NIX_ALERT.Error('Failed to add text to clipboard', null, 0, 1);
          reject() 
      })
    })

  }

  Copy_To_Clipboard(text){
   if(!text){
    return
   }
   navigator.clipboard.writeText(text).then(()=>{
    this._NIX_ALERT.Success('Copied to clipboard!', null, 0, 1);
  })
  }
 
}
