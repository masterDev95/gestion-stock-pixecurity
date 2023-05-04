import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  styleUrls: ['./items.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-list>
      <ng-container *ngFor="let item of itemsList">
        <ion-menu-toggle>
          <ion-item button (click)="navigate(item.link)" lines="none">
            <ion-icon slot="start" [name]="item.iconName"></ion-icon>
            <ion-label>{{ item.label }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
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
    link: string[];
  }[] = [];

  constructor(private navController: NavController) {}

  ngOnInit() {
    // Initialisation de la liste d'éléments avec des données
    this.itemsList = [
      {
        iconName: 'home',
        label: 'Accueil',
        link: ['tabs', 'home'],
      },
      {
        iconName: 'apps',
        label: 'Catégories',
        link: ['tabs', 'home'],
      },
      {
        iconName: 'search',
        label: 'Rechercher',
        link: ['tabs', 'search'],
      },
      {
        iconName: 'add',
        label: 'Ajouter un nouvel article',
        link: ['tabs', 'new'],
      },
    ];
  }

  navigate(link: string[]) {
    this.navController.navigateForward(link);
  }
}
