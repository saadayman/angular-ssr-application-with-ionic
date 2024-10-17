import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { interval, map, scan, takeWhile } from 'rxjs';
import { NixGlobal } from '../../../../provider/NixGlobal'; 
import { Currency_Precision } from '../../../../provider/Precision/Currency_Precision'; 
import { I_PRACTITIONER } from '../../../../provider/interfaces'; 
import { NIX_STORAGE } from '../../../../provider/tools/NIX_STORAGE'; 
import { User } from '../../../../provider/user/user'; 
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	form_type: 'forget-password' | 'login' | 'otp' = 'login'
	show_login_card = true

	// otp
	otp_information

	errorMsg: string
	timer: number //countdown timer in HTML

	LoginForm = this.fb.group({
  	email: [null, [Validators.required, Validators.email]],
  	password: [null, Validators.required],
  	site: [null, Validators.required]
	});

	forgetPasswordForm = this.fb.group({
  	email: [null, [Validators.required, Validators.email]],
  	site: [null, Validators.required]
	});

	otpForm = this.fb.group({
		otp:[null, Validators.required],
		tmp_id:[null, Validators.required]
	});

	isLogin = false
	constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _NixGlobal: NixGlobal, // move it 
    private _NIX_STORAGE: NIX_STORAGE, // move it 
    private _User: User,
    private _Router: Router,
    private _Currency_Precision: Currency_Precision,

	) { }


	controlLoginCardVisible(): void{
		this._AuthService.isLoggedIn.subscribe(ddd => {
			if (ddd.val) {
				this.show_login_card = false
			} else {
				this.show_login_card = true
			}
		})
	}
	//   email section
	get email() : FormControl {
  	return this.LoginForm.get('email') as FormControl
	}

	//	password section
	viewPass = false

	get password() : FormControl {
  	return this.LoginForm?.get('password') as FormControl
	} 

	//   site section
	get site() : FormControl {
  	return this.LoginForm?.get('site') as FormControl
	}


	checkOtp( otp: string, tmp_id: string){
		return new Promise<void>((resolve, reject) => {
			this.errorMsg = null
			this._AuthService.verifyOtp( otp, tmp_id).then((practitioner) => {
				this.successLogin(practitioner, this.password.value).then(() => {
					resolve()
				}).catch(() => {
					reject()
				})
			}).catch(() => {
				reject()
			})
		})
	}


	login(email, password,returnUrl?){
  	return new Promise<void>((resolve, reject) => {
  		this.errorMsg = null
  		this._AuthService.login(email, password).then(({otp, practitioner, otp_information})=>{
			console.log(otp, practitioner, otp_information);
			
				if (otp) {
					this.otp_information = otp_information;
					this.form_type = 'otp';
					this.otpForm.controls.tmp_id.setValue(otp_information.tmp_id)
					// return
					return resolve()
				}
  			if (practitioner?.active_medical === 0) {
  				throw new Error('permission-error')
  			}  else {
					this.successLogin(practitioner, password,returnUrl).then(() => {
						resolve()
					}).catch(() => {
						reject()
					})
  			}

  		}).catch((err => {
  			console.log(err);
        
  			if (err.message === 'permission-error') {
  				this.errorMsg = 'This account has no permission to access the medical system.\nContact Support team please.'
  			} else if (err.status === 429) {
  				let RateLimit_Reset = 0
  				RateLimit_Reset = (err.headers.get('RateLimit-Reset') as number) // time to enable login button
  				this.LoginForm.setErrors({'blocking': true})

  				const numbers$ = interval(1000);
  				const counter$ = numbers$.pipe(
  					map(() => -1),
  					scan((accumulator: number, currentValue: number) => {
  						return accumulator + currentValue
  					}, Number(RateLimit_Reset)),
  					takeWhile(num => num > 0),
  				)

  				counter$?.subscribe({
  					next: value => this.timer = value,
  					complete: () => {
  						if (Object.keys(this.LoginForm?.errors)?.length === 1) {
  							this.LoginForm.setErrors(null)
  						}
  					},
  				})
  			} else if(err.status === 417) {
				
  				this.errorMsg = err.error.msg
  			} else if (err.status === 401 || err.status === 404) {
				if (err.error && err.error.message === 'Wrong email or password. Try again.') {
  					this.errorMsg = 'You have been entering wrong email or password'
  				}else{
					this.errorMsg = 'Contact Support team please.'
				}
  			} else {
  				this.errorMsg = 'Contact Support team please.'
  			}
  			reject()
  		}))
  	})
	}

	async successLogin(user: any, password: string,returnUrl?:string){
		this.LoginForm.reset()
		this.otpForm.reset()
		this.forgetPasswordForm.reset()
		this.show_login_card = false
		this.form_type = 'login'
		this._AuthService.isLoggedIn.next({when: '-- login-form.ts.89', val: true})
		this._NixGlobal.Doctor = user;
		try {
			const np_nixpend_healthcare_settings = await this._AuthService.get_NP_Nixpend_Healthcare_Settings();
			const currency_precision = await this._Currency_Precision.get_currency_precision();
			this._NixGlobal.NP_Nixpend_Healthcare_Settings = np_nixpend_healthcare_settings;
			await this._NIX_STORAGE.set('Currency_Precision',currency_precision, true, false);
			await this._NIX_STORAGE.set('NP_Nixpend_Healthcare_Settings',np_nixpend_healthcare_settings, true, false);
		} catch (error) {
			console.log(error);
			
		}
		await this._NIX_STORAGE.set('Practitioner', user, true, false);
		await this._NIX_STORAGE.set('isLogin', true, true, false);
		this._NIX_STORAGE.set('Password', CryptoJS.SHA256(password).toString(), false, false);
		await this._User.setUserData(user);
		let route: any = '/';
	
		
		if(user.user_type === 'Smart Screen') {
			route = ['/patients_engagement'];
		} else if (user.user_type === 'Practitioner' || user.user_type === 'Nurse') {
			route = ['/patients-list'];
		} 
			if(returnUrl !== '/'){
				const urlTree: UrlTree = this._Router.parseUrl(returnUrl);
				const url = returnUrl.split('?')[0]
				this._Router.navigate([url],{
					queryParams:{
						...urlTree.queryParams
					}
				})
				return
			}
			await this._Router.navigate(route);
			return
		
	}
}
