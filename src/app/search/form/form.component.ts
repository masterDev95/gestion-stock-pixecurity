import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { AxonautService } from 'src/app/services/axonaut.service';

@Component({
  selector: 'search-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  /**
   * Événement déclenché lorsque des résultats de recherche ont été trouvés.
   * Les résultats sont émis sous la forme d'un objet.
   */
  @Output() results = new EventEmitter<Object>();

  /** Segment actuellement sélectionné pour la recherche. Peut être `code` ou `name`. */
  currentSegment: 'code' | 'name' = 'code';
  /** Champ de recherche contrôlé par Reactive Forms. */
  searchField = new FormControl('', Validators.required);

  constructor(
    private axonautService: AxonautService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  /**
   * Gère l'événement de changement de segment.
   * @param e L'événement de changement de segment.
   */
  segmentChanged(e: any) {
    this.currentSegment = e.detail.value;
  }

  /**
   * Recherche des produits en fonction du segment et du terme de recherche actuels.
   * Émet des résultats via l'événement `results`.
   */
  async search() {
    const searchTerm = this.searchField.value;

    // Si le champ de recherche est vide, ne rien faire.
    if (!searchTerm) return;

    const loading = await this.presentLoading();
    loading.present();

    // Sélectionne l'observable approprié en fonction du segment actuel.
    const obs =
      this.currentSegment === 'code'
        ? this.axonautService.getProductsByCode(searchTerm)
        : this.axonautService.getProductsByName(searchTerm);

    obs.subscribe({
      next: (res) => {
        // Émet les résultats via l'événement `results`.
        this.results.emit(res);
        console.log(res);
      },
      error: (e) => {
        console.error(e);
        loading.dismiss();
        this.notFoundAlert();
      },
      complete: () => {
        console.info('Trouvé(s) !');
        loading.dismiss();
      },
    });
  }

  /**
   * Affiche un indicateur de chargement.
   * @returns Un objet `Promise` représentant l'indicateur de chargement.
   */
  presentLoading() {
    return this.loadingController.create({
      message: 'En cours de recherche...',
    });
  }

  /**
   * Affiche une alerte indiquant qu'aucun produit n'a été trouvé pour la recherche en cours.
   */
  async notFoundAlert() {
    const alert = await this.alertController.create({
      header: 'Produit non trouvé',
      message:
        'Veuillez être plus précis dans les termes de votre recherche.',
      buttons: ['OK'],
    });
    alert.present();
  }
}
