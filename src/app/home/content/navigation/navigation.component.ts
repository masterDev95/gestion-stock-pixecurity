import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'home-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class NavigationComponent  implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {}

  goToSearch() {
    this.navController.navigateForward(['tabs', 'search']);
  }

  goToAddProduct() {
    this.navController.navigateForward(['tabs', 'new']);
  }
}
