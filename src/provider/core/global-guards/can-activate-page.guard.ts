import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NP_Medical_User_Settings } from 'src/provider/interfaces';
import { NIX_STORAGE } from 'src/provider/tools/NIX_STORAGE';

export const canActivatePageBasedOnMedicalUserSetting: CanActivateFn =async (route, state) => {
  const nixStorage= inject(NIX_STORAGE)
  const nixRouter = inject(Router)

  const practitioner:NP_Medical_User_Settings =await nixStorage.get('Practitioner')
  if(!practitioner){
    return false
  }
    const allowed_permission = practitioner[route.data?.module_type]
    console.log(allowed_permission)
    if(allowed_permission){
      return true
    }else{
      await nixRouter.navigate(['forbidden'])
      return false
    }
};
