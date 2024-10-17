import { ResolveFn } from '@angular/router';
import { NIX_STORAGE } from '../../tools/NIX_STORAGE';
import { inject } from '@angular/core';
import { NixGlobal } from '../../NixGlobal';
import { ErpHttpClient } from 'src/provider/HttpServices/internal/ErpHttpClient';
import { Doctypes } from 'src/provider/tools/NIX_DOCTYPES';
import { NP_Medical_User_Settings } from 'src/provider/interfaces';

export const doctorInitiateResolver: ResolveFn<boolean> =async (route, state) => {

const erp_http_client = inject(ErpHttpClient);
const nix_storage = inject(NIX_STORAGE);
const nix_global = inject(NixGlobal);
const _Doctypes = inject(Doctypes)
try {
  const doctor = await nix_storage.get('Practitioner') as NP_Medical_User_Settings
  const updated_doctor_data = await erp_http_client.GET<{data: NP_Medical_User_Settings}>(_Doctypes.doctypes.Medical_User_Settings + '/' + doctor.name,'"*"', '', '')
 nix_global.Doctor = updated_doctor_data.data
  nix_storage.set('Practitioner',updated_doctor_data.data,'','')
   return true;
} catch (error) {
  console.log('Error while resolving Doctor data',error)
}

};
