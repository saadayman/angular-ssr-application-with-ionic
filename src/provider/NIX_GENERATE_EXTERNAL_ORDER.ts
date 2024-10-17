
import { Injectable } from "@angular/core";
import { NixGlobal } from "./NixGlobal";
import { NIX_AGE_CALCULATE } from "./tools/NIX_AGE_CALCULATE";
import { NIX_STORAGE } from "./tools/NIX_STORAGE";
import {Doctypes} from "./tools/NIX_DOCTYPES"
import { requestsService } from "./HttpServices/httpService.service";
import { generalHttpClient } from "./HttpServices/internal/generalHttpClient";


@Injectable({
  providedIn: 'root'
})
export class NIX_GENERATE_EXTERNAL_ORDER {
  constructor(
    private _NixGlobal: NixGlobal,
    private _NIX_AGE_CALCULATE: NIX_AGE_CALCULATE,

    private _NixStorage: NIX_STORAGE,
    private _NixDoctypes:Doctypes,
    public  _requestsService:requestsService,
    public  _generalHttpClient:generalHttpClient
  ) { }
  public generate_body = (patient_appointment, $visit_type) => {
    return new Promise(resolve => {
      let visit_body = {
        patient: patient_appointment.patient,
        practitioner: patient_appointment.practitioner,
        generated_by_id: this._NixGlobal.Doctor.name,
        appointment: patient_appointment.name,
        extra_order: 1,
        reference_type: $visit_type.type,
        reference_name: patient_appointment.encounter_id || patient_appointment.procedure_id,
        appointment_type: patient_appointment.appointment_type,
        procedure_template: patient_appointment.procedure_template,
        patient_age: this._NIX_AGE_CALCULATE.calculate(patient_appointment.date_of_birth).age_string,
        company: patient_appointment.company,
        source: 'Direct',
        docstatus: 0,
        
        healthcare_service_unit: patient_appointment.service_unit,   // service_unit v12
        filters: {
          "department": patient_appointment.department,
          "appointment_type": patient_appointment.appointment_type,
          "gender": patient_appointment.patient_sex,
          "clinical_procedure_template": patient_appointment.procedure_template,
        }
      }
      if ($visit_type.type === this._NixDoctypes.doctypes.NP_Patient_Encounter) {
        resolve(Object.assign(visit_body, { medical_department: patient_appointment.department }))
      }
      if ($visit_type.type === this._NixDoctypes.doctypes.NP_Clinical_Procedure) {
        resolve(Object.assign(visit_body, {
          medical_department: patient_appointment.department,
        }))
      }
    })
  }
  public generate_visit = (visit_type, patient_appointment) => {
    return new Promise<void>((resolve,reject) => {
      this.generate_body(patient_appointment, visit_type).then(($generate_body) => {
        this.Generate_Documentation($generate_body, patient_appointment.status, visit_type).then(($generate_documentation: any) => {  //add by ahmad                    
          if ($generate_documentation.req_status === 1) {
            resolve()
          }
          if ($generate_documentation.req_status === 0) {
            reject({message: $generate_documentation.massege})
          }
          if ($generate_documentation.req_status === 2) {
            reject({message: $generate_documentation.massege})
          } 
          if ($generate_documentation.req_status === 3) {
            reject({message: $generate_documentation.massege, refresh: true})
          } 
        })
      });
    })
  }

  Generate_Documentation = (Visit_Body, status, Type) => {
    var startTime = performance.now()
    return new Promise((resolve, rejects) => {
   
        this._requestsService.Request_Console('generate_extra_order', { 'DocType': Type.type, 'Visit_Body': Visit_Body })
        // this._NixStorage.get('authorization').then(($Authorization: any) => {
          
        this._NixStorage.get("location").then(($Location: any) => {
            const Generate_Body = {
              url: $Location.url,
              visit_type: Type.type,
              visit_body: Visit_Body,
              status,
              // authorization: $Authorization.api_key + ':' + $Authorization.api_secret,
              db: $Location.db
            }
            let url = `${this._NixGlobal.API}/general/generate_extra_order`
            this._generalHttpClient.PostGeneral('generate_extra_order',Generate_Body,url,Type).then(($$POST => {
            
                resolve($$POST)
              
            })).catch( $Error => {
   
                rejects({ data: [], "Error": $Error });
             
            })
            // this._HttpClient.post(`${this._NixGlobal.API}/general/generate_extra_order`, Generate_Body).subscribe($$POST => {
            //   var endTime = performance.now()
            //   this._requestsService.Check_Netowrk_Status.Success("POST", Type.type, Object.assign($$POST,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
            //     resolve($$POST)
            //   })
            // }, $Error => {
            //   var endTime = performance.now()
            //   this._requestsService.Check_Netowrk_Status.Error("POST", Type.type, Object.assign($Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}), 1, 1).then(() => {
            //     rejects({ data: [], "Error": $Error });
            //   })
            // });
          })
        // })
      })
    
  }
}