import { inject, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular/standalone';
import { NixGlobal } from '../../../../../provider/NixGlobal'; 
import { NIX_STORAGE } from '../../../../../provider/tools/NIX_STORAGE'; 
import { User } from '../../../../../provider/user/user'; 
import { AuthService } from '../auth.service';
import { Currency_Precision } from '../../../../../provider/Precision/Currency_Precision';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const nixStorage = inject(NIX_STORAGE);
  const nixGlobal = inject(NixGlobal);
  const authService = inject(AuthService);
  const currencyPrecision = inject(Currency_Precision);
  const menuController = inject(MenuController);

  const practitioner = await nixStorage.get('Practitioner');
  nixGlobal.Doctor = practitioner;
  if (nixGlobal.Doctor) {
    let direction = '/';
    
    if (nixGlobal.Doctor.user_type === 'Smart Screen') {
      direction = '/patients_engagement';
    } else if (nixGlobal.Doctor.user_type === 'Practitioner' || nixGlobal.Doctor.user_type === 'Nurse') {
      direction = '/patients-list';
    }

    await router.navigate([direction]);

    try {
      const npNixpendHealthcareSettings = await authService.get_NP_Nixpend_Healthcare_Settings();
      nixGlobal.NP_Nixpend_Healthcare_Settings = npNixpendHealthcareSettings;
      const currencyPrecisionValue = await currencyPrecision.get_currency_precision();
      await nixStorage.set('Currency_Precision', currencyPrecisionValue, true, false);
      await nixStorage.set('NP_Nixpend_Healthcare_Settings', npNixpendHealthcareSettings, true, false);
    } catch (error) {
      console.log(error);
    }

    nixGlobal.Doctor = await nixStorage.get('Practitioner');

    return false;
  } else {
    return true;
  }
};
