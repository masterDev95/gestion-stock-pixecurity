import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AxonautService } from 'src/app/services/axonaut.service';

@Component({
  selector: 'ajout-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  /**
   * FormGroup pour le formulaire de produit.
   * Les champs sont initialisés avec des valeurs par défaut et des validateurs.
   */
  productForm = this.fb.group({
    name: ['', Validators.required],
    type: [0, [Validators.required, Validators.pattern(/^(601|701|706|707)$/)]],
    productCode: [''],
    customFields: this.fb.group({
      marque: [''],
      fournisseur: [''],
    }),
    description: [''],
    priceFields: this.fb.group({
      price: [0, [Validators.required, Validators.min(0)]],
      taxRate: [
        0,
        [Validators.required, Validators.pattern(/^(0|5.5|10|20)$/)],
      ],
    }),
    qty: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private axonautService: AxonautService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navController: NavController
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
   * Méthode asynchrone qui est appelée lors de la soumission du formulaire de mise à jour d'un produit.
   * Elle récupère les valeurs du formulaire, affiche un loader en attendant la mise à jour, puis effectue la mise à jour du produit via le service Axonaut.
   */
  async onValid() {
    // récupérer les valeurs du formulaire
    const product: any = this.productForm.value;
    console.log(product);

    // Affichage d'un loader en attendant la mise à jour
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
    });
    loading.present();

    console.log(product);
    this.axonautService.createProduct(product).subscribe((value) => {
      value.subscribe({
        next: (res) =>
          this.navController.navigateBack(['tabs', 'new', 'detail-produit'], {
            queryParams: {
              product: JSON.stringify(res),
            },
          }),
        // Si une erreur se produit
        error: (err) => {
          loading.dismiss();
          console.error(err);
          this.presentToastUpdate(
            'Une erreur est survenue lors de la création du produit.'
          );
        },
        // Si la mise à jour est effectuée avec succès
        complete: () => {
          loading.dismiss();
          console.log('Création avec succès !');
          this.presentToastUpdate('Produit crée!');
        },
      });
    });
  }
}
