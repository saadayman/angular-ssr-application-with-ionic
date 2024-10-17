import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ErpHttpClient } from 'src/provider/HttpServices/internal/ErpHttpClient';
import { Doctypes } from 'src/provider/tools/NIX_DOCTYPES';
import { NP_Patient_Appointment } from 'src/provider/interfaces';
export const appointmentResolver: ResolveFn<NP_Patient_Appointment | boolean> =async (route, state) => {
    const _ErpHttpClient =inject(ErpHttpClient);
    const doctypes = inject(Doctypes)
    if(route.queryParams.appointment_id){
        const appointment:{data:NP_Patient_Appointment} = await _ErpHttpClient.GET(`${doctypes.doctypes.NP_Patient_Appointment}/${route.queryParams.appointment_id}`,'"*"',{},'')
        return appointment.data ;
    }
    else{
        return true
    }
    
};
