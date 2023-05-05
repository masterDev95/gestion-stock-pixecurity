import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import * as ionicons from 'ionicons/icons';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class IconPickerComponent implements OnInit {
  iconList: string[] = [];
  searchList: string[] = [];

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.initIcons();
  }

  private initIcons() {
    let i = 0;
    Object.keys(ionicons).forEach((key) => {
      if (key.match(/sharp|outline/gi)) return;
      const hyphenatedKey = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
      this.iconList.push(hyphenatedKey);
    });
    this.searchList = this.iconList;
  }

  /**
   * Ferme la modal sans sauvegarder
   */
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Sauvegarde le nombre modifié et ferme la modal
   */
  save(iconName: string) {
    return this.modalController.dismiss(iconName, 'save');
  }

  search(e: any) {
    this.searchList = this.iconList.filter((iconName) =>
      iconName.includes(e.detail.value)
    );
  }
}
