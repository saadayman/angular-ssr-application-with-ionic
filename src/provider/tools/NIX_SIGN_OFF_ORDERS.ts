import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { NixGlobal } from "../NixGlobal";
import { NIX_ALERT } from "./NIX_ALERT";
import { NIX_LOADING } from "./NIX_LOADING";
import { NIX_STORAGE } from "./NIX_STORAGE";
import * as CryptoJS from 'crypto-js';
import { generalHttpClient } from "../HttpServices/internal/generalHttpClient";

@Injectable({
  providedIn: 'root'
})
export class NIX_SIGN_OFF_ORDERS {
  constructor(
    private _NixGlobal: NixGlobal,
    private _generalHttpClient: generalHttpClient,
    private _AlertController: AlertController,
    private _NIX_LOADING: NIX_LOADING,
    private _NIX_STORAGE: NIX_STORAGE,
    private _NIX_ALERT: NIX_ALERT,
    
  ) { }


   RUN_Sign_Off ($param, $general){
    return new Promise(resolve => {
      console.log($param, $general);
      
      const ALERT = this._AlertController.create({
        header: 'Enter your password to confirm',
        inputs: [
          {
            value:this._NixGlobal.Doctor?.user_id,
            name: 'email',
            id:'emailInput',
            type: 'email',
            placeholder: 'enter email'
          },
          {
            name: 'Password',
            type: 'password',
            placeholder: 'Password'
          }
          
        ],
        
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false)
            }
          }, {
            text: 'Ok',
            handler: ($$Input) => {
              this._NIX_STORAGE.get("Password").then($$Password => {
                if (CryptoJS.SHA256($$Input.Password).toString() === $$Password) {
                  this._NIX_LOADING.present()
                  this.Sign_off($param, $general).then(() => {
                    resolve(true)
                  })
                } else {
                  resolve(false)
                  this._NIX_ALERT.Error("The Passowrd is not Correct", null, 1, 1)
                }
              })
            }
          }
        ]
      }).then((ALERT_PROMPT: HTMLIonAlertElement) => {
      ALERT_PROMPT.present().then(() => {
        const firstInput: HTMLElement = document.querySelector('ion-alert input');
        firstInput.focus();
        firstInput.addEventListener('keypress', (event: any) => {
          const alertButtons: any = document.querySelectorAll('ion-alert button');
          if (event.key === 'Enter') {
            alertButtons[1].click();
          }
        });
        return;
      });
    });
    });
  } 


  Sign_off ($param, $General){
    return new Promise((resolve, reject) => {
        const Doctor = {
          "user_name": this._NixGlobal.Doctor.user_name,
          "name": this._NixGlobal.Doctor.name
        }
        let selected = {
          visit:{body: $General.Selected_Encounter,
                 type: 'NP Patient Encounter'}, //extra order is always NP Patient Encounter
          appointment: $General.Selected_Patient
        }
        this._generalHttpClient.SIGN_OFF_extra11111(Object.assign({ "selected": selected }, { "doctor": Doctor },{source: $param})).then(($PUT: any) => {
          this._NIX_ALERT.Success("Update to " + $General.Selected_Encounter.name, $PUT, 1, 1)
          resolve($PUT)
        }).catch(e => {
          console.log(e);
          reject(e)
          
        })
      })
  }
}