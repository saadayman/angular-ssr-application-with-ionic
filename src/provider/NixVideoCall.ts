import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NIX_ALERT } from 'src/provider/tools/NIX_ALERT';
import { NIX_LOADING } from "./tools/NIX_LOADING";
import { NixGlobal } from './NixGlobal';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';
import { NIX_STORAGE } from './tools/NIX_STORAGE';

@Injectable({
  providedIn: 'root'
})
export class NixVideoCall {
  constructor(
    private _HttpClient: HttpClient,
    private _NIX_ALERT: NIX_ALERT,
    private _NixStorage: NIX_STORAGE,
    public _NIX_LOADING: NIX_LOADING,
    public _NixGlobal: NixGlobal,
    public _AlertController: AlertController,
    public _Router: Router,
    public _Clipboard: Clipboard
  ) { }

  Create_Chat_Room(patient) {
    this._NIX_LOADING.present()
      this.Create_Room(patient).then(($$Res: any) =>{
        this._NIX_LOADING.dismiss()
        this.Present_Alert('Chat Room Name is ' + $$Res.data.room_id, 'Make Your sure to Copy Room Name' , $$Res.data.room_id)
      }).catch(($Post_Video_Chat_Error) => {
        console.log($Post_Video_Chat_Error)
        this._NIX_LOADING.dismiss();
        this._NIX_ALERT.Error("Generate Video Chat unknown error", $Post_Video_Chat_Error, 0, 1);
      })
  }

  async Present_Alert(header , subheader , room_name) {
    const alert = await this._NixGlobal._AlertController.create({
      header: header,
      subHeader: subheader,
      backdropDismiss: false,
      buttons: [{
        text: 'Copy',
        handler: () => {
          this._Clipboard.copy(room_name);
          window.open(environment.Telemedicine, '_blank');
        }
      }],
    })
    await alert.present()
  }

  Create_Room(appointment){
    return new Promise((resolve, reject) => {
      // this._NixStorage.get('authorization').then(($$authorization: any) => {
        this._NixStorage.get("location").then(($$location: any) => {
          const Post_Body = {
            url: $$location.url,
            // authorization: `${$$authorization.api_key}:${$$authorization.api_secret}`,
            appointment: appointment
          }
          //make seprate function
          this._HttpClient.post(`${this._NixGlobal.API}/create_room` , Post_Body)
            .subscribe($$post => {
              this._NIX_ALERT.Success('HTTP_POST_Doctype ' , null, 1, 0);
              resolve($$post)
            }, $Error => {
              this._NIX_ALERT.Error('HTTP_POST_Doctype ' , $Error, 1, 0);
              reject($Error);
            });
        });
      // });
    });
  }

}