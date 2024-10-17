import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NIX_ALERT {
  private Toast_List: Array<any> = []
  constructor(private _ToastController: ToastController, private _AlertController: AlertController) { }
  Success(MESSAGE: any, JSON: any, CONSOLE, TOAST: any) {
    if (CONSOLE) {
      console.log(`%cSuccess: ${MESSAGE}`, 'color:#00FF0F', Object(JSON));
    }
    if (TOAST) {
      this._TOAST.generate("Success", `Success: ${MESSAGE}`, "xToast_Success", 3000, "top")
    }
  }
  Error(MESSAGE, JSON, CONSOLE, TOAST) {
    if (CONSOLE) {
      console.log(`%cError: ${MESSAGE}`, 'color:#FF0000', Object(JSON));
    }
    if (TOAST) {
      this._TOAST.generate("Error", `Error: ${MESSAGE}`, "xToast_Error", 3000, "top")
    }
  }
  Info(MESSAGE, JSON, CONSOLE, TOAST) {
    if (CONSOLE) {
      console.log(`%cInfo: ${MESSAGE}`, 'color:#900C3F', Object(JSON));
    }
    if (TOAST) {
      this._TOAST.generate("Info", `${MESSAGE}`, "xToast_Info", 3000, "top")
    }
  }
  Network_Error(Flag) {
    if (Flag) {
      this._TOAST.generate("Network_Error", 'Network error: Please check your internet connection and try again', 'xToast_Error', null, 'bottom')
    }
    if (!Flag) {
      this._TOAST.dismiss("Network_Error")
    }
  }
  Version_Error() {
    this._TOAST.generate("Version_Error", 'Outdated version error: Please press Ctrl + F5 to clear the cache and reload the page', 'xToast_Error', null, 'bottom')
  }
  _TOAST = {
    generate: ($TYPE, MESSAGE, $CSS, $DURATION, $POSItION) => {
      this._ToastController.create({
        message: MESSAGE,
        duration: $DURATION,
        position: $POSItION,
        cssClass: $CSS,
      }).then(Toast => {
        Toast.present();
        // this.Toast_List.push({ "type": $TYPE, "toast": Toast, "date": moment().subtract(10, 'days').calendar(), "time": moment().format('LT') })
      })
    },
    dismiss: ($TYPE) => {
      new Promise((resolve) => {
        from(this.Toast_List).pipe(map((x: any, index: number) => { x.type == $TYPE; return index })).subscribe((index: any) => {
          this.Toast_List[index].toast.dismiss()
          resolve(index)
        })
      }).then(($index: number) => {
        this.Toast_List.splice($index, 1)
        console.log("Toast_List :", this.Toast_List)
      })
    }
  }
  _Alert = {
    generate: async ($TYPE, $header, $msg, buttons, $backdropDismiss) => {
      this._AlertController.create({
        header: $header,
        message: $msg,
        backdropDismiss: $backdropDismiss,
        buttons: [...buttons]
      }).then(Alert => {
        Alert.present();
        // this.Toast_List.push({ "type": $TYPE, "toast": Alert, "date": moment().subtract(10, 'days').calendar(), "time": moment().format('LT') })
      })
    },
    dismiss: ($TYPE) => {
      new Promise((resolve) => {
        from(this.Toast_List).pipe(map((x: any, index: number) => { x.type == $TYPE; return index })).subscribe((index: any) => {
          this.Toast_List[index].toast.dismiss()
          resolve(index)
        })
      }).then(($index: number) => {
        this.Toast_List.splice($index, 1)
        console.log("Toast_List :", this.Toast_List)
      })
    }
  }

  Alert = {
    generate: (header: string, subHeader: string, message: string, buttons: any[], inputs?: any[]) => {
      this._AlertController.create({
        header,
        subHeader,
        message,
        inputs,
        buttons
      }).then((ALERT_PROMPT: HTMLIonAlertElement) => {
        ALERT_PROMPT.present();
      });
    }
  };
}
//==================================================[Checked]