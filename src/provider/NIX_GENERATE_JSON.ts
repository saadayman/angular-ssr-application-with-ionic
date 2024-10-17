import { Injectable } from '@angular/core';
import { NIX_ACTIVE_DOCTYPE } from './NIX_SELECTED';
import { NixDoctypeJSON } from './NixDoctypeJSON';

@Injectable({
  providedIn: 'root'
})
export class NIX_GENERATE_JSON {
  constructor(
    private _NixDoctypeJSON: NixDoctypeJSON,
    public _NIX_ACTIVE_DOCTYPE:NIX_ACTIVE_DOCTYPE,
  ) { }
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
      console.log(this._NIX_ACTIVE_DOCTYPE.id);

      this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]] = value
      this.CONSOLE.add(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
    if (!value) {
      delete this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]]
      this.CONSOLE.delete(this._NIX_ACTIVE_DOCTYPE.id + "." + $root.split(".")[0] + "." + $root.split(".")[1], this._NixDoctypeJSON[this._NIX_ACTIVE_DOCTYPE.id].Data[$root.split(".")[0]][$root.split(".")[1]])
    }
  }
  CONSOLE = {
    "add": function ($root_text, $data) {
      console.log("%cAdd " + "%c" + $root_text, "color:#00CC00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
    },
    "delete": function ($root_text, $data) {
      console.log("%cDelete " + "%c" + $root_text, "color:#FF0F00 ; font-style: bold;", "color:#FFC300 ; font-style: bold;", $data)
    }
  }
}
