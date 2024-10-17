import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import mergeImages from 'merge-images-v2';
import Painterro from 'painterro';
import { NIX_ACTIVE_DOCTYPE } from './NIX_SELECTED';
import { NixDoctypeJSON } from './NixDoctypeJSON';
import { NixGlobal } from './NixGlobal';
import { NixModal } from './NixModal';
import { LoggingService } from './tools/Nix_logs_Service';

@Injectable({
  providedIn: 'root'
})
export class NixForm {
  constructor(
    private _NixDoctypeJSON: NixDoctypeJSON,
    public _Modalcontroller: ModalController,
    public _NixGlobal: NixGlobal,
    public _NIX_ACTIVE_DOCTYPE:NIX_ACTIVE_DOCTYPE,
    public NixModal:NixModal,
    public _LoggingService:LoggingService


  ) { }

  public Painterro
   Clean_Image(Image_Root) {
    this.Add_JSON(Image_Root, '')
  }
  Make_JSON($array){
      let count = 1
      let string = "{"
      $array.forEach(element => {
        string = string + `"x${count++}" : "${this._NIX_ACTIVE_DOCTYPE.id}.Data.${element}",`
      });
      string = string.substr(0,string.lastIndexOf(',')) + "}"
  return JSON.parse(string)
  }
  Clear_Radio($json) {
   let json = this.Make_JSON($json)
   for (var key in json)
   {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[json[key].split(".")[2]][json[key].split(".")[3]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "."+ json[key].split(".")[2] + "." + json[key].split(".")[3], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[json[key].split(".")[2]][json[key].split(".")[3]])
    }
  }
  Add_JSON_Radio($root, $value) {
    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] != undefined) {
      if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]) {
        this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = $value.detail
        this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
      }
    } else {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
    }
  }
  Add_JSON_Radio_Hidden($root, value, if_value, $json) {
   let json = this.Make_JSON($json)
    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] != undefined) {
      if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] != if_value) {
        for (var key in json) {
          delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[json[key].split(".")[2]][json[key].split(".")[3]]
          this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
        }
      } else {
        this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = value.detail
        this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
      }
    } else {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
  }
  Add_JSON_Checkbox_Hidden($root, $root_value, $json) {//------[OK] ionChange
   let json = this.Make_JSON($json)

    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] == false) {
      for (var key in json) {
        delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[json[key].split(".")[2]][json[key].split(".")[3]]

        this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
      }
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] == true) {
      this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = $root_value
      this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] == undefined) {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
  }
  Add_JSON_Checkbox($root, value) {//------[OK] ionChange
    if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] == true) {
      this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = value
      this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    } if (this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] == false) {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
  }
  Add_JSON($root, value) {
    if (value) {
      this._LoggingService?.log(false,this._NIX_ACTIVE_DOCTYPE.id);

      this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = value
      this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
    if (!value) {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
  }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------->>>
  CONSOLE = {
    "add": function ($root_text, $data) {
      this._LoggingService?.log(false,"%cAdd " + "%c" + $root_text, "color:#00CC00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
    },
    "delete": function ($root_text, $data) {
      this._LoggingService?.log(false,"%cDelete " + "%c" + $root_text, "color:#FF0F00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
    }
  }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------->>>

  async Modalcontroller($component_select, $send_json_to_component, $class_name = "CSS_Modal") {
    const Modalcontroller = await this._Modalcontroller.create({
      component: $component_select,
      componentProps: { "JSON": $send_json_to_component },
      cssClass: $class_name
    })
    await Modalcontroller.present()
    this._NixGlobal.Modal_References.push(Modalcontroller)
    return await Modalcontroller.onDidDismiss()
      .then(($D) => {
        this._NixGlobal.Modal_References.pop()
        return $D;
      })
  }
  Medical_Department($root_to_save_deprtment) {
    this.NixModal.openModal('Search', {status:'Department',filter:''},{cssClass:'CSS_Search_Modal'}).then((x: any) => {
      this.Add_JSON($root_to_save_deprtment, x.data.name)
    })
  }
  Healthcare_Practitioner($department_selected_to_fiter_practitiner, $root_to_save_practitioner) {
    this.NixModal.openModal('Search', {status:'Practitioner'},{cssClass:'CSS_Search_Modal'}).then(($$Practitioner: any) => {
      this._LoggingService?.log(false,"$$Practitioner", $$Practitioner?.data);
      if($$Practitioner?.data?.practitioner_name){
        this.Add_JSON($root_to_save_practitioner, ($$Practitioner?.data?.practitioner_name + " , " + $$Practitioner?.data?.department))
      }
    })
  }
  Healthcare_Practitioner_Arabic($department_selected_to_fiter_practitiner, $root_to_save_practitioner) {
    this.NixModal.openModal('Search', {status:'Practitioner'},{cssClass:'CSS_Search_Modal'}).then(($$Practitioner: any) => {
      this._LoggingService?.log(false,"$$Practitioner", $$Practitioner?.data);
      if($$Practitioner?.data?.arabic_user_name){
        this.Add_JSON($root_to_save_practitioner, ($$Practitioner?.data?.arabic_user_name + " , " + $$Practitioner?.data?.department_arabic))
      }
    })
  }

  Medical_Procedure($root_to_save_medical_procedure, $root_to_save_department) {
    this.NixModal.openModal('Procedure', null).then(x => {
      this.Add_JSON($root_to_save_medical_procedure, x['data'].template)
      this.Add_JSON($root_to_save_department, x['data'].department)
    })
  }
   Paint(Image_Root,Image_Source){       
    var observer = this    
    var Image_Data = this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[Image_Root.split(".")[0]][Image_Root.split(".")[1]]        
    var Image_Url : any
    var Is_File_Attached = false
    if(Image_Data){
     Image_Url = Image_Data
    }else{      
      Image_Url = this._NIX_ACTIVE_DOCTYPE.images[Image_Source + "_safe"]
    }
    
   this.Painterro =  Painterro({
       activeColor: '#254E82',
       backplateImgUrl: Image_Url,
       hiddenTools:['zoomin', 'zoomout', 'resize'],
       hideByEsc:true,
       saveByEnter:true,
       defaultTool:'brush',
       how_to_paste_actions:['paste_over'],
       saveHandler: function (image , done){
         var Base64_Data = image.asDataURL()
         if(Is_File_Attached){
          observer.Add_JSON(Image_Root,Base64_Data)
          done(true)
         }else{
          observer.Merge_Images(Image_Root,Base64_Data,Image_Url)
          done(true)
         }
       },
       onImageLoaded:function(){
         this._LoggingService?.log(false,'image is loaded')
         Is_File_Attached = true
       }
     }).show()
   }

   Merge_Images(Image_Root,data,Image_Source){
     mergeImages([Image_Source, data])
   .then((b64) => {
     this.Add_JSON(Image_Root,b64)
   });
}
  Healthcare_Nursing($department_selected_to_fiter_nurse, $root_to_save_nurse) {
    this.NixModal.openModal('Search', {status:'Nurse'},{cssClass:'CSS_Search_Modal'}).then(($$Nurse: any) => {
      if($$Nurse?.data?.user_name){
        this.Add_JSON($root_to_save_nurse, ($$Nurse.data.user_name + " , " + $$Nurse.data.department))
      }
    })
  }
  Nationality(Language, $root_to_save_nationality){
    this.NixModal.openModal('Search', {Language,status:'Nationality'}, {cssClass:'CSS_Search_Modal'}).then(($$nationality)=>{
      this.Add_JSON($root_to_save_nationality + "_nationality_arabic",  $$nationality['data']?.country_name_in_arabic)
      this.Add_JSON($root_to_save_nationality + "_nationality", $$nationality['data']?.country_name )
    })
  }

  // ---------------------------------------------------------- [ahmad athra]

  public Select_Medical_Code(reference1 , reference2){
    this.NixModal.openModal('MedicalCodePage', {}).then($$response => {
      if($$response['data']){
        this.Add_JSON(reference2, ($$response['data'].code + " , " + $$response['data'].description))
      }
      
    })
  }
}
