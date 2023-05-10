import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AxonautService {
  /** Options pour les requêtes HTTP. */
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:8100',
    }),
  };

  /** Sujet pour le produit à mettre à jour. */
  productToUpdate = new Subject<any>();

  constructor(private http: HttpClient) {}

  /**
   * Récupère un produit par son ID.
   * @param id L'ID du produit à récupérer.
   * @returns Un observable contenant le produit récupéré.
   */
  getProductsById(id: number) {
    return this.http.get(
      `http://localhost:3000/products/${id}`,
      this.httpOptions
    );
  }

  /**
   * Récupère un produit par son code.
   * @param code Le code du produit à récupérer.
   * @returns Un observable contenant le produit récupéré.
   */
  getProductsByCode(code: string) {
    return this.http.get(
      `http://localhost:3000/products/product-code/${code}`,
      this.httpOptions
    );
  }

  /**
   * Récupère des produits par leur nom.
   * @param name Le nom des produits à récupérer.
   * @returns Un observable contenant les produits récupérés.
   */
  getProductsByName(name: string) {
    return this.http.get(
      `http://localhost:3000/products/name/${name}`,
      this.httpOptions
    );
  }

  /**
   * Met à jour le stock d'un produit.
   * @param pID L'ID du produit à mettre à jour.
   * @param n La nouvelle quantité de stock.
   * @returns Un observable pour la requête de mise à jour du stock.
   */
  updateStock(pID: string, n: number) {
    return this.http.patch(
      `http://localhost:3000/update/${pID}/stock/${n}`,
      this.httpOptions
    );
  }

  /**
   * Met à jour un produit.
   * @param pID L'ID du produit à mettre à jour.
   * @param productOptions Les options de mise à jour du produit.
   * @returns Un observable pour la requête de mise à jour du produit.
   */
  updateProduct(pID: string, productOptions: any) {
    return this.http.patch(
      `http://localhost:3000/update/${pID}`,
      productOptions,
      this.httpOptions
    );
  }

  /**
   * Crée un nouveau produit.
   * @param productOptions Les options du produit à créer.
   * @returns Un observable pour la requête de création du produit.
   */
  createProduct(productOptions: any) {
    const subject = new Subject<Observable<Object>>();
    this.http
      .post('http://localhost:3000/create', productOptions, this.httpOptions)
      .subscribe((res: any) =>
        subject.next(this.updateProduct(res.id, productOptions))
      );
    return subject.asObservable();
  }
}
