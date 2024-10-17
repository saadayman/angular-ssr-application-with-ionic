import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InfectionProfileServiceService } from 'src/app/modal/Infetction_Report/infection-profile-service.service';
import { ApiServicesService } from 'src/app/modal/Vitals/services/api-services.service';
import { HevolutionHttpService } from 'src/app/modal/hevolution-medical-form/services/http-service.service';
import { ImmunizationHttpService } from 'src/app/modal/immunization/service/http-service.service';
import { NutritionalScreeningHttpService } from 'src/app/modal/nutritional-screening/services/http-service.service';
import { OrderApiService } from 'src/app/modal/orders-main/services/api.service';
import { PlanOfCareHttpService } from 'src/app/modal/plan-of-care/services/http-service.service';
import { ProblemsService } from 'src/app/modal/problems/problems-service.service';
import { PatientTestResultHttpService } from 'src/app/modal/ptient-test-result/services/http-service.service';
import { GlobalComplexService } from 'src/app/pages/complex-documentation/global-complex.service';
import { ErpHttpClient } from 'src/provider/HttpServices/internal/ErpHttpClient';
import { generalHttpClient } from 'src/provider/HttpServices/internal/generalHttpClient';
import { mongoHttpClient } from 'src/provider/HttpServices/internal/mongoHttpClient';
import { NixGlobal } from 'src/provider/NixGlobal';
import { Problem } from 'src/provider/interfaces';
import { Doctypes } from 'src/provider/tools/NIX_DOCTYPES';
import { NIX_LOADING } from 'src/provider/tools/NIX_LOADING';
import { NIX_STORAGE } from 'src/provider/tools/NIX_STORAGE';
import { HelperService } from './helperService.service';

@Injectable({
  providedIn: 'root'
})
export class ModalsHandlerService {
  ModalsArray:any[] = []
  private _NIX_SELECTED
  constructor(
        public _NixGlobal: NixGlobal,
        public _mongoHttpClient: mongoHttpClient,
        public _ErpHttpClient: ErpHttpClient,
        public _Nix_Doctypes: Doctypes,
        public http_client: HttpClient,
        public _vitals_api: ApiServicesService,
        public global_complex:GlobalComplexService,
        public activated_route:ActivatedRoute,
        public _generalHttpClient:generalHttpClient,
        public  _plan_of_care_http_serivce:PlanOfCareHttpService,
        public _nutrtional_screening_http_service:NutritionalScreeningHttpService,
        public _infection_profile_service:InfectionProfileServiceService,
        public _patient_test_result_service:PatientTestResultHttpService,
        public problems_module_service:ProblemsService,
        public immunization_http_service:ImmunizationHttpService,
        public hevolution_http_service:HevolutionHttpService,
        public order_api_service:OrderApiService,
        public _HelperService:HelperService,
        public NixStorage:NIX_STORAGE,
        public NixLoading:NIX_LOADING,
      ) {
    
      }
    
    
    public set SetNixSelected(value : unknown) {
      this._NIX_SELECTED = value
    }
    public set modalsSetter(value : unknown[]) {
      this.ModalsArray = value
    }
    
    
    public get modalStatusAndNames()  {
      return this.ModalsArray
    }
    
      getModalInfoFromMongo(collection,filters,options={},Id:boolean=false) {
        // let filter = { "meta_data.encounter_id": this.global_complex._NIX_SELECTED.appointment.encounter_id }
        return this._mongoHttpClient.GET_MONGO(collection, filters, options, Id)

      }
      getModalInfoFromErp(doctype,fields,filters,order_by){
        return    this._ErpHttpClient.GET(doctype, fields, filters, order_by)
      }

