import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemsComponent } from './items/items.component';

@Component({
  selector: 'app-menu-global',
  styleUrls: ['./menu-global.component.scss'],
  standalone: true,
  imports: [IonicModule, ItemsComponent],
  template: `
    <ion-menu content-id="menu-global">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <app-items></app-items>
      </ion-content>
    </ion-menu>
  `,
})
export class MenuGlobalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
