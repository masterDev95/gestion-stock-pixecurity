/**
 * Représente une catégorie de produits.
 */
export class Categorie {
  /** Le nom de la catégorie. */
  name: string = '';
  /** Liste des identifiants des produits associés à la catégorie. */
  listeIdProduits: number[] = [];
  /** Le nom de l'icône Ionic associée à la catégorie. */
  ionIcon!: string;
}
