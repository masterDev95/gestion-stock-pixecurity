import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuGlobalComponent } from './menu-global/menu-global.component';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';
import { environment } from 'src/environments/environment';

export const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);

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
