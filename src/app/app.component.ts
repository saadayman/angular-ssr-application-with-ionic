import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollCustomEvent, ItemReorderEventDetail } from '@ionic/core';
import { Storage } from '@ionic/storage-angular';

// InfiniteScrollCustomEvent 
// import { IonAccordionGroup } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, film, flash, home } from 'ionicons/icons';
import { STORAGE } from './storage';
import { MenuController } from '@ionic/angular/standalone';
// import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
    templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(STORAGE) private storage: Storage,
  private menuCtrl: MenuController
    ) {
      addIcons({ camera, film, flash, home });
      // this.storage.s
      this.storage.set('test','man')
    }
    handleRefresh(event:any) {
      setTimeout(() => {
        // Any calls to load data go here
        event.target.complete();
      }, 2000);
    }
  items:any = [];

  ngOnInit() {
    this.generateItems();
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev:any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  title = 'angular-ssr-env-with-adding-ionic-to-it';
  private values: string[] = ['first', 'second', 'third'];
  alertButtons = ['Action'];

  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };
  openFirstMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.open('first-menu');
  }

  openSecondMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.open('second-menu');
  }

  openEndMenu() {
    /**
     * Open the menu by side
     * We can refer to the menu by side
     * here because only one "end" menu exists
     */
    this.menuCtrl.open('end');
  }
}
