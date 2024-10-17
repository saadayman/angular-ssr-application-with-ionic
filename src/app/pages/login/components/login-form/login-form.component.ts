import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { NIX_LOADING } from '../../../../../provider/tools/NIX_LOADING'; 
import { GeneralService } from '../../services/general.service';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonButton, IonGrid,IonApp, IonAvatar, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar, LoadingController, IonNote, IonSpinner, IonText, IonInput  } from '@ionic/angular/standalone';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
	standalone: true,
	imports: [
		IonButton,IonApp,
		IonGrid,IonCol,IonRow,IonSpinner, IonNote,IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb,
		IonText,
		IonInput,
		CommonModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class LoginFormComponent implements OnInit {

	constructor(
    private _NIX_LOADING: NIX_LOADING,
    private _SiteService: SiteService,
    public _GeneralService: GeneralService,
	public activatedRoute:ActivatedRoute,
	public httpclient:HttpClient,
	public _LoadingController:LoadingController

	) { }


	public returnUrl:string;
	ngOnInit(): void {
		console.log('login form',this._GeneralService.LoginForm)
		this._GeneralService.LoginForm.valueChanges.subscribe(val=>console.log(val))
  	this.fillSiteData()
	  this.activatedRoute.queryParams.subscribe(queryParams=>{
		this.returnUrl = queryParams['returnUrl'] ?? '/'
	  })
  	this.site.setAsyncValidators(this.setSiteValidator.bind(this))
	}

	login_button(): void {
  	const { email, password } = this._GeneralService.LoginForm.value;
	

  	if (this._GeneralService.LoginForm.valid){
		// console.log(this._NIX_LOADING.dismiss())
		this._LoadingController.create({
			spinner: "lines",
			duration: 1000000,
			message: 'Please wait',
			translucent: true,
			cssClass: 'custom-class custom-loading'
		  }).then((loading$) => {
			loading$.present().then(()=>{
				this._GeneralService.login(email, password,this.returnUrl)
				.then(()=> {
					loading$.dismiss()
				})
				.catch(() => 	loading$.dismiss())
			})

			// this.ShowLoadingController = $
		  })
  	}
	}

	//   email section
	get email() : FormControl {
  	return this._GeneralService.LoginForm.get('email') as FormControl
	}

	//	password section
	viewPass = false
	controlViewPassword(): void{
		this.viewPass = !this.viewPass
	}

	get password() : FormControl {
  	return this._GeneralService.LoginForm?.get('password') as FormControl
	} 

	//   site section
	get site() : FormControl {
  	return this._GeneralService.LoginForm?.get('site') as FormControl
	}

	fillSiteData(): void{
  	// this._SiteService.getWebsiteFromStorage$().subscribe($site => {
  	// 	this.site.patchValue($site)
  	// })
	}

	setSiteValidator(control: AbstractControl):Observable<{ [key: string]: any } | null>{
  	const site = control.value
  	return of(site).pipe(
  		debounceTime(1000),
  		distinctUntilChanged(),
  		switchMap((site) => this._SiteService.setSiteData$(site).pipe(
  			map(val => val ? null : { site_not_found: true }),
  			catchError((err) => {
  				if (err?.status === 404) {
  					return of({ site_not_found: true })
  				} else {
  					return of({ unknown_error: true })
  				}
  			})
  		))
  	);
	}
}
