import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Unsubscribe } from 'firebase/firestore';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'categories-liste',
  styleUrls: ['./liste.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  template: `
    <ion-grid fixed>
      <ion-row>
        <ion-col
          size="6"
          sizeMd="4"
          sizeLg="3"
          *ngFor="let c of collectionCategories | keyvalue"
        >
          <ion-card
            class="ion-text-center ion-text-uppercase"
            button
            (click)="openCategorie(c.key, c.value)"
          >
            <ion-card-header>
              <ion-card-title>
                <p>
                  <ion-icon
                    slot="start"
                    [name]="c.value.ionIcon"
                    size="large"
                  ></ion-icon>
                </p>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>
                {{ c.value.name }}
              </p>
              <p>
                {{ c.value.listeIdProduits.length }}
                {{
                  c.value.listeIdProduits.length > 1 ? 'articles' : 'article'
                }}
                dispos
              </p>
            </ion-card-content>
          </ion-card>
        </ion-col>

        <ion-col
          *ngIf="Object.keys(collectionCategories).length < 1"
          class="ion-padding ion-text-justify"
        >
          <p>
            Il n'y a pour le moment aucune catégorie disponible, mais vous
            pouvez en créer une si vous le souhaitez.
          </p>
          <div class="ion-text-center">
            <ion-button size="large" [routerLink]="['ajout-categorie']">
              <ion-icon slot="start" name="add"></ion-icon>
              Nouveau
            </ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class ListeComponent implements OnInit, OnDestroy {
  /** Collection des catégories. */
  collectionCategories: { [key: string]: Categorie } = {};
  /** Fonction de désabonnement de l'écoute des catégories. */
  unsubCategoriesListen!: Unsubscribe;

  /** Objet pour utiliser la fonction Object dans le template. */
  Object = Object;

  constructor(
    private categorieService: CategorieService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.initCategoriesListening();
  }

  /**
   * Initialise l'écoute des catégories.
   */
  private initCategoriesListening() {
    this.unsubCategoriesListen = this.categorieService.listenToCollection();
    this.categorieService.collectionSubject.subscribe(
      (categories) => (this.collectionCategories = categories)
    );
  }

  /**
   * Effectue les opérations de nettoyage lors de la destruction du composant.
   */
  ngOnDestroy() {
    this.unsubCategoriesListen();
  }

  /**
   * Ouvre la catégorie spécifiée.
   * @param categorieId L'ID de la catégorie.
   * @param categorie La catégorie à ouvrir.
   */
  openCategorie(categorieId: string, categorie: Categorie) {
    this.navController.navigateForward(
      ['tabs', 'categories', 'detail-categorie'],
      { state: { id: categorieId, categorie } }
    );
  }
}
