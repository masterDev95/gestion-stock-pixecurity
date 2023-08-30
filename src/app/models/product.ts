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

  constructor(data?: ProductInterface) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.productCode = data?.productCode ?? '';
    this.description = data?.description ?? '';
    this.price = data?.price ?? 0;
    this.priceWithTax = data?.priceWithTax ?? 0;
    this.taxRate = data?.taxRate ?? 0;
    this.type = data?.type ?? '';
    this.stock = data?.stock ?? 0;
    this.customFields = data?.customFields ?? { marque: '', fournisseur: '' };
  }
}
