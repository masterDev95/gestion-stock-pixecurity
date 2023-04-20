import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'home-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class NavigationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
