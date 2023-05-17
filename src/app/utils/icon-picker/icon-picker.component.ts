import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
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
    private modalController: ModalController  ) {}

  ngOnInit() {
    this.initIcons();
  }

  /**
   * Initialise la liste des icônes.
   * Les icônes sont extraites de l'objet "ionicons" et ajoutées à la liste "iconList".
   * La liste de recherche "searchList" est également initialisée avec la liste complète des icônes.
   */
  private initIcons() {
    // Parcours de toutes les clés de l'objet "ionicons"
    Object.keys(ionicons).forEach((key) => {
      // Si la clé contient les mots "sharp" ou "outline", on ignore celle-ci
      if (key.match(/sharp|outline/gi)) return;

      // Conversion de la clé en format kebab-case (séparé par des tirets)
      const hyphenatedKey = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();

      // Ajout de la clé convertie à la liste "iconList"
      this.iconList.push(hyphenatedKey);
    });

    // La liste de recherche est initialisée avec la liste complète des icônes
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
