import { Injectable } from "@angular/core";
import { NIX_ACTIVE_DOCTYPE, NIX_SELECTED } from "./NIX_SELECTED";
import { DomSanitizer } from "@angular/platform-browser";
import { NIX_ALERT } from "./tools/NIX_ALERT";
import { Doctypes } from "./tools/NIX_DOCTYPES";
import { mongoHttpClient } from "./HttpServices/internal/mongoHttpClient";
import { ErpHttpClient } from "./HttpServices/internal/ErpHttpClient";
import { generalHttpClient } from "./HttpServices/internal/generalHttpClient";

@Injectable({
  providedIn: 'root'
})
export class NIX_DOCUMENTATION {
  constructor(
    private _NIX_SELECTED: NIX_SELECTED,
    private _NIX_ACTIVE_DOCTYPE: NIX_ACTIVE_DOCTYPE,
    private _DomSanitizer: DomSanitizer,
    private _NIX_ALERT: NIX_ALERT,
    private _Nix_Doctypes:Doctypes,
    private _mongoHttpClient:mongoHttpClient,
    private _ErpHttpClient:ErpHttpClient,
    private _generalHttpClient:generalHttpClient,
  ) { }

  wizard = (list_type: any, patient_appointment: any) => {
    return new Promise<string>((resolve,reject) => {
      this.get_id(list_type, patient_appointment).then(($mongo_id: string) => {
        resolve($mongo_id)
      }).catch(err=>{
        reject(err)
      })
    })
  }
  get_id = (list_type: any, patient_appointment: any) => {
    return new Promise((resolve,reject) => {
      if (list_type.source === "time_line" || list_type.source === "direct_modal") {
        resolve(patient_appointment.mongo_id || patient_appointment.np_documentation_summary)
      }
      if (list_type.source === "patient_list") {
        let doctype = ''
        let filters = ''
        let fields = '"np_documentation_summary"'
        let order_by = ''
          doctype =this._Nix_Doctypes.doctypes.NP_Patient_Encounter
          filters = '["name","=", "' + patient_appointment.encounter_id + '"]'
          this._ErpHttpClient.GET(doctype, fields, filters, order_by).then(($mongo_id: any) => {
            resolve($mongo_id.data[0].np_documentation_summary)
          }).catch(err=>{
            reject(err)
          })
        }
      })
    
  }
  set_selected = ($patient_encounter) => {
    
    return new Promise((resolve,reject) => {
      if ($patient_encounter.data.length === 0) {
        reject({message:"There's no Form for this Appointment type",error:''})
      } 
      if ($patient_encounter.data.length > 0) {
        this._NIX_SELECTED.mongo.mongo_id = $patient_encounter.selected.visit_body.np_documentation_summary
        // this._NIX_SELECTED.mongo.summary = $patient_encounter.selected?.summary
        this._NIX_SELECTED.patient = $patient_encounter.selected.patient
        this._NIX_SELECTED.appointment = $patient_encounter.selected.appointment
        this._NIX_SELECTED.visit.body = $patient_encounter.selected.visit_body
        this._NIX_SELECTED.visit.type = $patient_encounter.selected.visit_type
        this._NIX_SELECTED.procedure_sublist_type = $patient_encounter.selected.visit_body?.direct_procedure === 0? "Indirect": $patient_encounter.selected.visit_body?.direct_procedure === 1? "Direct": ''
        this._NIX_SELECTED.forms = $patient_encounter.data
        this._NIX_SELECTED.modals_state=$patient_encounter?.selected?.modals_state

        //  move this to complex
        // this._NIX_ACTIVE_DOCTYPE.name = $patient_encounter.data[0].form_name
        // this._NIX_ACTIVE_DOCTYPE.version = $patient_encounter.data[0].version
        // this._NIX_ACTIVE_DOCTYPE.id = $patient_encounter.data[0].form_id
        // 
        resolve($patient_encounter)
      }
    })
  }
  get_doctype_forms = (form) => {
    return new Promise<void>(async(resolve, reject) => {
      try {
        console.log(form , this._NIX_ACTIVE_DOCTYPE.id)
        // this._NIX_SELECTED.forms.forEach(form => {
          if (form.form_id === this._NIX_ACTIVE_DOCTYPE.id) {
            this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Clear()
            this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Mandatory = form?.mandatory
            if(form?.mandatory){
            form?.mandatory.forEach((element)=>{
              this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data.mandatory[element.tab]=false;
            })}
            if (!form.form_JSON) {
              this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data.version = this._NIX_ACTIVE_DOCTYPE.version
              this._NIX_ACTIVE_DOCTYPE.status = "Save"
            }
            if (form.form_JSON) {
              this._NIX_ACTIVE_DOCTYPE.version = form.version
              this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Get({ "data": [form.form_JSON] })
              this._NIX_ACTIVE_DOCTYPE.status = 'Update'
            }
           await this.get_form_image()
           resolve()
          }
        // });
      } catch (error) {
        console.log(error);
        reject(error)
      }
    })
  }
  get_form_image = () => {
    return new Promise<void>((resolve) => {
      if (this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Images) {
        this._mongoHttpClient.GET_MONGO("images", {_id:this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Images},{},true,'medical').then(($images: any) => {
          $images.data.forEach(element => {
            this._NIX_ACTIVE_DOCTYPE.images["_" + element._id + "_safe"] = element.image
            this._NIX_ACTIVE_DOCTYPE.images["_" + element._id] = this._DomSanitizer.bypassSecurityTrustResourceUrl(element.image)
          })
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
  // load_form = (form_id) => {
  //   return new Promise<void>((resolve) => {
  //     this._NIX_SELECTED.forms.forEach(element => {
  //       if (element.form_name === form_id) {
  //         this._NIX_ACTIVE_DOCTYPE.id = element.form_id
  //         this.get_doctype_forms().then(() => {
  //           resolve()
  //         })
  //       }
  //     })
  //   })
  // }
}