import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular/standalone';
import PackageInfo from '../../package.json';
import { environment } from '../environments/environment';
import { NIX_SELECTED } from "./NIX_SELECTED";
import { NIX_ALERT } from "./tools/NIX_ALERT";
import { NIX_STORAGE } from "./tools/NIX_STORAGE";

import { HttpClient } from "@angular/common/http";
import { PublicHttpClient } from "./HttpServices/internal/publicHttpClient";

@Injectable({
  providedIn: 'root'
})
export class NixGlobal {

  public Modal_References = []

  package_name: any;
  Medical_Version = PackageInfo.version;

  constructor(
    public _NIX_STORAGE: NIX_STORAGE,
    public _NIX_ALERT: NIX_ALERT,
    public _AlertController: AlertController,
    public _NIX_SELECTED:NIX_SELECTED,
    public _PublicHttpClient : PublicHttpClient,
  

  ) {
    // this.Generate_Location()
  }
  public Doctor: any;
  public API = environment.API;
  public URL: any
  public Selected
  public hidden_login = 0;
  public NP_Nixpend_Healthcare_Settings:any
  //---------------------------------------------►[OK]
  Filter($input_to_search_it, $item_to_search_in, $json) {
    return $json.filter(($$json) => {
      if ($$json[$item_to_search_in] != null) {
        return $$json[$item_to_search_in].toLowerCase().includes($input_to_search_it.toLowerCase());
      }
    })
  }
}
