import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    public _GeneralService: GeneralService
  ) { }

changeFormType(formType: string): void{
  if (formType === 'login') {
    this._GeneralService.form_type = 'login'
  }
  if (formType === 'forget-password') {
    this._GeneralService.form_type = 'forget-password'
  }
}
}
