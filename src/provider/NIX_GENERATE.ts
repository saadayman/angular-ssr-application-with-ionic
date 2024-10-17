import { Injectable } from "@angular/core";
import { generalHttpClient } from "./HttpServices/internal/generalHttpClient";
import { NixGlobal } from "./NixGlobal";
import { NIX_AGE_CALCULATE } from "./tools/NIX_AGE_CALCULATE";

@Injectable({
  providedIn: 'root'
})
export class NIX_GENERATE {
  constructor(
    private _NixGlobal: NixGlobal,
    private _NIX_AGE_CALCULATE: NIX_AGE_CALCULATE,
    private _generalHttpClient: generalHttpClient,
  ) { }
  public generate_body = (patient_appointment, $visit_type) => {
    return new Promise(resolve => {
      const visit_body = {
        patient: patient_appointment.patient,
        practitioner: patient_appointment.practitioner,
        generated_by_id: this._NixGlobal.Doctor.name,
        appointment: patient_appointment.name,
        appointment_type: patient_appointment.appointment_type,
        branch: patient_appointment?.branch,
        procedure_template: patient_appointment.procedure_template,
        patient_age: this._NIX_AGE_CALCULATE.calculate(patient_appointment.date_of_birth).age_string,
        company: patient_appointment.company,
        source: 'Direct',
        docstatus: 0,
        healthcare_service_unit: patient_appointment.service_unit,   // service_unit v12
        medical_department: patient_appointment.department,
        visit_type: $visit_type.type
      }
      const  filters = {
        "department": patient_appointment.department,
        "appointment_type": patient_appointment.appointment_type,
        "gender": patient_appointment.patient_sex,
        "clinical_procedure_template": patient_appointment.procedure_template,
      }
      resolve({visit_body, filters})
      })
  }
  public generate_visit = (visit_type, patient_appointment) => {
    return new Promise<void>((resolve,reject) => {
      this.generate_body(patient_appointment, visit_type).then(($generate_body) => {    
        // if (patient_appointment.allow_direct_orders) {
        //   this._NixHttpDoctype.Generate_Documentation_Extra_order($generate_body, visit_type).then(($generate_documentation: any) => {  //add by ahmad   
        //     console.log('$generate_documentation', $generate_documentation);
        //     if ($generate_documentation.req_status === 1) {
        //       resolve()
        //     }
        //     if ($generate_documentation.req_status === 3) {
        //       reject({message: $generate_documentation.massege, refresh: true})
        //     }
        // })

        // } 
        // if (!patient_appointment.allow_direct_orders) {
          this._generalHttpClient.Generate_Documentation($generate_body, visit_type).then(($generate_documentation: any) => {  //add by ahmad   
            
            if ($generate_documentation.req_status === 1) {
              resolve($generate_documentation)
            }
            if ($generate_documentation.req_status === 0) {  // There are No Form Work Flow for This Appointment
              reject({message: $generate_documentation.massege})
            }
            if ($generate_documentation.req_status === 3) {   // This Appointment is allready in-progress, Please Refresh
              reject({message: $generate_documentation.massege, refresh: true})
            }
            if ($generate_documentation.req_status === 2) {  // there is dublicated in Form Work flow
              reject({message: $generate_documentation.massege})
            } 
          })
          
        // } 
      });
    })
  }
}