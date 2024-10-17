import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-chrome',
  templateUrl: './open-chrome.component.html',
  styleUrls: ['./open-chrome.component.scss'],
})
export class OpenChromeComponent{

  

  Open_Chrome_Link() {
    const Chrome_Download_Link = 'https://www.google.com/chrome/';
    window.open(Chrome_Download_Link, '__blank');
  }

}
