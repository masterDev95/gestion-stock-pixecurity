import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuGlobalComponent } from './menu-global/menu-global.component';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAczG-JufjksYif7C1FVLd25QvtAg09krs",
  authDomain: "test-stock-c5184.firebaseapp.com",
  projectId: "test-stock-c5184",
  storageBucket: "test-stock-c5184.appspot.com",
  messagingSenderId: "349844401678",
  appId: "1:349844401678:web:68413257fe191fa172965f",
  measurementId: "G-TMTC0G8KGD"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
