import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AxonautService } from 'src/app/services/axonaut.service';

@Component({
  selector: 'detail-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class FormComponent implements OnChanges {
  @Input() selectedProduct!: any;

  /**
   * FormGroup pour le formulaire de produit.
   * Les champs sont initialisés avec des valeurs par défaut et des validateurs.
   */
  productForm = this.fb.group({
    name: ['', Validators.required],
    type: [
      707,
      [Validators.required, Validators.pattern(/^(601|701|706|707)$/)],
    ],
    productCode: [''],
    customFields: this.fb.group({
      marque: [''],
      fournisseur: [''],
    }),
    description: [''],
    priceFields: this.fb.group({
      price: [0, [Validators.required, Validators.min(0)]],
      priceWithTax: [],
      taxRate: [
        20,
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

  /**
   * Fonction pour obtenir le type de produit correspondant au type de produit donné en paramètre.
   * @param productType Le type de produit sous forme de chaîne de caractères.
   * @returns Le type de produit correspondant sous forme de nombre.
   */
  getTypeFromProductType(productType: string): number {
    switch (productType) {
      case 'Service':
        return 706;
      case 'Matière première':
        return 601;
      case 'Produit fini':
        return 701;
      default:
        return 707;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Vérifie si la propriété 'selectedProduct' a été modifiée
    if (changes['selectedProduct']) {
      // Récupère le type de produit correspondant au produit sélectionné
      const type = this.getTypeFromProductType(this.selectedProduct.type);

      // Met à jour les valeurs du formulaire avec les informations du produit sélectionné
      this.productForm.patchValue({
        name: this.selectedProduct.name,
        type: type,
        productCode: this.selectedProduct.product_code,
        customFields: {
          fournisseur: this.selectedProduct.custom_fields.Fournisseur,
          marque: this.selectedProduct.custom_fields.Marque,
        },
        description: this.selectedProduct.description,
        priceFields: {
          price: this.selectedProduct.price,
          priceWithTax: this.selectedProduct.price_with_tax,
          taxRate: this.selectedProduct.tax_rate,
        },
        qty: this.selectedProduct.stock,
      });
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
   * Méthode asynchrone qui est appelée lors de la soumission du formulaire de mise à jour d'un produit.
   * Elle récupère les valeurs du formulaire, affiche un loader en attendant la mise à jour, puis effectue la mise à jour du produit via le service Axonaut.
   */
  async onSubmit() {
    // récupérer les valeurs du formulaire
    const product: any = this.productForm.value;

    // Affichage d'un loader en attendant la mise à jour
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
    });
    loading.present();

    console.log(product);
    this.axonautService
      .updateProduct(this.selectedProduct.id, product)
      .subscribe({
        // Si une erreur se produit
        error: (err) => {
          loading.dismiss();
          console.error(err);
          this.presentToastUpdate(
            'Une erreur est survenue lors de la mise à jour du produit.'
          );
        },
        // Si la mise à jour est effectuée avec succès
        complete: () => {
          loading.dismiss();
          console.log('Mis à jour !');
          this.presentToastUpdate('Produit mis à jour!');
          product.id = this.selectedProduct.id;
          this.axonautService.productToUpdate.next(product);
          this.navController.back();
        },
      });
  }
}
