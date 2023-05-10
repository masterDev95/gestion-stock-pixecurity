import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ng-container *ngFor="let i of itemsList">
          <ion-tab-button [tab]="i.tab">
            <ion-icon [name]="i.iconName"></ion-icon>
            <ion-label>{{ i.label }}</ion-label>
          </ion-tab-button>
        </ng-container>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage implements OnInit {
  /**
   * Liste des éléments à afficher dans le composant ItemsComponent.
   * @remarks Cette liste doit contenir des objets avec les propriétés suivantes : tab et iconName.
   */
  itemsList: {
    tab: string;
    iconName: string;
    label: string;
  }[] = [];

  constructor() {}

  ngOnInit() {
    this.itemsList = [
      {
        tab: 'home',
        iconName: 'home',
        label: 'Accueil',
      },
      {
        tab: 'categories',
        iconName: 'apps',
        label: 'Catégories',
      },
      {
        tab: 'search',
        iconName: 'search',
        label: 'Rechercher',
      },
      {
        tab: 'new',
        iconName: 'add',
        label: 'Ajouter',
      },
    ];
  }
}
