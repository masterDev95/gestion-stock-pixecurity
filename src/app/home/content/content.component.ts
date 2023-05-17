import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'home-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [IonicModule, NavigationComponent],
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
