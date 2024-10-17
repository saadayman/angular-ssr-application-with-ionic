import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NixGlobal } from '../../NixGlobal';
import { NIX_STORAGE } from '../../tools/NIX_STORAGE';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

 export async function  authLoginGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
  const _NixStorage = inject(NIX_STORAGE);
  const _NixGlobal = inject(NixGlobal);
  const router = inject(Router);
  try {
	const $Practitioner = await _NixStorage.get('Practitioner') 
	const $location = await  _NixStorage.get('location') 
	
		  if ($Practitioner && $location) {
			_NixGlobal.URL = $location.url;
			_NixGlobal.Doctor = $Practitioner;
			return true;
		  } else {
			navigate(['login'],state.url,router)
			return false;
		  }
	
  } catch (error) {
	console.log(error)
	navigate(['login'],state.url,router)
    return false;
  }

}

function navigate(path,return_url,router:Router){
	router.navigate([...path], {

		queryParams: {
		  returnUrl: return_url
		}
	  });
}