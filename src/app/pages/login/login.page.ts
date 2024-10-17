import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SiteService } from './services/site.service';
import { GeneralService } from './services/general.service';




@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	

})
export class LoginPage implements OnInit, OnDestroy {

	constructor(
    public _ActivatedRoute: ActivatedRoute,
    public _SiteService: SiteService,
    public _GeneralService: GeneralService,
	) { }

	Route_Subscription!: Subscription
   
	ngOnInit(): void {   
		this._GeneralService.form_type = 'login'

		this.Route_Subscription = this._ActivatedRoute.data
			.subscribe(() =>{
				this._SiteService.getSiteData$().subscribe()
			}); 

		this._GeneralService.controlLoginCardVisible()

	}

	ngOnDestroy(): void {
		console.log(11111111111);
		
		this.Route_Subscription.unsubscribe()
	}
}
