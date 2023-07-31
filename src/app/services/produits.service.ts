import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor() { }

  /**
   * Met à jour un produit dans la base de données Firestore.
   * @param produit - L'objet représentant le produit à mettre à jour.
   * @returns Une promesse résolue avec la valeur `true` si la mise à jour est réussie, sinon une promesse rejetée avec la valeur `false`.
   * @remarks Cette fonction enregistre l'objet `produit` dans la collection "produit" de Firestore sous forme d'un nouveau document ou met à jour un document existant avec la même ID si celui-ci existe déjà.
   */
  async updateProduit(produit: Product) {
    produit = Object.assign({}, produit);
    try {
      await setDoc(doc(db, 'produit', produit.id.toString()), {
        produit
      });
      return true;
    } catch (e) {
      console.error(e);
      return false
    }
  }
}
