import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuGlobalComponent } from './menu-global/menu-global.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, MenuGlobalComponent],
})
export class AppComponent {
  constructor() {}
}
