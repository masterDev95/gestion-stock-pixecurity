import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'home-articles-total',
  styleUrls: ['./articles-total.component.scss'],
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-card class="ion-text-center">
      <ion-card-header>
        <ion-card-title>Total article</ion-card-title>
      </ion-card-header>
      <ion-card-content> 777 </ion-card-content>
    </ion-card>
  `,
})
export class ArticlesTotalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
