import { Injectable } from "@angular/core";
import { Doctypes } from "./tools/NIX_DOCTYPES";
import { HttpClient } from "@angular/common/http";
import { NixGlobal } from "./NixGlobal";
import { ErpHttpClient } from "./HttpServices/internal/ErpHttpClient";
import { EncounterComments } from "./interfaces/mongo/encounter-comments";
@Injectable({
  providedIn: 'root'
})
export class NIX_COMMENTS {
  constructor(
    private _Nix_Doctypes:Doctypes,
    private _HttpClient:HttpClient,
    private _NixGlobal:NixGlobal,
    private _ErpHttpClient:ErpHttpClient
  
    ) {

     }
  public comment_object = {
    comment_type: 'Comment',
    reference_doctype: '',
    doctype: this._Nix_Doctypes.doctypes.Comment,
    content: '',
    reference_name: '',
  }
  public clean_comment_object = () => {
    this.comment_object.content = ''
    this.comment_object.reference_doctype = ''
    this.comment_object.reference_name = ''
  }
  public post = async () => {
    await this._ErpHttpClient.POST(this._Nix_Doctypes.doctypes.Comment, this.comment_object).then(() => {
      this.get(this.comment_object.reference_name)
    })
  }
  public get = (reference_name: any) => {
    let filter = '["comment_type","=","Comment"]' + ',' + '["reference_name","=","' + reference_name + '"]';
    const COMMENTS = new Promise((resolve) => {
      this._ErpHttpClient.GET(this.comment_object.doctype, '"*"', filter, 'creation desc').then(($comment: any) => {
        resolve($comment)
      })
    })
    let medical_user_settings_fields = '"user_type", "user_name", "user_id"';
    const MEDICAL_USER_SETTINGS = new Promise((resolve) => {
      this._ErpHttpClient.GET(this._Nix_Doctypes.doctypes.Medical_User_Settings, medical_user_settings_fields, '', 'creation desc').then(($healthcare_practitioner: any) => {
        resolve($healthcare_practitioner)
      })
    })
    return Promise.all([COMMENTS, MEDICAL_USER_SETTINGS]).then(([$comment, $healthcare_practitioner]: any) => {
      $comment.data.forEach((comment) => {
        Object.assign(comment, $healthcare_practitioner.data.filter((healthcare_practitioner) => {
          return comment.owner == healthcare_practitioner.user_id
        }))
      })
      return $comment.data
    })
  }
  //make seprate function
  public PostCommentMongo(data:EncounterComments){
    return new Promise((resolve,reject)=>{
        this._HttpClient.post(`${this._NixGlobal.API}/gateway/encounter-comments`, data)
        .subscribe($POST => {
          console.log('Post data: ',$POST,)
          resolve($POST)
        }), $Error => {console.log($Error,'ERROR posting comment in mongo')};
    })
  }

  public getMonogComments(appointment_id){
		return new Promise((resolve,reject)=>{
			const params = {
				filters: JSON.stringify({
				  "meta_data.appointment_id": appointment_id
				}),
				sort: JSON.stringify({
				  "meta_data.creation.created_time": -1
				  }),
			  }
			  console.log('%cGet Comments:', 'color: green; font-weight: bold;', params);
			  this._HttpClient.get<{data:[EncounterComments]}>(`${this._NixGlobal.API}/gateway/encounter-comments`, { params }).subscribe((Data:any)=>{
				this.handle_comment_from_mongo(Data?.data).then((data)=>{
				resolve(data)
				})
			  }), $Error => {console.log($Error,'ERROR get comment in mongo')
          reject([])
        };
		})
	}

  handle_comment_from_mongo(data:[EncounterComments]){
    return new Promise((resolve) => {
      let Data = []
      if(data?.length){
        data.forEach((comment,index)=>{
          Data[index]={
          user_full_name:comment.meta_data.creation.created_by_name,
          comment_type:comment.json.comment_type,
          content:comment.json.content,
          creation:comment.meta_data.creation.created_time,
          modified:comment.meta_data.modified.modified_time,
          modified_by:comment.meta_data.modified.modified_by_id,
          owner:comment.meta_data.creation.created_by_id,
          reference_doctype:comment.json.reference_doctype,
          reference_name:comment.json.reference_name,
          user_type:comment.json.user_type
          }
          if(index == data.length -1){
            resolve(Data)
          }
        })
      }else{
        resolve(Data)
      }
    })
  }
}
