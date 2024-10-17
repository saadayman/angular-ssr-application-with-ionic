import { AlertController } from "@ionic/angular";
import { NixDoctypeJSON } from "../NixDoctypeJSON";
import { NIX_ACTIVE_DOCTYPE } from "../NIX_SELECTED";
import { NIX_ALERT } from "./NIX_ALERT";

export class mandatory_form {
    constructor(
        public _NixDoctypeJSON: NixDoctypeJSON,
        public _NIX_ACTIVE_DOCTYPE: NIX_ACTIVE_DOCTYPE,
        public _AlertController: AlertController,
        public _NIX_ALERT: NIX_ALERT
    ){ }
      private all_required : Array<any> = []
      private single_required : Array<any> = []
      private multi_required : Array<any> = []

FunAll(){
return new Promise((resolve, reject)=>{
  let red_all : Array<any> = []
  if (!this.all_required.length) {
    resolve({data: 0})
    }

if (this.all_required.length) {
  for (const group of this.all_required) { //main
    let pass = group.all
    for (const record of group.fields) {   //sup
      var mandatoryField = this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data[record.field.split(".")[0]][record.field.split(".")[1]];
      if (
        mandatoryField == undefined ||
        mandatoryField == null ||
        mandatoryField == ""
      ){
        red_all.push({
          tab: group.tab,
          card: record.field.split(".")[1].split("_")[1],
          choice: ['all'],
          msg: record.msg,
          tab_name: group.fields[0].field.split(".")[0]
        })
        pass--
      }
    }
    if( pass >= group.choices){
      red_all.forEach((element, index)=>{        
        if(element.card == group.fields[0].field.split(".")[1].split("_")[1]){                            
        red_all.splice(index, (pass)+1)
      }
      })
    }

  }
  resolve(red_all)
}
})
}
FunSingle(){
return new Promise((resolve, reject)=>{
  let red_single : Array<any> = []
  if (!this.single_required.length) {
    resolve({data: 0})
    }

  if (this.single_required.length) {
    for (const group of this.single_required) { //main
      let pass = group.all
      for (const record of group.fields) {   //sup
        
        var mandatoryField = this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data[record.field.split(".")[0]][record.field.split(".")[1]];
        if (
          mandatoryField == undefined ||
          mandatoryField == null ||
          mandatoryField == ""
        ){
          red_single.push({
            tab: group.tab,
            card: record.field.split(".")[1].split("_")[1],
            choice: ['single'],
            msg: record.msg,
            tab_name: group.fields[0].field.split(".")[0]
          })
          pass--
        }
      }
      if( pass >= group.choices){
        red_single.forEach((element, index)=>{
          if(element.card == group.fields[0].field.split(".")[1].split("_")[1]){                            
          red_single.splice(index, (pass)+1)
        }
        })
      }
    }
    resolve(red_single)
  }
})
}
FunMulti(){
return new Promise((resolve, reject)=>{
  let red_multi : Array<any> = []
  if (!this.multi_required.length) {
    resolve({data: 0})
    }

  if (this.multi_required.length) {
    for (const group of this.multi_required) { //main
      let pass = group.all
      for (const record of group.fields) {   //sup
        
        var mandatoryField = this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data[record.field.split(".")[0]][record.field.split(".")[1]];
        if (
          mandatoryField == undefined ||
          mandatoryField == null ||
          mandatoryField == ""
        ){
          red_multi.push({
            tab: group.tab,
            card: record.field.split(".")[1].split("_")[1],
            choice: ['multi' ],
            msg: record.msg,
            tab_name: group.fields[0].field.split(".")[0]
          })
          pass--
        }
      }
        if( pass >= group.choices){
          red_multi.forEach((element, index)=>{
            if(element.card == group.fields[0].field.split(".")[1].split("_")[1]){                            
            red_multi.splice(index, (pass)+1)
          }
          })
        }
        if( pass < group.choices){
          red_multi.forEach((element, index)=>{
            if(element.card == group.fields[0].field.split(".")[1].split("_")[1]){                            
            red_multi[index].choice[1] = group.choices - pass
          }
          })
        }
    }
    resolve(red_multi)
  }
})
}
isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if ( value === undefined || value === null ) {
    return true
  }
  if ( value === 0 ) {
    return true
  }
  return false;
}
checValidety(){
  return new Promise((resolve, reject) => {  
    this.all_required = []
    this.single_required = []
    this.multi_required = [] 
    let success = [] 
    if (this.isEmpty(this._NIX_ACTIVE_DOCTYPE.DocType_JSON()?.Mandatory)) {
      success.push(1)      
    }
    
    if (!this.isEmpty(this._NIX_ACTIVE_DOCTYPE.DocType_JSON()?.Mandatory)) {
      var $filter;
      for ($filter of Object.entries(this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Data.mandatory)) { 
          if ($filter[1] == false) {
            //value reference to toggle in tab
            success.push(1)
            continue;
          }
          if ($filter[1] == true) {
            for(var $Group of this._NIX_ACTIVE_DOCTYPE.DocType_JSON().Mandatory){              
              if ($Group.tab != $filter[0]) {
                continue;
              }
              if ($Group.tab == $filter[0]) {
                success.push(0)
                switch ($Group.choices[0]) {
                  case 1: //all
                  this.all_required.push(
                    {
                      tab: $Group.tab,
                      checked : "all",
                      choices :  $Group.fields.length,
                       all : $Group.fields.length,
                       fields: $Group.fields,
                      }
                  )
                  break;
                  case 2: //single
                  this.single_required.push(
                    {
                      tab: $Group.tab,
                      checked : "single",
                      choices :  1,
                      all : $Group.fields.length,
                      fields: $Group.fields
                    }
                  )
                  break;    
                  case 3: //multi
                  this.multi_required.push(
                    {
                      tab: $Group.tab,
                      checked : "multi",
                      choices :  $Group.choices[1],
                      all : $Group.fields.length,
                      fields: $Group.fields
                    }
                    )
                    break;
                  }                     
                }
            }
          }
        }
      }
      if (success.includes(0)) {
          resolve({data: 1})
      }else{
        resolve({data: 0})
      }
  })
}
    Mandatory() {
        return new Promise<void>((resolve, reject) => {            
          this.checValidety().then(($check: any)=>{    
            if($check.data == 0){              
              resolve()
            }else{
              this.removeClasses(this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id]?.Mandatory).then(()=>{
                return  Promise.all([this.FunAll(), this.FunSingle(), this.FunMulti()]).then(([x, y, z])=>{  
                  let emptyArr = 0;                  
                  [x, y, z].forEach(($card: any)=>{
                    if ($card.length == 0 || $card.data == 0) {
                      emptyArr++
                    }
                    if (emptyArr == [x, y, z].length) {
                       resolve()
                      }
                    })
                    if (emptyArr != [x, y, z].length) {
                      this.mandatoryClasses([].concat(x, y, z)).then(()=>{
                        this.Mandatory_alert([].concat(x, y, z))
                       reject()
                      })
                     }
                  })
              })
            }
          })
        })
      }
      Clear_Mandatory($mandatory, $image = []) {
        this.removeClasses(this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id]?.Mandatory).then(()=>{
          let $DocType = this._NIX_ACTIVE_DOCTYPE.DocType_JSON();
          if (
            $DocType.Data.mandatory[$mandatory.split(".")[1].toLowerCase()] == false
          ) {
            for (let $Fields of Object.entries(
              $DocType.Data[$mandatory.split(".")[0]]
            )) {
              if (
                $mandatory.split(".")[1].split("_")[0] == $Fields[0].split("_")[0]
              ) {
                delete $DocType.Data[$mandatory.split(".")[0]][$Fields[0]];
                // $DocType.Data[$mandatory.split(".")[0]][$Fields[0]]='';
                console.log("%cDelete " + "%c" + this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Doctype + "." + $mandatory.split(".")[0] + "." + [$Fields[0]],
                 "color:#FF0F00 ; font-style: bold;",
                  "color:#FFC300 ; font-style: bold;",
                   $DocType.Data[$mandatory.split(".")[0]][$Fields[0]]);
              }
            }
            if ($image.length) {
              $image.forEach((element) => {
                delete $DocType.Data[element.split(".")[0]][element.split(".")[1]]  ;
              });
            }
          }
        })
      }
      async clear_mandatory_alert($mandatory, $image = []) {
        let $DocType = this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id];
        if (
          $DocType.Data.mandatory[$mandatory.split(".")[1].toLowerCase()] == true
        ) {
          const alert = await this._AlertController.create({
            header: "Are you sure, You want to stop documentation",
            message: "You will lose all data in this tab",
            backdropDismiss: false,
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
                handler: () => {
                  $DocType.Data.mandatory[$mandatory.split(".")[1].toLowerCase()] =
                    true;
                },
              },
              {
                text: "Ok",
                handler: () => {
                  this.Clear_Mandatory($mandatory, $image);
                },
              },
            ],
          });
          await alert.present();
        }
      }

      mandatoryClasses = ($mandatory_fields) => {   
        return new Promise<void>((resolve, reject)=>{
          try {
            let json = {};
            $mandatory_fields.forEach((mandatory_record) => {
              if(mandatory_record.data != 0){
              if (this.isEmpty(json[mandatory_record.card])) {
                json[mandatory_record.card] = {type: mandatory_record.choice, msgs: [mandatory_record.msg] };
              } else {
                json[mandatory_record.card].msgs.push(mandatory_record.msg);
                json[mandatory_record.card].type = mandatory_record.choice
        
              }
            }
            });    
            let card_messages;          
            for (card_messages of Object.entries(json)) {
              
              const card = document.getElementById(card_messages[0]);
              const First = card.firstElementChild;
        
              var div_classs = document.createAttribute("style"); // Create a "style" attribute
              div_classs.value = `color: #721c24;
              background-color: #f8d7da;
              border-color: #f5c6cb;
              margin: 10px;
              border: 1px solid transparent;
              border-radius: 0.25rem;`;
              const newDiv = document.createElement("DIV"); //<div>
              newDiv.setAttribute("ID", card_messages[0] + "_div");
              newDiv.setAttributeNode(div_classs);
        
              const newpara = document.createElement("P"); // <p>
              let x = card_messages[1].type[0] == 'all'? 'Please fill all of these fields:': 
              card_messages[1].type[0] == 'single'? 'Please fill one of these fields:':
              card_messages[1].type[0] == 'multi'? `Please fill ${card_messages[1].type[1]} of these fields:`: ''
              const para_style =  document.createAttribute("style"); // Create a "style" attribute
              para_style.value = `    padding: 0px 15px;
              font-size: 15px;`
              newpara.innerHTML = x
              newDiv.appendChild(newpara);
        
              const newList = document.createElement("UL"); // <ul>
              newList.setAttribute("ID", card_messages[0] + "_list");
              card_messages[1].msgs.forEach((element) => {
                var listItem = document.createElement("LI"); // Create a <li> element
                listItem.innerHTML = element;
                newList.appendChild(listItem);
              });
              newDiv.appendChild(newList);
              First.parentNode.insertBefore(newDiv, First);
            }
            resolve()
          } catch (error) {
            resolve()
          }

        })     
      };
      removeClasses(json) {
        return new Promise<void>((resolve) => {
          try {
            let card_messages;
            for (card_messages of Object.entries(json)) {
              const card = document.getElementById(card_messages[1].fields[0].field.split(".")[1].split("_")[1] );
              var classs = document.createAttribute("style");
              classs.value = "box-shadow: 3px 6px 10px #004e82 !important;";
              card.setAttributeNode(classs);
      
              const div = document.getElementById(
                card_messages[1].fields[0].field.split(".")[1].split("_")[1] + "_div"
              );
              try {
                div.remove();
              } catch (error) {
                continue;
              }
            }
            resolve();
          } catch (error) {
            resolve()
          }
        });
      }

      Mandatory_alert(msgs){       
          var tab : Array<string> = []
          var msg: string = 'There are some fields are required, please check them, in tabs: \n'
          for (const element of msgs) {              
              if(!tab.includes(element.tab_name) && element?.tab_name ) {
                tab.push(element.tab_name)
                msg = msg + `${element.tab_name}.\n`
                } else{
                  continue
                }
            }
            let buttons = [
              {
                text: "OK",
                role: "cancle",
                handler: () => {
                },
              },
            ];
            this._NIX_ALERT._Alert.generate('Mandatory', 'Missing Fields', msg, buttons, false)
      }
}