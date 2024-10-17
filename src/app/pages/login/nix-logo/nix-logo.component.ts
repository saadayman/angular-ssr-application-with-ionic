import { Component, OnInit } from '@angular/core';
import { NixGlobal } from '../../../../provider/NixGlobal'; 

@Component({
  selector: 'app-nix-logo',
  templateUrl: './nix-logo.component.html',
  styleUrls: ['./nix-logo.component.scss'],
})
export class NixLogoComponent  {

  constructor(
    public _NixGlobal: NixGlobal,

  ) { }


}
