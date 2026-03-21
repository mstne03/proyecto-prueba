import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { storefrontOutline, searchOutline, bookmarkOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class LayoutComponent {
  constructor() {
    addIcons({ storefrontOutline, searchOutline, bookmarkOutline, personOutline });
  }
}
