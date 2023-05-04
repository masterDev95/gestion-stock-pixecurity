import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ContentComponent],
})
export class HomePage {
  constructor(private navController: NavController) {}

  goToSearch() {
    this.navController.navigateForward(['tabs', 'search']);
  }
}
