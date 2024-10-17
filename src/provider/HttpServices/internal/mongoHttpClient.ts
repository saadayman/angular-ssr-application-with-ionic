import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NIX_ALERT } from 'src/provider/tools/NIX_ALERT';
import { NIX_LOADING } from "../../tools/NIX_LOADING";
import { NixGlobal } from '../../NixGlobal';
import { Router } from '@angular/router';
// import { NixAuth } from '../../NixAuth';
import { NIX_STORAGE } from '../../tools/NIX_STORAGE';
import { requestsService } from '../httpService.service';

@Injectable({providedIn:'root'})

export class mongoHttpClient{
    constructor(
        public _HttpClient: HttpClient,
        public _NIX_ALERT: NIX_ALERT,
        public _NixStorage: NIX_STORAGE,
        public _NixGlobal: NixGlobal,
        public _NIX_LOADING: NIX_LOADING,
        public _Router: Router,
        // public _NixAuth: NixAuth,
        public _requestsService:requestsService
    ){
    
    
    }
 
      Request_Console(Request_Type:string, JSON:any) {
        this._requestsService.Request_Console(Request_Type, JSON)
      }

    POST_MONGO( Collection:string, Data:any, Options:any={}) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('POST_MONGO', { 'Collection': Collection, 'Data': Data})            
                const POST_BODY = {
                  collection: Collection,
                  data: Data,
                  options: Options,
                }
                this._HttpClient.post(`${this._NixGlobal.API}/mongo/insert`, POST_BODY)
                  .subscribe($$POST => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("POST COLLECTION", Collection,$Data).then(() => {
                      resolve($$POST)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("POST COLLECTION", Collection,$Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
         
      }
      // mongo
      PUT_MONGO( Collection:string, filter:any, Data:any,Id:boolean, Options?:any,) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('PUT_MONGO', { 'Collection': Collection, "Filter": filter,'Data': Data})          
                const PUT_BODY = {
                  collection: Collection,
                  data: Data,
                  options: Options,
                  id: Id,
                  filter,
                }
                this._HttpClient.put(`${this._NixGlobal.API}/mongo/update`, PUT_BODY)
                  .subscribe($$PUT => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$PUT,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("PUT COLLECTION", Collection, $Data).then(() => {
                      resolve($$PUT)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("PUT COLLECTION", Collection, $Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
          
      }
      // mongo
      GET_MONGO( Collection:string, Filters:any, Option:any ,Id:boolean,db?:string) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('GET_MONGO', { 'Collection': Collection,'Filters': Filters, "Option": Option})
                const POST_BODY = {
                  collection: Collection,
                  filters: Filters,
                  option: Option,
                  id : Id,
                  db
                }
                this._HttpClient.post(`${this._NixGlobal.API}/mongo/get_doc`, POST_BODY)
                  .subscribe($$POST => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("GET COLLECTION", Collection, $Data).then(() => {
                      resolve($$POST)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("GET COLLECTION", Collection, $Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
         
      }
      // mongo
      DELETE_MONGO( Collection:string, Filters:any,Id:boolean) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('DELETE_MONGO', { 'Collection': Collection,'Filters': Filters})
                const POST_BODY = {
                  collection: Collection,
                  filters: Filters,
                  id:Id,
                  deleted_by:this._NixGlobal.Doctor.user_name
                }
                this._HttpClient.post(`${this._NixGlobal.API}/mongo/delete_doc`, POST_BODY)
                  .subscribe($$POST => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("DELETE COLLECTION", Collection, $Data).then(() => {
                      resolve($$POST)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("DELETE COLLECTION", Collection, $Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
          
      }

      PUT_FORM( Form, Data, selected, save_to_encounter) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('PUT_FORM', { 'Selected': selected, 'Form_name': Form.name, 'Data': Data, "Save_To_Encounter": save_to_encounter})
                const PUT_BODY = {
                  selected: selected,
                  save_to_encounter: save_to_encounter,
                  form_id: Form.id,
                  data: Data,
                }
                this._HttpClient.put(`${this._NixGlobal.API}/mongo/update_form`, PUT_BODY)
                  .subscribe($$PUT => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$PUT,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("PUT FORM", selected.mongo.mongo_id, $Data).then(() => {
                      resolve($$PUT)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("PUT FORM", selected.mongo.mongo_id,$Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
          
    
      }
      // mongo
      PUT_COMPLEX_FORM( Form, Data, selected, save_to_encounter, option) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('PUT_COMPLEX_FORM', { 'Selected': selected, 'Form_name': Form.name, 'Data': Data, "Save_To_Encounter": save_to_encounter, option})
                const PUT_BODY = {
                  selected: selected,
                  save_to_encounter: save_to_encounter,
                  form: Form,
                  data: Data,
                  option,
              
                }
                this._HttpClient.put(`${this._NixGlobal.API}/mongo/update_complex_form`, PUT_BODY)
                  .subscribe($$PUT => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$PUT,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("PUT FORM", selected.mongo.mongo_id, $Data).then(() => {
                      resolve($$PUT)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("PUT FORM", selected.mongo.mongo_id,$Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
          
      
      }
      INSERT_MANY( Collection, Data, Options={}) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
  
            this.Request_Console('POST_MONGO', { 'Collection': Collection, 'Data': Data})
              this._NixStorage.get("location").then(($Location: any) => {            
                const POST_BODY = {
                  db: $Location.db,
                  collection: Collection,
                  Options,
                  data: Data
                }
                this._HttpClient.post(`${this._NixGlobal.API}/mongo/insertMany`, POST_BODY)
                  .subscribe($$POST => {               
                    var endTime = performance.now()
                    this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                      this._requestsService.Check_Netowrk_Status.Success("POST COLLECTION", Collection,$Data).then(() => {
                        resolve($$POST)
                      })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                    this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                      this._requestsService.Check_Netowrk_Status.Error("POST COLLECTION", Collection,$Data,1,1).then(() => {
                        rejects({data:[],"Error":$Error});
                      })
                    })
                  });
              })
          })
     
      }
      fetchPatientEncounters(payload){
        return new Promise((resolve,reject)=>{
          // Start timing now
          console.log(`%cCollection : %c forms`, 'color: #FFC300', 'color:#fded76')
          console.log(`%cBody : %c${JSON.stringify(payload)}`, 'color: #FFC300', 'color:#fded76')
          console.time("Request time");
          //make seprate function
          this._HttpClient.post(`${this._NixGlobal.API}/mongo/timeline_encounters`,payload).subscribe((encounters:any)=>{
           resolve(encounters)
            console.timeEnd("Request time");   
          },error=>{
            reject(error)
            console.log(error)
          })
        })
    
      }
      GET_Release_Note( Filters:any) {
        var startTime = performance.now()
        return new Promise((resolve,rejects) => {
         
            this.Request_Console('Relese Note', {'Collection':'Relese Note', 'Filters': Filters})
                const POST_BODY = {
                  filters: Filters
                }
                this._HttpClient.post(`${this._NixGlobal.API}/public/release-note`, POST_BODY)
                  .subscribe($$POST => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($$POST,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Success("GET COLLECTION", 'Release Note', $Data).then(() => {
                      resolve($$POST)
                    })
                    })
                  }, $Error => {
                    var endTime = performance.now()
                     this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then(($Data) => {
                     this._requestsService.Check_Netowrk_Status.Error("GET COLLECTION", 'Release Note', $Data,1,1).then(() => {
                      rejects({data:[],"Error":$Error});
                    })
                    })
                  });
              })
         
      }
}