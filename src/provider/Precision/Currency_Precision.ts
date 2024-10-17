import { Injectable } from '@angular/core';
import { ErpHttpClient } from '../HttpServices/internal/ErpHttpClient'; 
import { Doctypes } from '../tools/NIX_DOCTYPES';
import { NIX_STORAGE } from '../tools/NIX_STORAGE';
import { System_Settings } from '../interfaces';
@Injectable({
	providedIn: 'root'
})
export class Currency_Precision {

	constructor(
    public _Doctypes: Doctypes,
    public _ErpHttpClient: ErpHttpClient,
    public _NIX_STORAGE: NIX_STORAGE,
	) { }
    public System_Settings: System_Settings
    get_currency_precision(){
		return new Promise((resolve, reject)=>{
			this._ErpHttpClient.GET<{data: System_Settings}>(`${this._Doctypes.doctypes.System_Settings}/${this._Doctypes.doctypes.System_Settings}`,'"*"',"",'').then(($roundation)=>{
				this.System_Settings = $roundation.data
				resolve($roundation.data)
			})
		})
	}

    set_system_settings(){
        return new Promise<void>((resolve, reject)=>{
        this._NIX_STORAGE.get('Currency_Precision').then((data)=>{
            this.System_Settings = data
            resolve()
        })
    })
    }
 
    public get currency_precision(): number {
		return this.System_Settings.currency_precision ?? 2
	}

      get_roundation(number) {
        const factor = Math.pow(10, this.currency_precision);
        const roundedValue = Math.round(number * factor) / factor;
        return  roundedValue
    }
}