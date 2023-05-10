import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonicModule,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { IconPickerComponent } from 'src/app/utils/icon-picker/icon-picker.component';

@Component({
  selector: 'ajout-categorie-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  /** Icône sélectionnée pour la catégorie. */
  selectedIcon!: string;
  /** Contrôle de formulaire pour le champ du nom de la catégorie. */
  nameInput = new FormControl('', [Validators.required]);

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private navController: NavController,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {}

  /**
   * Affiche la modale pour sélectionner une icône.
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

  /**
   * Action exécutée lors de la soumission du formulaire.
   * Crée une nouvelle catégorie avec les valeurs saisies et l'ajoute via le service de catégories.
   */
  onValid() {
    const newCategorie: Categorie = {
      name: this.nameInput.value!,
      listeIdProduits: [],
      ionIcon: this.selectedIcon,
    };

    this.categorieService.createCategorie(newCategorie).then((success) => {
      if (success) {
        this.presentToastUpdate('La catégorie a bien été crée !');
        this.navController.navigateBack(['tabs', 'categories']);
      } else {
        this.presentToastUpdate(
          'Une erreur est survenue lors de la création de la catégorie'
        );
      }
    });
  }
}
