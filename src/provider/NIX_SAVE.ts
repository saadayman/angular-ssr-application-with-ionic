import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { mongoHttpClient } from "./HttpServices/internal/mongoHttpClient";
import { NixDoctypeJSON } from "./NixDoctypeJSON";
import { NixDoctypeReport } from "./NixDoctypeReport";
import { NIX_ACTIVE_DOCTYPE, NIX_SELECTED } from "./NIX_SELECTED";
import { mandatory_form } from "./tools/mandatory_form";
import { NIX_ALERT } from "./tools/NIX_ALERT";
import { NIX_LOADING } from "./tools/NIX_LOADING";


@Injectable({
  providedIn: 'root'
})
export class NIX_SAVE extends mandatory_form{
  constructor(
    public _NIX_LOADING: NIX_LOADING,
    public _NIX_SELECTED: NIX_SELECTED,
    public _NixDoctypeJSON: NixDoctypeJSON,
    public _NixDoctypeReport: NixDoctypeReport,
    public _mongoHttpClient:mongoHttpClient,
    public _NIX_ALERT: NIX_ALERT,
    public _NIX_ACTIVE_DOCTYPE: NIX_ACTIVE_DOCTYPE,
    public _AlertController: AlertController
  ) {
    super(_NixDoctypeJSON, _NIX_ACTIVE_DOCTYPE, _AlertController, _NIX_ALERT)
  }

  RUN() {
    return new Promise<void>((resolve, reject) => {
      this.Mandatory().then(() => {

          this.PUT_FORM().then(($all_form: any) => {
            resolve()
          }).catch(()=>{
            reject()
          })
        })
        .catch((e) => {
          console.log("e", e);

          reject();
        });
    });
  }
  PUT_FORM() {
    return new Promise((resolve, reject) => {
      this._NIX_SELECTED.forms.forEach((form) => {
        if (form.form_id === this._NIX_ACTIVE_DOCTYPE.id) {          
          form.form_JSON = this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Send();  
            this.Generate_Template(form).then((Generate_Template: any) => {
              let save_to_encounter = Object.assign(
                { summary: Generate_Template },
                {
                  chart: this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Save_to_Encounter(this._NIX_ACTIVE_DOCTYPE),
                }
              );
              this._mongoHttpClient.PUT_FORM( this._NIX_ACTIVE_DOCTYPE.get(), this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Send(), this._NIX_SELECTED.get(), save_to_encounter).then(($PUT: any) => {
                  if ($PUT?._id) {
                    this._NIX_ALERT.Error("There is no Document for this Form", $PUT, 1, 1 );
                    reject($PUT?._id);
                  }
                  this._NIX_ACTIVE_DOCTYPE.status = "Update";
                  this._NIX_ALERT.Success("Save to " + this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Doctype, $PUT, 1, 1
                  );
                  resolve($PUT);
                });
            }
          );
          
        }
      });
    });
  }
  Generate_Template(Form) {
    var HTML = "";
    return new Promise( async (Promise_Template) => {
        HTML =  this._NixDoctypeReport[Form.form_id].Report({ DocType: Form.form_name, Doctype_JSON: Form.form_JSON, Selected: this._NIX_SELECTED,})
        Promise_Template(HTML.replace(/[\n]/g, "<br>") + "<br>");
    });
  }
}
  