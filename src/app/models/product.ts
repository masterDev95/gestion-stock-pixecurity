export class Product {
  id: number;
  name: string;
  productCode: string;
  supplierProductCode: string;
  description: string;
  price: string;
  priceWithTax: string;
  taxRate: number;
  type: string;
  category: string;
  jobCosting: string;
  location: string;
  unit: string;
  disabled: boolean;
  internalId: string;
  stock: number;
  weightedAverageCost: string;
  customFields: {
    marque: string;
    fournisseur: string;
  };
  image: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.productCode = data.product_code;
    this.supplierProductCode = data.supplier_product_code;
    this.description = data.description;
    this.price = data.price;
    this.priceWithTax = data.price_with_tax;
    this.taxRate = data.tax_rate;
    this.type = data.type;
    this.category = data.category;
    this.jobCosting = data.job_costing;
    this.location = data.location;
    this.unit = data.unit;
    this.disabled = data.disabled;
    this.internalId = data.internal_id;
    this.stock = data.stock;
    this.weightedAverageCost = data.weighted_average_cost;
    this.customFields = data.custom_fields;
    this.image = data.image;
  }
}
