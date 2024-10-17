import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NixGlobal } from '../../NixGlobal';
import { NIX_STORAGE } from 'src/provider/tools/NIX_STORAGE';
import { requestsService } from '../httpService.service';
import { SelectedWorkflows } from 'src/provider/interfaces/erp/np-workflow-profile/modals.interface';


//---------------------------------------------►Osama[OK]
@Injectable({
  providedIn: 'root'
})

export class generalHttpClient{
  constructor(
    public _HttpClient: HttpClient,
    public _NixGlobal: NixGlobal,
    public _requestsService:requestsService,
    public _NixStorage:NIX_STORAGE
  ) {
  
  }

  Request_Console(Request_Type:string, JSON:any) {
    this._requestsService.Request_Console(Request_Type, JSON)
  }
  Get_Summary( Data:any) {
    return new Promise((resolve,rejects) => {
        this.Request_Console('GET_Summary',Data)
            const POST_BODY = Data
            this._HttpClient.post(`${this._NixGlobal.API}/general/get_summary`, POST_BODY)
              .subscribe($POST => {
                  resolve($POST)
              }, $Error => {
                  rejects({data:[],"Error":$Error});
              });
          });
    
  }
  Get_get_image_canves( Data:any) {
    return new Promise((resolve,rejects) => {
        this.Request_Console('get_image_canves',Data)
            const POST_BODY = Data
            this._HttpClient.post(`${this._NixGlobal.API}/general/get_image_canves`, POST_BODY)
              .subscribe($POST => {
                  resolve($POST)
              }, $Error => {
                  rejects({data:[],"Error":$Error});
              });
          });
    
  }
  Generate_Documentation_Extra_order = (Visit_Body:any, Type:any) => {
    var startTime = performance.now()
    return new Promise((resolve, rejects) => {
      
        this.Request_Console('Generate_Extra_Order', { 'DocType': Type.type, 'Visit_Body': Visit_Body })

            const Generate_Body = {

              visit_type: Type.type,
              visit_body: Visit_Body.visit_body,
              filters: Visit_Body.filters,

            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/generate_documentation_extra1111`, Generate_Body).subscribe($$POST => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then((Data) => {
              this._requestsService.Check_Netowrk_Status.Success("POST", Type.type, Data).then(() => {
                resolve($$POST)
              })
              })
            }, $Error => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
              this._requestsService.Check_Netowrk_Status.Error("POST", Type.type, Data, 1, 1).then(() => {
                rejects({ data: [], "Error": $Error });
              })
              })
            });
          })
      

  }
  SIGN_OFF_extra11111( Data:any ) { 
    var startTime = performance.now()
    return new Promise((resolve,rejects) => {
      
        this.Request_Console('SIGN_OFF', { 'Mongo_ID': Data.selected.appointment.appointment_type, "Data": Data})

        const GET_BODY = Data        
            
            let Request_Url = `${this._NixGlobal.API}/general/sign_off_extra1111111`;
            
            this._HttpClient.post(Request_Url, GET_BODY)
              .subscribe($$GET => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($$GET,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Success("SIGN OFF", Data.selected.appointment.appointment_type, $Data).then(() => {
                  resolve($$GET)
                })
                })
              }, $Error => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Error("SIGN OFF", Data.selected.appointment.appointment_type, $Data,1,1).then(() => {
                  rejects({data:[],"Error":$Error});
                })
                })
              });
          });
      
      }
  Generate_Documentation = (Visit_Body:any, Type:any) => {

    var startTime = performance.now()
    return new Promise((resolve, rejects) => {
      
        this.Request_Console('Generate_Documentation', { 'DocType': Type.type, 'Visit_Body': Visit_Body })
            const Generate_Body = {
              visit_type: Type.type,
              visit_body: Visit_Body.visit_body,
              filters: Visit_Body.filters,
            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/generate_documentation`, Generate_Body).subscribe($$POST => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
              this._requestsService.Check_Netowrk_Status.Success("POST", Type.type, $Data).then(() => {
                resolve($$POST)
              })
              })
            }, $Error => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
              this._requestsService.Check_Netowrk_Status.Error("POST", Type.type, $Data, 1, 1).then(() => {
                rejects({ data: [], "Error": $Error });
              })
              })
            });
          })
      
  }
  Documentation_Wizard(Mongo_ID:string){
    var startTime = performance.now()
    return new Promise((resolve,rejects) => {
      
        this.Request_Console('Documentation_Wizard', {  'Mongo_ID': Mongo_ID, "Clinical_Procedure": '' })
            const Documentation_Wizard_Body = {
              np_documentation_summary: Mongo_ID,
            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/documentation_wizard`, Documentation_Wizard_Body)
              .subscribe($$POST => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Success(`Documentation Wizard `,Mongo_ID, $Data).then(() => {
                  resolve($$POST)
                })
                })
              }, $Error => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Error(`Documentation Wizard `,Mongo_ID, $Data,1,1).then(() => {
                  rejects({data:[],"Error":$Error});
                })
                })
              });
          })
      
  }

  SIGN_OFF( Data:any ) { 
    var startTime = performance.now()
    return new Promise((resolve,rejects) => {
      
        this.Request_Console('SIGN_OFF', { 'Mongo_ID': Data.selected.mongo.mongo_id, "Data": Data})

       
          const GET_BODY =Data
        
            let Request_Url = `${this._NixGlobal.API}/general/sign_off`;
            
            this._HttpClient.post(Request_Url, GET_BODY)
              .subscribe($$GET => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($$GET,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Success("SIGN OFF", Data.selected.mongo.mongo_id,$Data).then(() => {
                  resolve($$GET)
                })
                })
              }, $Error => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Error("SIGN OFF", Data.selected.mongo.mongo_id, $Data,1,1).then(() => {
                  rejects({data:[],"Error":$Error});
                })
                })
              });
          });
      
    }
    Modal_Work_Flow = (filters:any) => {

      var startTime = performance.now()
      return new Promise((resolve, rejects) => {
        
          this.Request_Console('Generate_Documentation', { 'DocType': 'Modal Work Flow', 'Visit_Body': filters })
              const Modals_Body = {
                filters: filters,
              }
              this._HttpClient.post<SelectedWorkflows>(`${this._NixGlobal.API}/general/modal_work_flow`, Modals_Body).subscribe($$POST => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Success("POST", 'Modal Work Flow', $Data).then(() => {
                  resolve($$POST)
                })
                })
              }, $Error => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                this._requestsService.Check_Netowrk_Status.Error("POST", 'Modal Work Flow', $Data, 1, 1).then(() => {
                  rejects({ data: [], "Error": $Error });
                })
                })
              });
            })
        
    }

 PostGeneral(flag:string,body:any,url:string,Type?:any){
  var startTime = performance.now()
    return new Promise((resolve, rejects) => {

  
        // this._NixStorage.get('authorization').then(($Authorization: any) => {
          
            this._HttpClient.post(url, body).subscribe($$POST => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Success("POST", Type?.type, Object.assign($$POST,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
                resolve($$POST)
              })
            }, $Error => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Error("POST", Type?.type, Object.assign($Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}), 1, 1).then(() => {
                rejects({ data: [], "Error": $Error });
              })
            });
          })
        // })
    
 }
 Get_General(flag:string,url:string,params:any,Type?:any){
  var startTime = performance.now()
    return new Promise((resolve, rejects) => {

  
        // this._NixStorage.get('authorization').then(($Authorization: any) => {
          
            this._HttpClient.get(url,params).subscribe($$GET => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Success("GET", Type?.type, Object.assign($$GET,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
                resolve($$GET)
              })
            }, $Error => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Error("GET", Type?.type, Object.assign($Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}), 1, 1).then(() => {
                rejects({ data: [], "Error": $Error });
              })
            });
          })
        // })
    
 }
 BULKWRITE(Collection, Data) {
  var startTime = performance.now()
  return new Promise((resolve,rejects) => {

      this.Request_Console('PUT_MULTI_DOCUMENT_MONGO', { 'Collection': Collection, 'Data': Data})
        this._NixStorage.get("location").then(($Location: any) => {
          const POST_BODY = {
            url: $Location.url,
            db: $Location.db,
            collection: Collection,
            data: Data,
          }
          this._HttpClient.post(`${this._NixGlobal.API}/general/bulkwrite`, POST_BODY)
            .subscribe({
              next: ($POST) => {                  
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($POST,endTime,startTime).then((Data) => {
                this._requestsService.Check_Netowrk_Status.Success("PUT", Collection, Object.assign({data: $POST}, {time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
                  resolve($POST)
                })
              })
              }, 
              error: ($Error) => {
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
                  this._requestsService.Check_Netowrk_Status.Error("PUT", Collection, Object.assign( $Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}),1,1).then(() => {
                    rejects({data:[],"Error":$Error});
                  })
                })
              },
              complete: () => {
                console.log("*****************COMPLETE***********************");
                
              }
            })
        });
    });

}

  Save_CPOE_MONGO_AND_ERP(Collection, Data) {
    var startTime = performance.now()
    return new Promise((resolve,rejects) => {
  
        this.Request_Console('PUT_MULTI_DOCUMENT_MONGO', { 'Collection': Collection, 'Data': Data})
          this._NixStorage.get("location").then(($Location: any) => {
            const POST_BODY = {
              url: $Location.url,
              db: $Location.db,
              collection: Collection,
              data: Data,
            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/bulksubmit_cpoes`, POST_BODY)
              .subscribe({
                next: ($POST) => {                  
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($POST,endTime,startTime).then((Data) => {
                  this._requestsService.Check_Netowrk_Status.Success("PUT", Collection, Object.assign({data: $POST}, {time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
                    resolve($POST)
                  })
                })
                }, 
                error: ($Error) => {
                  var endTime = performance.now()
                  this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
                    this._requestsService.Check_Netowrk_Status.Error("PUT", Collection, Object.assign( $Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}),1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                  })
                },
                complete: () => {
                  console.log("*****************COMPLETE***********************");
                  
                }
              })
          });
      });
    
  }
  Get_Image_canves( encounter_id,appointment_id,episode_id,gender) {
    return new Promise((resolve,rejects) => {
            const POST_BODY = {
              encounter_id:encounter_id,
              appointment_id:appointment_id,
              episode_id:episode_id,
              gender:gender
            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/get_image_canves`, POST_BODY)
              .subscribe($POST => {
                  resolve($POST)
              }, $Error => {
                  rejects({data:[],"Error":$Error});
              });
          });
    
  }

  submit_packages(Collection,Data){
    var startTime = performance.now()
    return new Promise((resolve,rejects) => {
  
        this.Request_Console('PUT_MULTI_DOCUMENT_MONGO', { 'Collection': Collection, 'Data': Data})
          this._NixStorage.get("location").then(($Location: any) => {
            const POST_BODY = {
              url: $Location.url,
              db: $Location.db,
              collection: Collection,
              data: Data,
            }
            this._HttpClient.post(`${this._NixGlobal.API}/general/submit_packages`, POST_BODY)
              .subscribe({
                next: ($POST) => {                  
                var endTime = performance.now()
                this._requestsService.Check_Netowrk_Status.Add_Time($POST,endTime,startTime).then((Data) => {
                  this._requestsService.Check_Netowrk_Status.Success("PUT", Collection, Object.assign({data: $POST}, {time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'})).then(() => {
                    resolve($POST)
                  })
                })
                }, 
                error: ($Error) => {
                  var endTime = performance.now()
                  this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
                    this._requestsService.Check_Netowrk_Status.Error("PUT", Collection, Object.assign( $Error,{time: ((endTime - startTime) / 1000).toFixed(2) + ' seconds'}),1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                  })
                },
                complete: () => {
                  console.log("*****************COMPLETE***********************");
                  
                }
              })
          });
      });
  }
fetchFileFromCloudStorage(params){
  const url = `${this._NixGlobal.API}/gateway/cloud-storage/files`
  return this._HttpClient.get<{url:string}>(url,
    {params}
  )
}
}
