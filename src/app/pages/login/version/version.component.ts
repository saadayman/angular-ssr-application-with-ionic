import { Component, OnInit } from '@angular/core';
import  PackageInfo from '../../../../../package.json'
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
})
export class VersionComponent  {


  public Medical_Version = PackageInfo.version;



}
