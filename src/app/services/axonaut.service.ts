import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AxonautService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:8100',
    }),
  };

  productToUpdate = new Subject<any>();

  constructor(private http: HttpClient) {}

  getProductsByCode(code: string) {
    return this.http.get(
      `http://localhost:3000/products/product-code/${code}`,
      this.httpOptions
    );
  }

  getProductsByName(name: string) {
    return this.http.get(
      `http://localhost:3000/products/name/${name}`,
      this.httpOptions
    );
  }

  updateStock(pID: string, n: number) {
    return this.http.patch(
      `http://localhost:3000/update/${pID}/stock/${n}`,
      this.httpOptions
    );
  }

  updateProduct(pID: string, productOptions: any) {
    return this.http.patch(
      `http://localhost:3000/update/${pID}`,
      productOptions,
      this.httpOptions
    );
  }
}
