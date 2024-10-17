import { Injectable } from '@angular/core';
import { Observable, Subscription, debounceTime, distinctUntilChanged, fromEvent, interval, merge, switchMap, takeWhile, throttleTime, timer } from 'rxjs';
import { AuthService } from '../../app/pages/login/services/auth.service'; 
import { ErpHttpClient } from "../HttpServices/internal/ErpHttpClient";
import { SqlHttpClient } from '../HttpServices/internal/SqlHttpClients';
import { I_PRACTITIONER } from '../interfaces/erp.interfaces';
import { Doctypes } from "../tools/NIX_DOCTYPES";
import { NIX_STORAGE } from "../tools/NIX_STORAGE";
@Injectable({
	providedIn: 'root'
})
export class User {
	private _userData: I_PRACTITIONER
	private _expiryDate: number
	expiration_timer: any
	userActivitySubscription: Subscription
	private userActivityObs: Observable<number>
	constructor(
    private _ErpHttpClient: ErpHttpClient,
    private _Doctypes: Doctypes,
    private _NIX_STORAGE: NIX_STORAGE,
    private _AuthService: AuthService,
    private _SqlHttpClient: SqlHttpClient,

	){ }
	clear_Previous_Observables(){
		//when user redis token ends and the user is clicking on the medical which preventing the user from frontend session from being over and then the user makes a request another login attemp will run which causing the user to be navigated to the appropriate page which causes the previous observable not to stop and invoking new observable
		return new Promise<void>((resolve,reject)=>{
			
			resolve(this.userActivitySubscription?.unsubscribe())
		})
	}

	initialize_Observables(){
		this.userActivityObs = this.initUserActivityObs()
		this._AuthService.isLoggedIn.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe(ddd=> {
			if (document.URL.includes('login')) {
				return
			}
			                
			if (ddd.val === true) { // logIn
				this.clear_Previous_Observables().then(()=>{
					this.userActivitySubscription = this.userActivityObs.subscribe({
						next: (value) => {							
							// console.log('interval running', value, this._userData.session_expiry * 60);
						},
						complete: () => {
							console.log("session alert should appear [---] complete");
							this._AuthService.isLoggedIn.next({ val: false })
						},
					})
				})
             
			} else if(ddd.val === false){
				this._AuthService.session_alert()
			} else if(ddd.val === null){
				this.userActivitySubscription?.unsubscribe()
				this._AuthService.alert?.dismiss()
			}
    
		})
    
		this.getUserData().then((user) => {        
			if (user?.session_expiry) {
				this._AuthService.isLoggedIn.next({when: '-- user.ts.48', val: true})
				this.expiryDate = user.session_expiry
			}
		})
	}
    
	public set expiryDate(session_expiry : number) {
		const expiry = Date.now() + +session_expiry * 60 * 1000
		this._expiryDate = expiry;
	}

	public  getUserData(): Promise<I_PRACTITIONER | null> {
		return this._NIX_STORAGE.get('User').then((storageData: any) =>{
			if (!storageData) {
				return null
			} else {
				this._userData = storageData.user
				return storageData.user as I_PRACTITIONER
			}
		}).catch(e => {
			return e
		})
	}

	public  setUserData (user: I_PRACTITIONER) {
		return new Promise<void>((resolve, reject) => {            
			this.expiryDate = user.session_expiry     
			const userStorage = {
				expiryDate: this._expiryDate,
				user
			}
			this._NIX_STORAGE.set('User', userStorage, true, false).then(()=>{
				this._userData = user;
				// this.timer111(this._userData.session_expiry)
				resolve()
			}).catch(e => {
				console.log(e);
				return e
			})
		})
	}

	updatedUserData(userID){
		return new Promise((resolve, reject) => {
			this._ErpHttpClient.GET(`${this._Doctypes.doctypes.Medical_User_Settings}/${userID}`, '"*"', '', '').then((userData: I_PRACTITIONER) => {
				this.setUserData(userData)
				resolve(this._userData)
			})
		})
	}

	updateExpiryDate(){
		return new Promise<void>((resolve, reject) => {
			this._NIX_STORAGE.get('User').then((userStorage: any) => {
				this.setUserData(userStorage.user).then(() => {
					resolve()
				})
			})
		})
	}

	get_full_name_user(Array,filed_1="modified_by",filed_2="last_updated_by"){
		return new Promise<void>((resolve, reject) => {
			const users=[]
			Array.forEach((element)=>{
				if(element[filed_1]){
					users.push(element[filed_1])
				}
			})
			this._SqlHttpClient.get_users('User',{emails:users},'').then((users: any) => {
				Array.map((element)=>{
					users.users.map((user)=>{
						if(element[filed_1] == user.email){
							element[filed_2] = user.full_name
						}
					})
				})
			})
			resolve(Array)
		})
	}


	initUserActivityObs(){
		/**This code  defines a function called initUserActivityObs that tracks user activity by creating observables for various user events such as clicks, touches, scrolls, and keypresses. It merges these observables into a single observable called userActivity$.

The interval$ observable emits a value every 1000 milliseconds (1 second). The timer$ observable emits a single value after a delay of 1000 milliseconds. The click$, touch$, scroll$, and keypress$ observables are created using the fromEvent function, which listens for the corresponding events on the document object.

The userActivity$ observable is created by merging the click$, touch$, scroll$, keypress$, and timer$ observables together.

The userActivity$ observable is then piped into a series of operators. The switchMap operator switches to a new interval observable (interval$) whenever a user activity event is detected. This means that the interval will reset every time a user activity occurs.

The takeWhile operator is used to determine when to stop emitting values from the interval$ observable. It takes a condition that checks if the elapsed time (time) is less than the session expiry time (this._userData.session_expiry * 60). The session expiry time is specified in minutes and is multiplied by 60 to convert it to seconds.

In summary, the initUserActivityObs function returns an observable (userActivity$) that emits values every second as long as user activity events keep occurring, and the elapsed time is less than the specified session expiry time. 
*****************************
The purpose of including the timer$ observable in this case is to ensure that the userActivity$ observable starts emitting values even if no user activity events have occurred yet. It introduces an initial delay before the first emission from the interval$ observable (created by interval(1000)), allowing the tracking of user activity to begin after the specified delay.
*****************************
*/
		const interval$ = interval(1000)
		const timer$ = timer(1000);
		const click$ = fromEvent(document, 'click');
		const touch$ = fromEvent(document, 'touchstart');
		const scroll$ = fromEvent(document, 'scroll');
		const keypress$ = fromEvent(document, 'keypress');

		const userActivity$ = merge(click$, touch$, scroll$, keypress$, timer$);

		return userActivity$.pipe(
			switchMap(()=> interval$),
			takeWhile((time)=> time < this._userData.session_expiry * 60)
		)
	}
}
