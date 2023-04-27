import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
  ModalController,
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
              <ion-item *ngIf="p.custom_fields.Fournisseur" button>
                <ion-label>
                  <p>{{ p.custom_fields.Fournisseur }}</p>
                  <h2>{{ p.name }}</h2>
                  <p>{{ p.stock }} articles</p>
                </ion-label>

                <ion-buttons slot="end">
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
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private axonautService: AxonautService
  ) {}

  ngOnInit() {}

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
}
