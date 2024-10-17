import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ErpHttpClient } from 'src/provider/HttpServices/internal/ErpHttpClient';
import { Doctypes } from 'src/provider/tools/NIX_DOCTYPES';
export const encounterResolver: ResolveFn<any> =async (route, state) => {
   
    const _ErpHttpClient =inject(ErpHttpClient);
    const doctypes = inject(Doctypes)
    const getEnounter =async ()=>{
        if(route.queryParams.encounter_id){
            const encounter :any =  await _ErpHttpClient
            .GET(
                doctypes.doctypes.NP_Patient_Encounter,
              '"*"',
              `["name","=","${route.queryParams.encounter_id}"]`,
              "encounter_date desc"
            )
            console.log(encounter?.data[0])
            return {body:encounter.data[0]}
        }else{
            return {data: undefined}
        }
    
    }
    /**
     * @TODO 
     * add encounter interface
     */
    const encounter :any = await getEnounter() 
    console.log(encounter)
    return encounter ;
};
