import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { requestsService } from '../httpService.service';


@Injectable({providedIn:'root'})

export class PublicHttpClient {
constructor(
    private _HttpClient: HttpClient,
    private _requestsService: requestsService,
){}
Get_Public(flag:string,params:any,url:string){
  var startTime = performance.now()
  return new Promise((resolve,rejects) => {
    this._requestsService.Request_Console(flag, { 'Collection': flag, 'data':params})
    let Request_Url = url; // &authorization=${$Authorization.api_key + ':' + $Authorization.api_secret
    this._HttpClient.get(Request_Url,{params})
      .subscribe($$GET => {
        var endTime = performance.now()
        this._requestsService.Check_Netowrk_Status.Add_Time($$GET,endTime,startTime).then((Data) => {
        this._requestsService.Check_Netowrk_Status.Success("GET", flag, Data).then(() => {
          resolve($$GET)
        })
      })
      }, $Error => {
        var endTime = performance.now()
        this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
        this._requestsService.Check_Netowrk_Status.Error("GET", flag, Data ,1,1).then(() => {
          rejects({data:[],"Error":$Error});
        })
        })
      });
    });
  }


      PostPublic(flag:string,body:any,url:string){
        var startTime = performance.now()
        return new Promise((resolve,reject)=>{
          this._requestsService.Request_Console(flag, {})
          let Request_Url = url; // &authorization=${$Authorization.api_key + ':' + $Authorization.api_secret

          this._HttpClient.post(Request_Url,body)
            .subscribe($$Post => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($$Post,endTime,startTime).then((Data) => {
              this._requestsService.Check_Netowrk_Status.Success("Post", flag,{}).then(() => {
                resolve($$Post)
              })
            })
            }, $Error => {
              var endTime = performance.now()
              this._requestsService.Check_Netowrk_Status.Add_Time($Error,endTime,startTime).then((Data) => {
              this._requestsService.Check_Netowrk_Status.Error("POST", flag, Data ,1,1).then(() => {
                reject({data:[],"Error":$Error});
              })
              })
            });
        });
  

    
      }
}