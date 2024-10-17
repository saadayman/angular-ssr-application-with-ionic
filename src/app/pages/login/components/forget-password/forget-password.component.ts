import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController,  } from '@ionic/angular/standalone';
import { NixGlobal } from '../../../../../provider/NixGlobal'; 
import { NIX_ALERT } from '../../../../../provider/tools/NIX_ALERT'; 
import { AuthService } from '../../services/auth.service';
import { NIX_LOADING } from '../../../../../provider/tools/NIX_LOADING'; 
import { GeneralService } from '../../services/general.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonAvatar, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';

@Component({
	selector: 'app-login-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
	standalone: true,
	imports: [
		IonApp, IonAvatar, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToast, IonToolbar ,
		CommonModule,
		IonSpinner,
		ReactiveFormsModule
	]
})
export class ForgetPasswordComponent implements OnInit {

	constructor(
		private _HttpClient: HttpClient,
		public _NixGlobal: NixGlobal,
		private _NIX_ALERT: NIX_ALERT,
		public alertController: AlertController,
		public _AuthService: AuthService,
		public _NIX_LOADING: NIX_LOADING,
		public _GeneralService: GeneralService,


	) { }
	ngOnInit() {
		const site = this._GeneralService.LoginForm.controls?.site?.value
		this._GeneralService.forgetPasswordForm.controls.site.patchValue(site);
	}

	forgetPassword() {
		if (this._GeneralService.forgetPasswordForm.valid) {
			const { email, site } = this._GeneralService.forgetPasswordForm.value
			console.log('email', email);

			this._AuthService.forgot_password(email).then((data: any) => {
				const { message, title } = JSON.parse(JSON.parse(data._server_messages))
				this.alertController.create({
					cssClass: 'my-custom-class',
					header: 'Done',
					message: 'An Email was sent to you to complete the process of resetting your password',
					buttons: ['OK']
				}).then((alert: HTMLIonAlertElement) => {
					alert.present()
				})
			}).catch(err => {
				let errMessage = 'Contact Support team and retry please.'
				if (err?.error?._server_messages) {
					errMessage = JSON.parse(JSON.parse(err?.error?._server_messages))?.message
				}
				this._NIX_LOADING.dismiss()
				this._NIX_ALERT.Error(errMessage, err, 1, 1)
			})
		}

	}


	POST(Email) {
		return new Promise((resolve, reject) => {
			this._HttpClient.post(`${this._NixGlobal.API}/public/forgot_password?url=${this._NixGlobal.URL}&email=${Email}`, null)
				.subscribe($$Forgot_response => {
					this._NIX_ALERT.Success('HTTP_FORGOT_PASSWORD', $$Forgot_response, 1, 0);
					resolve($$Forgot_response)
				}, $Error => {
					this._NIX_ALERT.Error('HTTP_FORGOT_PASSWORD', $Error, 1, 0);
					reject($Error);
				})
		})
	}
	async Prompt() {
		(await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Forgot your password?',
			subHeader: 'Please enter the associated email with the system',
			inputs: [{
				name: 'email',
				type: 'text',
				placeholder: 'Enter email here',
			}],
			buttons: [{
				text: 'OK',
				handler: async (data) => {
					const await_loading = await this.Wait()
					await_loading.present().then(() => {
						this.POST(data.email)
							.then(async () => {
								await_loading.dismiss();
								const doneAlert = await this.Alert()
								doneAlert.present()
							}).catch(($Error_Forgot_Password) => {
								await_loading.dismiss()
								this._NIX_ALERT.Error('An error occurred, please check your internet connection', $Error_Forgot_Password, 1, 1);
							})

					})
				}
			}, {
				text: 'Cancel',
				role: 'cancel'
			}]
		})).present()
	}
	Wait(): Promise<HTMLIonAlertElement> {
		return this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait until the process is done',
		})
	}

	Alert(): Promise<HTMLIonAlertElement> {
		return this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Done',
			message: 'An Email was sent to you to complete the process of resetting your password',
			buttons: ['OK']
		})
	}

	//   email section
	get email(): FormControl {
		return this._GeneralService.forgetPasswordForm.get('email') as FormControl
	}

	//   site section
	get site(): FormControl {
		return this._GeneralService.forgetPasswordForm.get('site') as FormControl
	}


}
