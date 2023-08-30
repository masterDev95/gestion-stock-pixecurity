import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { QueryDocumentSnapshot, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor() { }

  /**
   * Récupère les produits par id.
   * @param productId - L'id du produit recherché
   * @returns Une promesse avec un produit.
   */
  async getProduitById(productId: string) {
    const produit = new Product();
    const querySnapshot = await getDocs(collection(db, 'produits'));
    querySnapshot.forEach((doc) => {
      if (doc.id === productId) {
        produit.id = doc.data()['produit']['id'];
        produit.name = doc.data()['produit']['name'];
        produit.customFields = doc.data()['produit']['customFields'];
        produit.description = doc.data()['produit']['description'];
        produit.price = doc.data()['produit']['price'];
        produit.priceWithTax = doc.data()['produit']['priceWithTax'];
        produit.productCode = doc.data()['produit']['productCode'];
        produit.stock = doc.data()['produit']['stock'];
        produit.taxRate = doc.data()['produit']['taxRate'];
        produit.type = doc.data()['produit']['type'];
      }
    });
    return produit;
  }

  /**
   * Met à jour un produit dans la base de données Firestore.
   * @param produit - L'objet représentant le produit à mettre à jour.
   * @returns Une promesse résolue avec la valeur `true` si la mise à jour est réussie, sinon une promesse rejetée avec la valeur `false`.
   * @remarks Cette fonction enregistre l'objet `produit` dans la collection "produit" de Firestore sous forme d'un nouveau document ou met à jour un document existant avec la même ID si celui-ci existe déjà.
   */
  async updateProduit(produit: Product) {
    produit = Object.assign({}, produit);
    try {
      await setDoc(doc(db, 'produits', produit.id.toString()), {
        produit
      });
      return true;
    } catch (e) {
      console.error(e);
      return false
    }
  }
}
