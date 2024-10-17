import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonApp, IonAvatar, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonText, IonTitle, IonToast, IonToolbar, ModalController, NavParams } from '@ionic/angular/standalone';
import { ReleaseNotesService } from './release-notes.service';

@Component({
	selector: 'app-release-notes',
	templateUrl: './release-notes.component.html',
	styleUrls: ['./release-notes.component.scss'],
	standalone: true,
	imports: [CommonModule,      IonButton,IonApp,
		IonGrid,IonCol,IonRow,IonSpinner, IonNote,IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb,
		IonText,
		IonInput, ]
})
export class ReleaseNotesComponent implements OnInit {

	constructor(
    private modalCtrl: ModalController,
    public _ReleaseNotesService: ReleaseNotesService,
	) { }
	@Input() Data:any;
	title: 'Available Update'| 'Release Notes';
	button: 'Update'| 'Ok';
	msg: string
	release_notes: any[] = []

	ngOnInit(): void {    
		console.log(this.Data);
		
		const currentUrl = this.Data.role
		if (currentUrl === 'update') {
			this.msg = 'An update is available. Click here to update.'
			this.title = 'Available Update'
			this.button = 'Update'
		} else {
			this.title = 'Release Notes'
			this.button = 'Ok'
			this.release_notes = this.Data.notes[0].notes
		}
	}

	dismiss() {
		this.modalCtrl.dismiss({}, 'update');
	}

}
