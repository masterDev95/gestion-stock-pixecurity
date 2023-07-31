import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Categorie } from 'src/app/models/categorie';
import { Product } from 'src/app/models/product';
import { AxonautService } from 'src/app/services/axonaut.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'ajout-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
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
    categorie: [''],
    priceFields: this.fb.group({
      price: [0, [Validators.required, Validators.min(0)]],
      taxRate: [
        0,
        [Validators.required, Validators.pattern(/^(0|5.5|10|20)$/)],
      ],
    }),
    qty: [0, [Validators.required, Validators.min(0)]],
  });

  collectionCategories: { [key: string]: Categorie } = {};
  Object = Object;

  constructor(
    private fb: FormBuilder,
    private axonautService: AxonautService,
    private categorieService: CategorieService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navController: NavController,
    private produitService: ProduitsService,
  ) {}

  ngOnInit() {
    this.categorieService
      .getCollection()
      .then((categories) => (this.collectionCategories = categories));
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
  async onValid() {
    if (!this.productForm.valid) return;

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
      value
        .then((res) => {
          const chosenCategorie = this.productForm.controls.categorie
            .value as string;

          if (chosenCategorie !== '') {
            // Mettre à jour la catégorie si une catégorie est choisie
            const categorie = this.collectionCategories[chosenCategorie];
            const createdProduct = (res.data as any)
            const found = categorie.listeIdProduits.find(
              (id) => id === createdProduct.id
            );
            if (!found) categorie.listeIdProduits.push(createdProduct.id);
            this.categorieService.updateCategorie(chosenCategorie, categorie);

            // Créer le produit sur Firestore
            const produit = new Product({
              id: createdProduct.id,
              name: createdProduct.name,
              customFields: createdProduct.custom_fields,
              description: createdProduct.description,
              price: createdProduct.price,
              priceWithTax: createdProduct.price_with_tax,
              productCode: createdProduct.product_code,
              stock: createdProduct.stock,
              taxRate: createdProduct.tax_rate,
              type: createdProduct.type,
            });

            this.produitService.updateProduit(produit);
          }

          // Naviguer vers la page de détail du produit créé
          this.navController.navigateBack(['tabs', 'new', 'detail-produit'], {
            queryParams: {
              product: JSON.stringify(res.data),
            },
          });

          loading.dismiss();
          console.log('Création avec succès !');
          this.presentToastUpdate('Produit crée!');
        })
        .catch((err) => {
          loading.dismiss();
          console.error(err);
          this.presentToastUpdate(
            'Une erreur est survenue lors de la création du produit.'
          );
        });
    });
  }
}
