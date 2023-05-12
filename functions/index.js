const onRequest = require("firebase-functions/v2/https").onRequest;
const initializeApp = require("firebase-admin/app").initializeApp;
const axios = require("axios");

initializeApp();

const header = {
  headers: {
    accept: "application/json",
    userApiKey: "2048379c51878d5e47afbd71753baab1",
  },
};

// Récupération d'un produit par son id
exports.getProductById = onRequest({cors: true}, async (req, res) => {
  const response = await axios.get(
      `https://axonaut.com/api/v2/products/${req.query.id}`,
      header,
  );
  res.status(200).send({"data": response.data});
});

// Récupération d'un produit par son code
exports.getProductByCode = onRequest({cors: true}, async (req, res) => {
  const response = await axios.get(
      `https://axonaut.com/api/v2/products?product_code=${req.query.code}`,
      header,
  );
  res.status(200).send({"data": response.data});
});

// Récupération d'un produit par son nom
exports.getProductByName = onRequest({cors: true}, async (req, res) => {
  const response = await axios.get(
      `https://axonaut.com/api/v2/products?name=${req.query.name}`,
      header,
  );
  res.status(200).send({"data": response.data});
});

// Mise à jour du produit
exports.updateProduct = onRequest({cors: true}, async (req, res) => {
  const {
    name,
    type,
    productCode,
    customFields,
    description,
    priceFields,
    qty,
  } = JSON.parse(req.query.po);

  const response = await axios.patch(
      `https://axonaut.com/api/v2/products/${req.query.pID}`,
      {
        name,
        product_type: type,
        product_code: productCode,
        custom_fields: {
          Marque: customFields.marque,
          Fournisseur: customFields.fournisseur,
        },
        description,
        price: priceFields.price,
        tax_rate: priceFields.taxRate,
        stock: qty,
      },
      header,
  );

  res.status(200).send({"data": response.data});
});

// Mise à jour du stock
exports.updateStock = onRequest({cors: true}, async (req, res) => {
  const body = {
    stock: parseInt(req.query.n),
    update_reason: "inventory",
  };

  const response = await axios.patch(
      `https://axonaut.com/api/v2/products/${req.query.pID}/stock`,
      body,
      header,
  );

  res.status(200).send({"data": response.data});
});

// Création d'un produit
exports.createProduct = onRequest({cors: true}, async (req, res) => {
  const {name, type, productCode, description, priceFields, qty} = JSON.parse(
      req.query.po,
  );

  const body = {
    name,
    product_type: type,
    product_code: productCode,
    description,
    price: priceFields.price,
    tax_rate: priceFields.taxRate,
    stock: qty,
  };

  const response = await axios.post(
      "https://axonaut.com/api/v2/products",
      body,
      header,
  );

  res.status(200).send({"data": response.data});
});
