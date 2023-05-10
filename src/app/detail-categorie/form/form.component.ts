import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, NavController, ToastController } from '@ionic/angular';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { IconPickerComponent } from 'src/app/utils/icon-picker/icon-picker.component';

@Component({
  selector: 'detail-categorie-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  /** ID de la catégorie. */
  categorieId!: string;
  /** Icône sélectionnée. */
  selectedIcon!: string;
  /** Champ de saisie pour le nom de la catégorie */
  nameInput = new FormControl('', Validators.required);
  /** Liste des produits déjà existants */
  listeIdExistants: number[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private navController: NavController,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {}

  /**
   * Ouvre la modal pour sélectionner une icône.
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: IconPickerComponent,
    });
    await modal.present();

    // Attente de la fermeture de la modal
    const { data, role } = await modal.onWillDismiss();

    // Si l'utilisateur a sauvegardé les modifications
    if (role === 'save') {
      this.selectedIcon = data;
    }
  }

  /**
   * Fonction pour afficher un message éphémère.
   * @param message Le message à afficher.
   */
  async presentToastUpdate(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  onValid() {
    const newCategorie: Categorie = {
      name: this.nameInput.value!,
      listeIdProduits: this.listeIdExistants,
      ionIcon: this.selectedIcon,
    };

    this.categorieService
      .updateCategorie(this.categorieId, newCategorie)
      .then((success) => {
        if (success) {
          this.presentToastUpdate('La catégorie a bien été modifié !');
          this.navController.navigateBack(['tabs', 'categories']);
        } else {
          this.presentToastUpdate(
            'Une erreur est survenue lors de la modification de la catégorie'
          );
        }
      });
  }
}
