import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-items',
  styleUrls: ['./items.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-list>
      <ng-container *ngFor="let item of itemsList">
        <ion-item button lines="none">
          <ion-icon slot="start" [name]="item.iconName"></ion-icon>
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>
      </ng-container>
    </ion-list>
  `,
})
export class ItemsComponent implements OnInit {
  /**
   * Liste des éléments à afficher dans le composant ItemsComponent.
   * @remarks Cette liste doit contenir des objets avec les propriétés suivantes : label et iconName.
   */
  itemsList: {
    label: string;
    iconName: string;
  }[] = [];

  constructor() {}

  ngOnInit() {
    // Initialisation de la liste d'éléments avec des données
    this.itemsList = [
      {
        iconName: 'home',
        label: 'Accueil',
      },
      {
        iconName: 'apps',
        label: 'Catégories',
      },
      {
        iconName: 'search',
        label: 'Rechercher',
      },
      {
        iconName: 'add',
        label: 'Ajouter un nouvel article',
      },
    ];
  }
}
