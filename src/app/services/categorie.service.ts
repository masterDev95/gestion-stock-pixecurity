import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../app.component';
import { Categorie } from '../models/categorie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  /** Flux observable des catégories. */
  categoriesSubject = new Subject<Categorie[]>();
  /** Flux observable de la collection de catégories. */
  collectionSubject = new Subject<{ [key: string]: Categorie }>();

  constructor() {}

  /**
   * Récupère toutes les catégories.
   * @returns Une promesse avec un tableau de catégories.
   */
  async getCategories() {
    const categories: Categorie[] = [];
    const querySnapshot = await getDocs(collection(db, 'categories'));
    querySnapshot.forEach((doc) => {
      categories.push(doc.data() as Categorie);
    });
    return categories;
  }

  /**
   * Récupère la collection de catégories sous forme de dictionnaire.
   * @returns Une promesse avec un dictionnaire de catégories indexé par ID.
   */
  async getCollection() {
    const col: { [key: string]: Categorie } = {};

    const querySnapshot = await getDocs(collection(db, 'categories'));
    querySnapshot.forEach((doc) => {
      col[doc.id] = doc.data() as Categorie;
    });

    return col;
  }

  /**
   * Crée une nouvelle catégorie.
   * @param categorie Les informations de la catégorie à créer.
   * @returns Une promesse avec la valeur `true` si la création réussit, sinon `false`.
   */
  async createCategorie(categorie: Categorie) {
    try {
      await addDoc(collection(db, 'categories'), {
        name: categorie.name,
        listeIdProduits: categorie.listeIdProduits,
        ionIcon: categorie.ionIcon,
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Met à jour une catégorie existante.
   * @param categorieId L'ID de la catégorie à mettre à jour.
   * @param values Les nouvelles valeurs de la catégorie.
   * @returns Une promesse avec la valeur `true` si la mise à jour réussit, sinon `false`.
   */
  async updateCategorie(categorieId: string, values: Categorie) {
    try {
      await setDoc(doc(db, 'categories', categorieId), {
        name: values.name,
        listeIdProduits: values.listeIdProduits,
        ionIcon: values.ionIcon,
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Récupère l'ID de la catégorie où se trouve un produit donné.
   * @param productId L'ID du produit donné.
   * @returns Une promesse avec l'ID de la catégorie si le produit est trouvé, sinon `null`.
   */
  async getCategorieByProductId(productId: number) {
    const collection = await this.getCollection();

    for (const categoryId in collection) {
      const categorie = collection[categoryId];
      if (categorie.listeIdProduits.includes(productId)) {
        return categoryId;
      }
    }

    return null; // Retourne `null` si le produit n'est trouvé dans aucune catégorie
  }

  /**
   * Écoute les modifications en temps réel de la collection de catégories.
   * @returns L'observable pour la collection de catégories.
   */
  listen() {
    return onSnapshot(collection(db, 'categories'), (query) => {
      const categories: Categorie[] = [];
      query.forEach((doc) => {
        categories.push(doc.data() as Categorie);
      });
      this.categoriesSubject.next(categories);
    });
  }

  /**
   * Écoute les modifications en temps réel de la collection de catégories et renvoie un dictionnaire indexé par ID.
   * @returns L'observable pour la collection de catégories sous forme de dictionnaire.
   */
  listenToCollection() {
    return onSnapshot(collection(db, 'categories'), (query) => {
      const col: { [key: string]: Categorie } = {};
      query.forEach((doc) => {
        col[doc.id] = doc.data() as Categorie;
      });
      this.collectionSubject.next(col);
    });
  }
}
