import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'home-article-recent',
  styleUrls: ['./article-recent.component.scss'],
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-card button>
      <ion-card-header>
        <ion-card-subtitle>Article récemment ajouté</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content class="ion-text-end"> AUTODOME IP Starlight 5000i IR </ion-card-content>
    </ion-card>
  `,
})
export class ArticleRecentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
