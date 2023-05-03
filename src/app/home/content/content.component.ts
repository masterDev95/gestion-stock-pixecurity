import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ArticlesTotalComponent } from './articles-total/articles-total.component';
import { ArticleRecentComponent } from './article-recent/article-recent.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'home-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ArticlesTotalComponent,
    ArticleRecentComponent,
    NavigationComponent,
  ],
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
