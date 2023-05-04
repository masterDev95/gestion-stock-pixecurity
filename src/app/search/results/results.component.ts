import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import {
  IonicModule,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AxonautService } from 'src/app/services/axonaut.service';
import { NumberPickerComponent } from 'src/app/utils/number-picker/number-picker.component';

@Component({
  selector: 'search-results',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-grid fixed>
      <ion-row class="ion-padding-horizontal">
        <ion-col>
          <h1>Résultat de la recherche</h1>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-list>
            <ng-container *ngFor="let p of results; index as i">
              <ion-item *ngIf="p.custom_fields.Fournisseur">
                <ion-label>
                  <p>{{ p.custom_fields.Fournisseur }}</p>
                  <h2>{{ p.name }}</h2>
                  <p>{{ p.stock }} articles</p>
                </ion-label>

                <ion-buttons slot="end">
                  <ion-button fill="solid" (click)="goToDetail(p)">
                    Détails
                  </ion-button>
                  <ion-button fill="solid" (click)="presentModalQty(p, i)">
                    Stock
                  </ion-button>
                </ion-buttons>
              </ion-item>
            </ng-container>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class ResultsComponent implements OnInit {
  /** Les résultats de la recherche de produits */
  @Input() results!: any;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private navController: NavController,
    private axonautService: AxonautService
  ) {}

  ngOnInit() {
    this.itemChangeDetection();
  }

  /**
   * Fonction pour détecter les changements de produits envoyés depuis le service AxonautService.
   * Cette fonction met à jour le produit correspondant dans le tableau `results` si le produit existe déjà.
   */
  itemChangeDetection() {
    this.axonautService.productToUpdate.subscribe((newProduct) => {
      const { productCode, customFields, priceFields, qty } = newProduct;

      // Transformation des propriétés du produit en conformité avec la structure attendue par l'API
      newProduct = {
        ...newProduct,
        product_code: productCode,
        custom_fields: {
          Marque: customFields.marque,
          Fournisseur: customFields.fournisseur,
        },
        price: priceFields.price,
        price_with_tax: priceFields.priceWithTax,
        tax_rate: priceFields.taxRate,
        stock: qty,
      };

      // Recherche l'index du produit dans le tableau `results`
      const index = this.results.findIndex(
        (item: any) => item.id === newProduct.id
      );

      // Si le produit existe déjà, on met à jour ses propriétés dans le tableau `results`
      if (index !== -1) {
        this.results[index] = newProduct;
      }
    });
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
   * Fonction pour afficher une modale permettant de modifier le stock d'un produit.
   * @param product Le produit dont on veut modifier le stock.
   * @param index L'index du produit dans le tableau des résultats.
   */
  async presentModalQty(product: any, index: number) {
    const modal = await this.modalController.create({
      component: NumberPickerComponent,
      componentProps: { number: product.stock, maxNbOfDigits: 3 },
      initialBreakpoint: 0.33,
      breakpoints: [0, .33, .5, .75],
    });
    modal.present();

    // Attente de la fermeture de la modal
    const { data, role } = await modal.onWillDismiss();

    // Si l'utilisateur a sauvegardé les modifications
    if (role === 'save') {
      // Vérification si la quantité modifiée est différente de la quantité actuelle
      if (data.qty === this.results[index].stock) return;

      // Affichage d'un loader en attendant la mise à jour
      const loading = await this.loadingController.create({
        message: 'Veuillez patienter...',
      });
      loading.present();

      // Appel au service pour mettre à jour le stock
      this.axonautService.updateStock(product.id, data).subscribe({
        // Si une erreur se produit
        error: (err) => {
          loading.dismiss();
          console.error(err);
          this.presentToastUpdate(
            'Une erreur est survenue lors de la mise à jour du stock.'
          );
        },
        // Si la mise à jour est effectuée avec succès
        complete: () => {
          // Calcul de la différence de stock et affichage d'un message
          const diff = data - this.results[index].stock;
          const sign = Math.sign(diff) === 1 ? '+' : '-';
          this.results[index].stock = data;
          loading.dismiss();
          console.log('Mis à jour !');
          this.presentToastUpdate(
            `Stock mis à jour de ${sign}${Math.abs(diff)} unité(s)`
          );
        },
      });
    }
  }

  /**
   * Redirige vers la page de détails du produit sélectionné.
   * @param product Le produit sélectionné.
   */
  goToDetail(product: any) {
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
