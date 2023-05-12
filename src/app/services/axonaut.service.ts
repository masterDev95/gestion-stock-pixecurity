import { Injectable } from '@angular/core';
import { HttpsCallableResult, httpsCallableFromURL } from 'firebase/functions';
import { Subject } from 'rxjs';
import { functions } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class AxonautService {
  /** Sujet pour le produit à mettre à jour. */
  productToUpdate = new Subject<any>();

  constructor() {}

  /**
   * Récupère un produit par son ID.
   * @param id L'ID du produit à récupérer.
   * @returns Une promesse contenant le produit récupéré.
   */
  getProductsById(id: number) {
    return httpsCallableFromURL(
      functions,
      `https://getproductbyid-7yl55atwgq-uc.a.run.app?id=${id}`
    )();
  }

  /**
   * Récupère un produit par son code.
   * @param code Le code du produit à récupérer.
   * @returns Une promesse contenant le produit récupéré.
   */
  getProductsByCode(code: string) {
    return httpsCallableFromURL(
      functions,
      `https://getproductbycode-7yl55atwgq-uc.a.run.app?code=${code}`
    )();
  }

  /**
   * Récupère des produits par leur nom.
   * @param name Le nom des produits à récupérer.
   * @returns Une promesse contenant les produits récupérés.
   */
  getProductsByName(name: string) {
    return httpsCallableFromURL(
      functions,
      `https://getproductbyname-7yl55atwgq-uc.a.run.app?name=${name}`
    )();
  }

  /**
   * Met à jour le stock d'un produit.
   * @param pID L'ID du produit à mettre à jour.
   * @param n La nouvelle quantité de stock.
   * @returns Une promesse pour la requête de mise à jour du stock.
   */
  updateStock(pID: string, n: number) {
    return httpsCallableFromURL(
      functions,
      `https://updatestock-7yl55atwgq-uc.a.run.app?pID=${pID}&n=${n}`
    )();
  }

  /**
   * Met à jour un produit.
   * @param pID L'ID du produit à mettre à jour.
   * @param productOptions Les options de mise à jour du produit.
   * @returns Une promesse pour la requête de mise à jour du produit.
   */
  updateProduct(pID: string, productOptions: any) {
    return httpsCallableFromURL(
      functions,
      `https://updateproduct-7yl55atwgq-uc.a.run.app?pID=${pID}&po=${JSON.stringify(
        productOptions
      )}`
    )();
  }

  /**
   * Crée un nouveau produit.
   * @param productOptions Les options du produit à créer.
   * @returns Une promesse pour la requête de création du produit.
   */
  createProduct(productOptions: any) {
    const subject = new Subject<Promise<HttpsCallableResult>>();
    httpsCallableFromURL(
      functions,
      `https://createproduct-7yl55atwgq-uc.a.run.app?po=${JSON.stringify(
        productOptions
      )}`
    )().then((res) =>
      subject.next(this.updateProduct((res.data as any).id, productOptions))
    );
    return subject.asObservable();
  }
}
