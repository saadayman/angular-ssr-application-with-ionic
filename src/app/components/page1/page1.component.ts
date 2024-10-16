import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent ,IonBreadcrumbs,IonButtons, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonTitle, IonToast, IonList, IonLabel, IonSegment, IonSegmentButton, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonDatetime, IonAvatar, IonIcon, IonBreadcrumb} from '@ionic/angular/standalone';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  standalone:true,
  imports:[CommonModule,IonCard,IonCardHeader,IonIcon,IonBreadcrumb,IonCardSubtitle,IonDatetime,IonAvatar,IonCardTitle,IonCardContent,IonContent,IonButton,IonButtons,IonHeader,IonToolbar,IonMenu,IonMenuButton,IonTitle,IonToast,IonList,IonLabel,IonSegment,IonSegmentButton,IonItem,IonBadge,IonBreadcrumbs],
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component  implements OnInit {
  data: any = null;

  constructor() { }

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      console.log('fetching data ')
      this.data = data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

}
