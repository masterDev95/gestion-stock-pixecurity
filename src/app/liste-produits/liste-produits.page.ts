import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../models/categorie';
import { Product } from '../models/product';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-liste-produits',
  styleUrls: ['./liste-produits.page.scss'],
  templateUrl: './liste-produits.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListeProduitsPage implements OnInit {
  listeIdProduits!: Categorie;
  listeProduits: Product[] = [];
  nomCategorie = '';

  constructor(
    private navController: NavController,
    private produitsService: ProduitsService
  ) {}

  ngOnInit() {
    // Si la catégorie n'est pas présente dans l'historique, retourne en arrière.
    // Sinon, charge les détails de la catégorie et les produits associés.
    if (!history.state.categorie) {
      this.navController.back();
      return;
    }

    // Récupère le nom de la catégorie depuis l'historique
    this.nomCategorie = history.state.categorie.name;

    // Récupère la liste des ID de produits depuis l'historique
    this.listeIdProduits = history.state.categorie;

    // Parcourt les ID de produits et récupère les détails de chaque produit
    for (const id of this.listeIdProduits.listeIdProduits) {
      this.produitsService
        .getProduitById(id.toString())
        .then((p) => this.listeProduits.push(p));
    }
  }

  /**
   * Redirige vers la page de détails du produit sélectionné.
   * @param product Le produit sélectionné.
   */
  goToDetail(product: Product) {
    // Prépare les paramètres de la navigation avec les détails du produit sélectionné
    const navExtras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(product),
      },
    };
    // Navigue vers la page de détails du produit en utilisant la NavController
    this.navController.navigateForward(
      ['tabs', 'search', 'detail-produit'],
      navExtras
    );
  }
}
