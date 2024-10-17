import { ApplicationRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Subscription, first, tap, timer } from 'rxjs';
import { NixModal } from 'src/provider/NixModal';
import { ReleaseNotesComponent } from './release-notes.component';
import { NIX_STORAGE } from 'src/provider/tools/NIX_STORAGE';
import { mongoHttpClient } from 'src/provider/HttpServices/internal/mongoHttpClient';
import  PackageInfo  from '../../../../package.json';
import { AuthService } from 'src/app/pages/login/services/auth.service';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
	providedIn: 'root'
})
export class ReleaseNotesService {
	updateChecker$: Subscription
	versionUpdates$: Subscription
	finishUpdate = false
	constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private _NixModal: NixModal,
    private _Router: Router,
    private _NIX_STORAGE: NIX_STORAGE,
    private _mongoHttpClient: mongoHttpClient,
    private _AuthService: AuthService,
    private __AlertController: AlertController,
	

	) { }

	checkVersion(){
		if(!this.updates.isEnabled){
			console.log('service worker is not enabled!');
			return
		}

		const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));

		appIsStable$.pipe(
			tap(() => {console.log(`Application had stabled`)})
		).subscribe((isStable: boolean) => {
			const intervalDuration = 1 / 2 * 60 * 60 * 1000; // Interval duration
			const everyHalfHour$ = timer(0, intervalDuration );


			this.updateChecker$ = everyHalfHour$.subscribe( async () => {
        
        
				try {
					const updateFound = await this.updates.checkForUpdate();
					console.log('updateFound', updateFound);
					if (updateFound) {
						this.updateChecker$.unsubscribe()
					}
					console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
				} catch (err) {
					console.error('Failed to check for updates:', err);
				}
			})
		})

	}

	controlUpdateVersions(){
		if(!this.updates.isEnabled){
			return
		}
    
		this.versionUpdates$ = 
    this.updates.versionUpdates.pipe(
    	tap(d => console.log('versionUpdates--------------------', d))
    ).subscribe(evt => {
    	switch (evt.type) {
    	case 'VERSION_DETECTED':
    		console.log(`Downloading new app version: ${evt.version.hash}`);
    		this.openUpdateModal('update')
    		break;
    	case 'VERSION_READY':
    		console.log(`Current app version: ${evt.currentVersion.hash}`);
    		console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
    		this.finishUpdate = true;
    		break;
    	case 'VERSION_INSTALLATION_FAILED':
    		console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
			this.presentAlertConfirm()
    		break;
    	}
    }, (e) => {
    	console.error(e);
      
    });
	}

	async openUpdateModal(_role,notes=[]){
		const modal: HTMLIonModalElement = await this._NixModal.newOpenModal(ReleaseNotesComponent,
			{Data:{role:_role,notes:notes}},
			{
				cssClass: 'CSS_RELEASE_NOTES',
				id: 'release-note'
			});
		await modal.present();
		const { data, role } = await modal.onDidDismiss();
		if (_role == 'update') {
			const toast = this._Router.url == '/login' ? false : true
				// await this._AuthService.logOut(toast).then(()=>{
				// 	 this._NIX_STORAGE.set('release-note',{update:true},true,false).then(()=>{
				// 		 location.reload();
				// 	 }).catch((err)=>{
				// 		console.log(err);
						
				// 	 })
				//  })
			
		}else{
			this._NIX_STORAGE.remove('release-note')
		}
	}

	checkReleaseNote(){
		this._NIX_STORAGE.get('release-note').then((note)=>{
			console.log('(release-note)',note);
			if(note?.update){
				//get notes
				this._mongoHttpClient.GET_Release_Note({ "version": PackageInfo.version ,"project":"medical"}).then((data:any)=>{
					console.log('data',data.data);
					this.openUpdateModal('release-note',data.data)
				})
			}
		}).catch((err)=>{
			console.log(err);
			
		})
	}

	presentAlertConfirm() {
		return new Promise((resolve, reject) => {
		  this.__AlertController.create({
			cssClass: '',
			backdropDismiss: false,
			header: "There was a problem while updating, please clear cache.",
			mode: 'ios',
			buttons: [ {
				text: 'Ok',
				role: 'Yes',
				handler: () => {
				  location.reload()
				}
			  }
			]
		  }).then((alert) => {
			    alert.present()
		    	alert.onDidDismiss().then(onDismissData => {
			    resolve(onDismissData.role)
			})
		  })
		})
	  }
}
