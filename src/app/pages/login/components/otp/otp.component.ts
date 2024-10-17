import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NIX_LOADING } from '../../../../../provider/tools/NIX_LOADING'; 
import { GeneralService } from '../../services/general.service';
import { IonApp, IonAvatar, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-login-otp',
	templateUrl: './otp.component.html',
	styleUrls: ['./otp.component.scss'],
	standalone: true,
	imports: [
		IonButton,
		IonApp,IonGrid,IonCol,IonRow, IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb,
		IonText,
		IonNote,
		CommonModule,
		ReactiveFormsModule
	]
})
export class OtpComponent implements OnInit {
resendOtpDisabled = true;
otpRemainingTime = 60; // Initial time in seconds
private countdownInterval: any;


constructor(
    private _NIX_LOADING: NIX_LOADING,
    public _GeneralService: GeneralService,
	private cdr: ChangeDetectorRef
) { }
	ngOnInit(): void {
		this.remainingTime()
	}

resend_otp(){
  	this._NIX_LOADING.present().then(()=>{
  		const  {email, password }= this._GeneralService.LoginForm.value
  		this._GeneralService.login(email, password )
  			.then(()=> {
  				this._NIX_LOADING.dismiss()
				this.remainingTime()
  			})
  			.catch(() => this._NIX_LOADING.dismiss())
  	})
}
  

checkOtp(){
	if (this._GeneralService.otpForm.valid) {
		this._NIX_LOADING.present().then(() => {
			const { otp, tmp_id} = this._GeneralService.otpForm.value

			this._GeneralService.checkOtp( otp, tmp_id).then(() => {
				this._NIX_LOADING.dismiss()
			}).catch(() =>{
				this._GeneralService.errorMsg = 'Contact Support team or retry please.'
				this._NIX_LOADING.dismiss()
			})
		})
	}
}

remainingTime(){
	this.resendOtpDisabled = true;
	this.otpRemainingTime = 60
	this.countdownInterval = setInterval(() => {		
		  this.otpRemainingTime--;		  
		  if (this.otpRemainingTime <= 0) {
			  this.resendOtpDisabled = false;
			  this.otpRemainingTime = 60
			  clearInterval(this.countdownInterval);
		  }
		  this.cdr.detectChanges();
	  }, 1000); // Update every second
}
}
