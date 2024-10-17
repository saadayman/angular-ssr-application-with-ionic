import { Injectable } from "@angular/core";
import { NixDoctypeJSON } from "./NixDoctypeJSON";
import { NixDoctypeReport } from "./NixDoctypeReport";


@Injectable({
   providedIn: 'root'
})
export class NIX_ACTIVE_DOCTYPE {
   constructor(
      private _NixDoctypeJSON: NixDoctypeJSON,
      private _NixDoctypeReport: NixDoctypeReport,
   ) { }

   public id: any
   public name: any
   public status: any
   public version: any
   public images: any = {}
   public mandatory: any = {}
   public DocType_JSON = () => { return this._NixDoctypeJSON[this.id] }
   public Doctype_Report = () => { return this._NixDoctypeReport[this.id] }

   get = () => {
      return {
         id: this.id,
         name: this.name,
         status: this.status,
         version: this.version,
         images: this.images,
      }
   }
}

@Injectable({
   providedIn: 'root'
})
export class NIX_SELECTED {
   public visit: any = {}
   public patient: any
   public appointment: any
   public forms: any
   public list_type: any
   public procedure_sublist_type: any
   public mongo: any = {}
   public modal_work_flow:any
   public modals_state:any=[]

   clear = () => {
      this.visit = {}
      this.patient = {}
      this.appointment = {}
      this.forms = {}
      this.mongo = {}
      this.modals_state={}
      this.modal_work_flow=[]
   }
   get = () => {
      return {
         visit: this.visit,
         patient: this.patient,
         appointment: this.appointment,
         forms: this.forms,
         list_type: this.list_type,
         procedure_sublist_type: this.procedure_sublist_type,
         mongo: this.mongo
      }
   }
}