      getModalInfoBasedOnGatewayApi(url,params){
        return  this.http_client.get(url, { params })
       }
      async getModalsWorkflow(){
      try {
       const modal_work_flow:any= await this._generalHttpClient.Modal_Work_Flow({
          department:this._NIX_SELECTED.appointment.department,
          appointment_type:this._NIX_SELECTED.appointment.appointment_type,
          gender:this._NIX_SELECTED.appointment.patient_sex})
          console.log(modal_work_flow)
          this.modalsSetter = modal_work_flow.selected.modal_work_flow
        } catch (error) {
        console.error('ERROR TRYING TO FETCH MODALS WORK FLOW',error)
        return error
      }


      }
      fetch_fall_assessment_results() {
        let filter = { "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id };
        
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO('fall_assessment', filter, {}, false).then((data: any) => {
            if (data?.data?.length) {
              resolve('saved');
            } else {
              resolve('not saved');
            }
          }).catch((error) => {
            resolve('not saved');
          });
        });
      }
    
      Get_Episode() {
        
        if (this._NIX_SELECTED.visit.body.episode_id) {
          return  Promise.resolve('saved')
        }else{
          return  Promise.resolve('not saved')
        }
      }
    
      GET_Patient_Allergies() {
        let Doctype = 'patient_allergy';
        let Filters = { "patient_id": this._NIX_SELECTED.appointment.patient };
        let Order_By = {};
      
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO(Doctype, Filters, Order_By, false).then((data: any) => {
            if (data?.data?.length) {
              resolve('saved');
            } else {
              resolve('not saved');
            }
          }).catch((error) => {
            resolve('not saved');
          });
        });
      }
      GET_Patient_Problems() {
        let Problem_Filters = `["patient","=","${this._NIX_SELECTED.appointment.patient}"]`;
        let Problem_Fields = '"name"';
        const request_params = {
          Problem_Filters,
          Problem_Fields,
          Problem_Order_By: ''
        };
      
        return new Promise((resolve) => {
          this.problems_module_service.GET_Problems(request_params).then((problems: Problem[]) => {
              if (problems.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            }, (error) => {
              resolve('not saved'); // In case of an error, resolve with 'not saved'
            });
          });
        
      }
      
    
      vitalsInfo() {
        const filters = JSON.stringify({ "meta_data.appointment_id": this._NIX_SELECTED.appointment.name });
      
        return new Promise((resolve) => {
          this._vitals_api.get_vitals_signs_report(filters, false).subscribe({
            next: (res) => {
              if (res.vitals.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            error: (err) => {
              console.log('Error in get Vitals');
              resolve('not saved'); // Resolve as 'not saved' in case of an error
            },
          });
        });
      }
      
    
      GET_Pain() {
        let filters = { "encounter_id": this._NIX_SELECTED.appointment.encounter_id };
      
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO('pain_assessment', filters, {}, false)
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved');
            });
        });
      }
      
    
      get_Immunization() {
        const params = {
          filters: JSON.stringify({
            "meta_data.patient_id": this._NIX_SELECTED.appointment.patient,
          }),
          get_summary: false,
          populate: false,
        };
      
        return new Promise((resolve) => {
          this.immunization_http_service.get_record(params).subscribe(
            (Data: any) => {
              if (Data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              // Optional: resolve with 'not saved' in case of an error
              resolve('not saved');
            }
          );
        });
      }
      
    
      get_sick_leaves() {
        let Fields = '"name"';
        
        return new Promise((resolve) => {
          this._ErpHttpClient.GET(this._Nix_Doctypes.doctypes.Patient_Sick_Leave, Fields, `["reference_name","=","${this._NIX_SELECTED.appointment.encounter_id}"]`, '')
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              // Optional: resolve with 'not saved' in case of an error
              resolve('not saved');
            });
        });
      }
      
    
      get_outcome_measures() {
        let collection = "outcome_measures";
        let filters = { "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id };
        
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO(collection, filters, {}, false).then((data: any) => {
            if (data?.data?.length) {
              resolve('saved');
            } else {
              resolve('not saved');
            }
          }).catch((error) => {
            resolve('not saved'); // Optional: handle error
          });
        });
      }
      
    
      get_ordres_from_mongo() {
        let filters = JSON.stringify({
          "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id
        });
        const sort = JSON.stringify({ "updatedAt": 1 });
      
        return new Promise((resolve) => {
          this.order_api_service.get_cpoe('All', filters, sort).subscribe(data => {
            if (data.total_count > 0) {
              resolve('saved');
            } else {
              resolve('not saved');
            }
          }, (error) => {
            resolve('not saved'); // Optional: handle error
          });
        });
      }
      
    
      get_patient_history() {
        const Doctype = 'patient_history';
        const Filters = { "patient_id": this._NIX_SELECTED.appointment.patient };
      
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO(Doctype, Filters, {}, false)
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved'); // Optional: handle error
            });
        });
      }
      
    
      Get_Approval() {
        let Filters = `["patient","=","${this._NIX_SELECTED.appointment.patient}"]`;
        let Fields = '"name"';
      
        return new Promise((resolve) => {
          this._ErpHttpClient.GET(this._Nix_Doctypes.doctypes.NP_Patient_Payor_Approval, Fields, Filters, 'modified DESC')
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved'); // Optional: handle error
            });
        });
      }
      
    
      get_patient_education() {
        const url = `${this._NixGlobal.API}/gateway/patient_education`;
        const params = {
          filters: JSON.stringify({
            "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id,
          }),
          populate: false,
        };
      
        return new Promise((resolve) => {
          this.http_client.get(url, { params }).subscribe(
            (Data: any) => {
              if (Data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: handle error
            }
          );
        });
      }
      
    
      Get_graphs_annotation() {
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO('graphs_annotation', { 'meta_data.encounter_id': this._NIX_SELECTED.appointment.encounter_id }, {}, false)
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved'); // Optional: handle error
            });
        });
      }
      
    
      get_infection_profile() {
        const payload_details = {
          filters: { "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id },
          options: {},
          id: false
        };
      
        return new Promise((resolve) => {
          this._infection_profile_service.GetInfectionProfile(payload_details)
            .then((data: any) => {
              if (data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved'); // Optional: handle error
            });
        });
      }
      
      
    
      get_nutritional_screening() {
        const params = {
          filters: JSON.stringify({
            "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id,
          }),
          populate: false,
        };
      
        return new Promise((resolve) => {
          this._nutrtional_screening_http_service.get_records(params).subscribe(
            (data: any) => {
              if (data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('error'); // Optional: resolve with 'error' if there's a request failure
            }
          );
        });
      }
      
    
      get_plan_of_care() {
        const params = {
          filters: JSON.stringify({
            "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id,
          }),
          populate: false,
        };
      
        return new Promise((resolve) => {
          this._plan_of_care_http_serivce.get_records(params).subscribe(
            (Data: any) => {
              if (Data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: resolve with 'not saved' in case of an error
            }
          );
        });
      }
      
    
      Get_Intake_And_Output() {
        const url = `${this._NixGlobal.API}/gateway/intake-and-output`;
        const params = {
          filters: JSON.stringify({
            "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id,
          }),
          get_summary: false,
          populate: false,
        };
      
        return new Promise((resolve) => {
          this.http_client.get(url, { params }).subscribe(
            (Data: any) => {
              if (Data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: resolve with 'not saved' in case of an error
            }
          );
        });
      }
      
      get_hevolution_record() {
        const params = {
          filters: JSON.stringify({
            "meta_data.patient_id": this._NIX_SELECTED.appointment.patient,
          }),
          appointment_id: this._NIX_SELECTED.appointment.name
        };
      
        return new Promise((resolve) => {
          this.hevolution_http_service.get_hevolution_record(params).subscribe(
            (data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: resolve with 'not saved' in case of an error
            }
          );
        });
      }
      
    
      get_patient_test_results() {
        const params = {
          filters: JSON.stringify({
            "meta_data.encounter_id": this._NIX_SELECTED.appointment.encounter_id
          }),
          sort: JSON.stringify({
            "meta_data.creation.created_time": -1
          }),
        };
      
        return new Promise((resolve) => {
          this._patient_test_result_service.get_records(params).subscribe(
            (data: any) => {
              if (data?.records?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: resolve with 'not saved' in case of an error
            }
          );
        });
      }
      
    
      get_consent_form() {
        const doctype = this._Nix_Doctypes.doctypes.Consent_Form;
        const fields = '"*"';
        const filters = `["appointment","=","${this._NIX_SELECTED.appointment.name}"]`;
      
        return new Promise((resolve) => {
          this._ErpHttpClient.GET(doctype, fields, filters, '').then(
            (data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            },
            (error) => {
              resolve('not saved'); // Optional: resolve with 'not saved' in case of an error
            }
          );
        });
      }
      getPatientTeeth() {
        return new Promise((resolve) => {
          this._mongoHttpClient.GET_MONGO('teeth', { 'patient_id': this._NIX_SELECTED.appointment.patient }, {}, false)
            .then((data: any) => {
              if (data?.data?.length) {
                resolve('saved');
              } else {
                resolve('not saved');
              }
            })
            .catch((error) => {
              resolve('not saved'); // Optional: handle error
            });
        });
      }
      async processModalsForMandatoryAndNotify() {
        const mandatory_modals = [];
        const notify_modals = [];
        this.NixLoading.present()
        await this.getModalsWorkflow();
        
        for (const modal of this.ModalsArray) {
          const saved = (await this.Modals[modal.modal_name]()) === 'saved' ? true : false;
      
          if (modal.mandatory && !saved) {
            mandatory_modals.push(modal.modal_name);
          }
      
          if (modal.notify && !saved) {
            notify_modals.push(modal.modal_name);
          }
        }
      this.NixLoading.dismiss()
        return { mandatory_modals, notify_modals };
      }

      getModalButtons(actionMethod: (input?: any) => Promise<any>) {
        return [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => Promise.resolve(false)
          },
          {
            text: 'Ok',
            handler: async ($$Input) => {
              const actual_password = await this.NixStorage.get('Password')
              const result = await this._HelperService.checkPasswordBasedOnSHA256($$Input.Password,actual_password);
              return result ? actionMethod() : Promise.resolve(false);
            }
          }
        ];
      }
    
      Modals = {
        'Fall Assessment': () => (
          this.fetch_fall_assessment_results()
        ),
        'Episode': () => (
          this.Get_Episode()
        ),
        'Patient Allergy': () => (
          this.GET_Patient_Allergies()
        ),
        'Problems': () => (
          this.GET_Patient_Problems()
        ),
        'Vitals': () => (
          this.vitalsInfo()
        ),
        'Pain Assessment And Management': () => (
          this.GET_Pain()
        ),
        'Sick Leave': () => (
          this.get_sick_leaves()
        ),
        'Outcome Measures': () => (
          this.get_outcome_measures()
        ),
        'Orders': () => (
          this.get_ordres_from_mongo()
        ),
        'Patient History': () => (
          this.get_patient_history()
        ),
        'Payor Request': () => (
          this.Get_Approval()
        ),
        'Patient Education': () => (
          this.get_patient_education()
        ),
        'Teeth': () => (
          this.getPatientTeeth()
        ),
        'Graphs Annotation': () => (
          this.Get_graphs_annotation()
        ),
        'Infectious Profile': () => (
          this.get_infection_profile()
        ),
        'Nutrition Screening': () => (
          this.get_nutritional_screening()
        ),
        'Plan of Care': () => (
          this.get_plan_of_care()
        ),
        'Intake and Output': () => (
          this.Get_Intake_And_Output()
        ),
        'Immunization': () => (
          this.get_Immunization()
        ),
        'Intake Form': () => (
          this.get_hevolution_record()
        ),
        'Consent Form': () => (
          this.get_consent_form()
        ),
        'Patient Test Result': () => (
          this.get_patient_test_results()
        )
      }
    }


    