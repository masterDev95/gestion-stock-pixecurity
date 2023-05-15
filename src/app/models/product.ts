interface ProductInterface {
  id: number;
  name: string;
  productCode: string;
  description: string;
  price: number;
  priceWithTax: number;
  taxRate: number;
  type: string;
  stock: number;
  customFields: {
    marque: string;
    fournisseur: string;
  };
}

export class Product {
  id: number;
  name: string;
  productCode: string;
  description: string;
  price: number;
  priceWithTax: number;
  taxRate: number;
  type: string;
  stock: number;
  customFields: {
    marque: string;
    fournisseur: string;
  };

  constructor(data: ProductInterface) {
    this.id = data.id;
    this.name = data.name;
    this.productCode = data.productCode;
    this.description = data.description;
    this.price = data.price;
    this.priceWithTax = data.priceWithTax;
    this.taxRate = data.taxRate;
    this.type = data.type;
    this.stock = data.stock;
    this.customFields = data.customFields;
  }
}
