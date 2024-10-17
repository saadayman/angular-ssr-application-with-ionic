import { ResolveFn } from '@angular/router';
import { ErpHttpClient } from '../../HttpServices/internal/ErpHttpClient';
import { inject } from '@angular/core';
import { Doctypes } from '../../tools/NIX_DOCTYPES';
import { NP_Patient } from 'src/provider/interfaces';

export const patientInitiateResolver: ResolveFn<NP_Patient> =async (route, state) => {
  const erp_clinet = inject(ErpHttpClient);
  const _Nix_Doctypes   = inject(Doctypes);
  const Filter = `["name", "=", "${route.queryParams.patient_id}"]`
  const patient:NP_Patient = await erp_clinet.GET(_Nix_Doctypes.doctypes.Patient, '"*"', Filter, '').then(($response: any) => {
    return   $response.data[0]
  })
  return patient;
};
