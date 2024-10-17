import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonButton, IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb, IonApp, IonGrid, IonCol, IonRow} from '@ionic/angular/standalone';


import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { VersionComponent } from './version/version.component';
import { OpenChromeComponent } from './open-chrome/open-chrome.component';
import { NixLogoComponent } from './nix-logo/nix-logo.component';
import { FooterComponent } from './footer/footer.component';
import { OtpComponent } from './components/otp/otp.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		// IonButton,IonApp,IonGrid,IonCol,IonRow, IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb,
		LoginPageRoutingModule,
		ReactiveFormsModule,
    	OtpComponent,
    	LoginFormComponent,
		ForgetPasswordComponent,
		IonicModule,
	],
	declarations: [LoginPage, 
		VersionComponent,
		OpenChromeComponent,
		NixLogoComponent,
		FooterComponent,
	],
	exports: [
		VersionComponent,
		OpenChromeComponent,
		NixLogoComponent,
		FooterComponent,
		ReactiveFormsModule,
	]
})
export class LoginPageModule {}
