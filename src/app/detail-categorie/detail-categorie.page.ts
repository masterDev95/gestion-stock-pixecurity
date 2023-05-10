import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Categorie } from '../models/categorie';
import { RouterLink } from '@angular/router';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.page.html',
  styleUrls: ['./detail-categorie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, FormComponent],
})
export class DetailCategoriePage implements OnInit {
  /** Référence au composant enfant FormComponent. */
  @ViewChild(FormComponent) form!: FormComponent;

  /** Objet contenant l'ID et la catégorie sélectionnée. */
  selectedCategorie!: { id: string; categorie: Categorie };
  /** ID de la catégorie sélectionnée. */
  selectedCategorieId!: string;

  constructor() {}

  ngOnInit() {
    // Récupére la catégorie sélectionnée à partir de l'historique de navigation
    this.selectedCategorie = history.state;
    this.selectedCategorieId = this.selectedCategorie['id'];
  }

  ionViewDidEnter() {
    // Initialise les valeurs du formulaire avec les données de la catégorie sélectionnée.
    this.form.categorieId = this.selectedCategorieId;
    this.form.nameInput.setValue(this.selectedCategorie.categorie.name);
    this.form.selectedIcon = this.selectedCategorie.categorie.ionIcon;
    this.form.listeIdExistants = this.selectedCategorie.categorie.listeIdProduits;
  }

  /**
   * Méthode appelée lors de la validation du formulaire.
   * Appelle la méthode onValid() du composant enfant FormComponent.
   */
  onValid() {
    this.form.onValid();
  }
}
