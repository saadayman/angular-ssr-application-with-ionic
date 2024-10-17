import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ModalsHandlerService } from "./core/global-services/modals-handler.service";
import { ErpHttpClient } from "./HttpServices/internal/ErpHttpClient";
import { generalHttpClient } from "./HttpServices/internal/generalHttpClient";
import { NIX_ACTIVE_DOCTYPE } from "./NIX_SELECTED";
import { NixGlobal } from "./NixGlobal";
import { NIX_ALERT } from "./tools/NIX_ALERT";
import { NIX_LOADING } from "./tools/NIX_LOADING";
import { NavigationService } from "./tools/NIX_Navigation.service";
import { NIX_STORAGE } from "./tools/NIX_STORAGE";




@Injectable({
  providedIn: 'root'
})
export class NIX_SIGN_OFF {
    constructor(
      public _NIX_LOADING: NIX_LOADING,
      public _generalHttpClient:generalHttpClient,
      public _ErpHttpClient:ErpHttpClient,
      private _NIX_ALERT: NIX_ALERT,
      public _NIX_ACTIVE_DOCTYPE: NIX_ACTIVE_DOCTYPE,
      public _AlertController: AlertController,
      public _NIX_STORAGE: NIX_STORAGE,
      public _NixGlobal: NixGlobal,
      public navigationService:NavigationService,
      public modal_service:ModalsHandlerService
    ) { }
    
    
    async RUN(
      selected_encounter_details: any, 
      customFunction?: (input: any) => Promise<any>
    ): Promise<unknown> {
      console.log('nix selected',selected_encounter_details)
      this.modal_service.SetNixSelected = selected_encounter_details;
    
      const modalsResult = await this.modal_service.processModalsForMandatoryAndNotify();
    
      if (modalsResult.mandatory_modals.length) {
        this._NIX_ALERT.Alert.generate(
          'Encounter Signoff Restriction:',
          'This encounter cannot be finalized until all mandatory modules are fully documented. Please ensure that the required information is provided for the designated mandatory module(s) ' + modalsResult.mandatory_modals.join() + ' before proceeding with signoff.',
          null,
          [{ text: 'OK', role: 'cancel', cssClass: 'secondary', handler: () => Promise.resolve(false) }]
        );
        return;
      } else if (modalsResult.notify_modals.length) {
        this.handleNotificationModals(selected_encounter_details, modalsResult.notify_modals, customFunction);
      } else {
        this.handlePasswordConfirmation(selected_encounter_details, customFunction);
      }
    }
    handleAlert(
      selected_encounter_details: any, 
      title: string, 
      message: string, 
      customFunction?: (input: any) => Promise<any>
    ) {
      const inputs = this.getPasswordInputs();
      
      // Pass the custom function or the default signOffEncounter to getModalButtons
      const buttons = this.modal_service.getModalButtons(
        customFunction ? customFunction : this.signOffEncounter.bind(this, selected_encounter_details)
      );
    
      this._NIX_ALERT.Alert.generate(
        title,
        message,
        'Enter your password to confirm',
        buttons,
        inputs
      );
    }
    
  
  handleNotificationModals(selected_encounter_details, notify_modals,customFunction?: (input: any) => Promise<any>) {
    const modals = notify_modals.join();
    const message = 'Before finalizing the encounter signoff, please note that the following module(s) have not been fully documented: ' + modals + '. You have the option to continue with signoff or revisit the incomplete module(s) for comprehensive documentation.';
    
    this.handleAlert(selected_encounter_details, 'Documentation Reminder:', message,customFunction);
  }
  
  handlePasswordConfirmation(selected_encounter_details,customFunction?: (input: any) => Promise<any>) {
    this.handleAlert(selected_encounter_details, 'Enter your password to confirm', null,customFunction);
  }
  
  
  getPasswordInputs() {
    return [
      {
        value: this._NixGlobal.Doctor?.user_id,
        name: 'email',
        id: 'emailInput',
        type: 'email',
        placeholder: 'enter email'
      },
      {
        name: 'Password',
        type: 'password',
        placeholder: 'Password'
      }
    ];
  }
  
  async signOffEncounter(selected_encounter_details) {
    this._NIX_LOADING.present()
    await this.Sign_off(selected_encounter_details);
    this._NIX_LOADING.dismiss();
    this._NIX_ALERT.Success("Save Summary and Close Encounter", null, 0, 1);
    this.navigationService.close({appointment_id:selected_encounter_details.appointment.name,reload_single:true,reload_all:false},'patients-list',true).then(()=>{
  					
    })  
    return Promise.resolve(true);
  }
    Sign_off (selected_encounter_details){
      return new Promise(resolve => {
        const Doctor = {
          "user_name": this._NixGlobal.Doctor.user_name,
          "name": this._NixGlobal.Doctor.name
        }
        
        this._generalHttpClient.SIGN_OFF(Object.assign({ "selected":selected_encounter_details }, { "doctor": Doctor })).then(($PUT: any) => {
          this._NIX_ALERT.Success("Update to " + this._NIX_ACTIVE_DOCTYPE.DocType_JSON()?.Doctype, $PUT, 1, 1)
          // need to fix
          resolve($PUT)
        })
      })
    }
}