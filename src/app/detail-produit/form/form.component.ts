import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  OnInit,
} from '@angular/core';
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
  selector: 'detail-produit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit, OnChanges {
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
    categorie: [''],
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

  collectionCategories: { [key: string]: Categorie } = {};
  Object = Object;

  constructor(
    private fb: FormBuilder,
    private axonautService: AxonautService,
    private categorieService: CategorieService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navController: NavController,
    private produitService: ProduitsService
  ) {}

  ngOnInit() {
    this.categorieService
      .getCollection()
      .then((categories) => (this.collectionCategories = categories));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Vérifie si la propriété 'selectedProduct' a été modifiée
    if (changes['selectedProduct']) {
      // Récupère le type de produit correspondant au produit sélectionné
      const type = this.getTypeFromProductType(this.selectedProduct.type);

      console.log(this.selectedProduct);

      // Met à jour les valeurs du formulaire avec les informations du produit sélectionné
      this.productForm.patchValue({
        name: this.selectedProduct.name,
        type: type,
        productCode: this.selectedProduct.productCode,
        customFields: {
          fournisseur: this.selectedProduct.customFields.Fournisseur,
          marque: this.selectedProduct.customFields.Marque,
        },
        description: this.selectedProduct.description,
        priceFields: {
          price: this.selectedProduct.price,
          priceWithTax: this.selectedProduct.priceWithTax,
          taxRate: this.selectedProduct.taxRate,
        },
        qty: this.selectedProduct.stock,
      });

      this.categorieService
        .getCategorieByProductId(this.selectedProduct.id)
        .then((categorie) => {
          if (!categorie) return;
          this.productForm.controls.categorie.setValue(categorie);
        });
    }
  }

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

    // Vérifier si une catégorie est choisie
    const chosenCategorie = this.productForm.controls.categorie.value as string;
    if (chosenCategorie !== '') {
      // Récupérer la catégorie correspondante
      const categorie = this.collectionCategories[chosenCategorie];

      // Vérifier si le produit est déjà dans la liste des produits de la catégorie
      const found = categorie.listeIdProduits.find(
        (id) => id === this.selectedProduct.id
      );

      // Ajouter le produit à la liste des produits de la catégorie si non trouvé
      if (!found) {
        categorie.listeIdProduits.push(this.selectedProduct.id);
      }

      // Mettre à jour la catégorie dans le service Categorie
      this.categorieService.updateCategorie(chosenCategorie, categorie);

      // Mettre à jour le produit sur Firestore
      const produit = new Product({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        customFields: this.selectedProduct.customFields,
        description: this.selectedProduct.description,
        price: this.selectedProduct.price,
        priceWithTax: this.selectedProduct.priceWithTax,
        productCode: this.selectedProduct.productCode,
        stock: this.selectedProduct.stock,
        taxRate: this.selectedProduct.taxRate,
        type: this.selectedProduct.type,
      });

      this.produitService.updateProduit(produit);
    }

    // Effectuer la mise à jour du produit via le service Axonaut
    try {
      await this.axonautService.updateProduct(this.selectedProduct.id, product);
      loading.dismiss();
      console.log('Mis à jour !');
      this.presentToastUpdate('Produit mis à jour!');

      // Mettre à jour les informations du produit dans le sujet productToUpdate
      product.id = this.selectedProduct.id;
      this.axonautService.productToUpdate.next(product);

      // Revenir en arrière dans la navigation
      this.navController.back();
    } catch (err) {
      loading.dismiss();
      console.error(err);
      this.presentToastUpdate(
        'Une erreur est survenue lors de la mise à jour du produit.'
      );
    }
  }
}
