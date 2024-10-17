import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular/standalone';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment'; 
import { ErpHttpClient } from '../../../../provider/HttpServices/internal/ErpHttpClient'; 
import { NixGlobal } from '../../../../provider/NixGlobal';
import { I_PRACTITIONER } from '../../../../provider/interfaces/erp.interfaces';
import { NIX_ALERT } from '../../../../provider/tools/NIX_ALERT';
import { Doctypes } from '../../../../provider/tools/NIX_DOCTYPES';
import { NIX_LOADING } from '../../../../provider/tools/NIX_LOADING';
import { NavigationService } from '../../../../provider/tools/NIX_Navigation.service';
import { NIX_STORAGE } from '../../../../provider/tools/NIX_STORAGE';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public isLoggedIn = new BehaviorSubject<any>({when: 'init auth.ts.18', val: null})
	user =  new Subject<I_PRACTITIONER>()
	constructor(
    private _HttpClient: HttpClient,
    private _NIX_STORAGE: NIX_STORAGE,
    private _AlertController: AlertController,
	private _route: NavController,
    private _NIX_ALERT: NIX_ALERT,
    private _NIX_LOADING: NIX_LOADING,
    private _ErpHttpClient: ErpHttpClient,
    private _Doctypes: Doctypes,
    private _NixGlobal: NixGlobal,
	private _Router:Router,
	public _ToastController:ToastController,
	public navigationService:NavigationService
	) { }
    
	public Dismiss_All_Modals(){
		this._NixGlobal.Modal_References.forEach((instance:any)=>{
			instance?.dismiss('logout')
		})
	}
	// -----------------------------------------------------------------


	async logOut($toast:any) {
		await this._NIX_LOADING.present();
	
		if ($toast) {
			const url = `${environment.API}/public/logout`;
			this._HttpClient.get(url).subscribe();
		}
	
		const loggedOutUser = JSON.stringify(this._NixGlobal.Doctor?.user_name);
	
		// this.Dismiss_All_Modals();
		this.navigationService.resetNavigationService()
		const $webSite = await this._NIX_STORAGE.get('website');
		await this._NIX_STORAGE.clear();
		this._NixGlobal.Doctor = undefined;
		this.isLoggedIn.next({ when: '-- auth.ts.109', val: null });
		await this._Router.navigate(['login'], { replaceUrl: true });
		await this._NIX_STORAGE.set('website', $webSite, false, false);
		await this._NIX_LOADING.dismiss();
	
	
		const message = `Success: Goodbye ${loggedOutUser}`;
		const toast = await this._ToastController.create({
			message: message,
			duration: 3000,
			position: 'top',
			cssClass: 'xToast_Success',
		});
		await toast.present();
	}
	

	// for session expiry
	reLogin(password: string): Promise<{practitioner?:I_PRACTITIONER, otp: boolean, otp_information?: any}>{
		return new Promise((resolve, reject) => {
			this._NIX_STORAGE.get('User').then((storageData: any) => {
				if (storageData) {
					const email = (storageData.user as I_PRACTITIONER).user_id
					if (!email) {
						return reject(null)
					}
					this.login(email, password).then(({otp, practitioner, otp_information}) => {
						resolve({otp, practitioner, otp_information})
					}).catch(e => {
						console.log(e);
						reject(e)
					})
				} else {
					reject('logOut')
				}
			}).catch(e =>{
				reject(e)
			})
		})
	}
	// for session expiry
	reCheckOtp(tmp_id: string, otp: string): Promise<void>{
		return new Promise<void>((resolve, reject) => {
			this.verifyOtp(otp, tmp_id).then((user) => {
				this.isLoggedIn.next({ val: true})
				resolve()
			}).catch((e) => {
				this.logOut(null)
				reject()
			})
		})
	}

	forgot_password($email: string){
		return new Promise((resolve, reject) => {
			this._NIX_STORAGE.get('location').then((location: any) => {
				const url = `${environment.API}/public/forgot_password`
				const params = { email: $email }
				const headers = new HttpHeaders({ url: location.url })
				this._HttpClient.get(url, {params, headers}).subscribe((data: any) => {
					resolve(data.data)
				}, err => {
					console.log(err);
					reject(err)
				})
			})
		})
	}

    
	get_NP_Nixpend_Healthcare_Settings(){
		return new Promise((resolve, reject) => {
			const doctype = this._Doctypes.doctypes.NP_Nixpend_Healthcare_Settings;
			const record = this._Doctypes.doctypes.NP_Nixpend_Healthcare_Settings;
			// const fields = '"allow_multi_order_on_adhoc_package", "prevent_services_for_uncovered_packages", "enable_patient_arrival_restriction", "patient_arrival_restriction", "multi_service_unit_limit", "multi_practitioner_limit", "appointment_list_page_size"'
			const fields = '"*"'
			
			this._ErpHttpClient.GET(`${doctype}/${record}`, fields, '', '').then((data: any)=>{
				resolve(data.data)
			}).catch(e => {
				console.log('error', e);
				reject()
			})
		})
	}

	// session alert
	triesCounter = 0
	otp_information: any
	alert!: HTMLIonAlertElement
	async session_alert(){
		console.log('session_alert');
		await this.alert?.dismiss()
		const email = this._NixGlobal.Doctor.user_id
		
		this.alert = await this._AlertController.create({
			cssClass:'session-expired-alert',
			header:'Session Expired',
			message: 'Please Enter Your Password to Continue',
			keyboardClose: true,
			backdropDismiss: true,
			inputs:[
				{
					type:'email',
					label: 'email',
					name:'email',
					placeholder:'email',
					value: email, 
					attributes: {
						autocomplete: 'email',
						readOnly: true
					}
				},{
					type:'password',
					label: 'Password',
					name:'password',
					placeholder:'Password'
				}],
			buttons:[
				{
					text:'Log out',
					role:'logOut',
					cssClass:'Log-out'
				},
				{
					text:'Login',
					role:'login',
					cssClass:'Login'
				},
			]
		})
		if (this.triesCounter>0) {
			this.alert.message += `\n ${3 - this.triesCounter} tries available`
		}
		await this.alert.present()
		const {data, role} = await this.alert.onDidDismiss()
		if (role === 'backdrop' || role === 'logOut') {
			this.logOut(null)
		}
		if (role === 'login') {
			this._NIX_LOADING.present()
			const password = data.values.password
			
			this.reLogin(password).then(({otp, practitioner, otp_information}) => {
				this._NIX_LOADING.dismiss()		
				
				if (otp) {
					const tmp_id = otp_information.tmp_id
					const otp_message = otp_information.prompt
					return this.OtpALert(tmp_id, otp_message)
				} else {
					this.triesCounter = 0
					this.isLoggedIn.next({when: '-- user.ts.171', val: true})
				}
			}).catch((e) => {
				this._NIX_LOADING.dismiss()
				if (e === 'logOut') {
					return this.logOut(null)
				} else {
					if (this.triesCounter<2) {
						this.triesCounter++
						this.session_alert()
					} else {
						this.triesCounter = 0
						this.logOut(null)
					}
				}
			})
		}
	}

	otpAlert!: HTMLIonAlertElement
	async OtpALert(tmp_id: string, message: string){
		await this.otpAlert?.dismiss();

		this.otpAlert = await this._AlertController.create({
			cssClass:'session-expired-alert',
			header:'Session Expired',
			message: message,
			keyboardClose: true,
			backdropDismiss: true,
			inputs:[{
				type:'text',
				label: 'OTP',
				name:'otp',
				placeholder:'OTP'
			}],
			buttons:[
				{
					text:'Log out',
					role:'logOut',
					cssClass:'Log-out'
				},
				{
					text:'Check OTP',
					role:'check-otp',
					cssClass:'Login'
				},
			]
		})		
		await this.otpAlert.present()
		const {data, role} = await this.otpAlert.onDidDismiss()
		
		if (role === 'backdrop' || role === 'logOut') {
			this.logOut(null)
		}
		if (role === 'check-otp') { 
			this._NIX_LOADING.present().then(() => {
				const otp = data.values.otp
				this.reCheckOtp(tmp_id , otp).then(() => {
					this._NIX_LOADING.dismiss()
				}).catch(() => {
					this._NIX_LOADING.dismiss()
				})
			})
		}
	}



	// new ------------------------------------
	// -----------------------------------------------------------------

	login(email: string, password: string): Promise<{practitioner?:I_PRACTITIONER, otp: boolean, otp_information?: any}>{
		return new Promise((resolve, reject) => {
			this._NIX_STORAGE.get('location').then((location: any) => {
				if(location){
					const Request_Body = {
						usr: email,
						pwd: password,
					}
					const headers = new HttpHeaders({url: location.url, db: location.db})
					this._HttpClient.post<{practitioner?:I_PRACTITIONER, otp: boolean, otp_information?: any}>(environment.API + '/public/login', Request_Body, {
						headers,
						observe:'response'
					}).subscribe((response:any) =>{
						if (response instanceof HttpResponse) {
							resolve(response.body)
						}
					}, (error: HttpErrorResponse) => {
						reject(error)
					})
				} else {
					reject('location is empty')
				}
			})
		})
	}
	verifyOtp( otp: string, tmp_id: string): Promise<I_PRACTITIONER>{
		return new Promise((resolve, reject) => {
			this._NIX_STORAGE.get('location').then((location: any) => {
				if(location){
					const Request_Body = {
						otp: otp,
						tmp_id: tmp_id,
					}
					const headers = new HttpHeaders({url: location.url, db: location.db})
					this._HttpClient.post<{practitioner:I_PRACTITIONER}>(environment.API + '/public/otp', Request_Body, {
						headers,
						observe:'response'
					}).subscribe((response:any) =>{
						if (response instanceof HttpResponse) {
							resolve(response.body.practitioner)
						}
					}, (error: HttpErrorResponse) => {
						reject(error)
					})
				} else {
					reject('location is empty')
				}
			})
		})
	}
}
 

