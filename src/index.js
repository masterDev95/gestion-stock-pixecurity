import express from "express";
import cors from "cors";
import {get, patch, post} from "axios";
const app = express();
import {axonautApiKey} from "./config";
import {json} from "body-parser";

app.use(json());

// Liste des origines autorisées à effectuer des requêtes
const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
];

// Configuration de CORS avec les origines autorisées
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Les headers à envoyer avec chaque requête vers l'API Axonaut
const headers = {
  userApiKey: axonautApiKey,
  accept: "application/json",
};

// Activation des requêtes preflight pour toutes les routes
app.options("*", cors(corsOptions));

// Récupération d'un produit par son id
app.get(
  "/products/:id",
  cors(corsOptions),
  async (req, res, next) => {
    try {
      console.log("GET product by id:", req.params.id);
      const response = await get(
        `https://axonaut.com/api/v2/products/${req.params.id}`,
        {headers}
      );
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

// Récupération d'un produit par son code
app.get(
  "/products/product-code/:code",
  cors(corsOptions),
  async (req, res, next) => {
    try {
      console.log("GET product by code:", req.params.code);
      const response = await get(
        `https://axonaut.com/api/v2/products?product_code=${req.params.code}`,
        {headers}
      );
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

// Récupération d'un produit par son nom
app.get("/products/name/:name", cors(corsOptions), async (req, res, next) => {
  try {
    console.log("GET product by name:", req.params.name);
    const response = await get(
      `https://axonaut.com/api/v2/products?name=${req.params.name}`,
      {headers}
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Mise à jour du produit
app.patch("/update/:pID/", cors(corsOptions), async (req, res, next) => {
  try {
    console.log(`UPDATE product "${req.params.pID}"`);

    // Extraire les données du corps de la requête PATCH
    const {
      name,
      type,
      productCode,
      customFields,
      description,
      priceFields,
      qty,
    } = req.body;

    // Envoyer une requête PATCH à l'API Axonaut pour mettre à jour le produit
    const response = await patch(
      `https://axonaut.com/api/v2/products/${req.params.pID}`,
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
      {headers}
    );

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Mise à jour du stock
app.patch(
  "/update/:pID/stock/:n",
  cors(corsOptions),
  async (req, res, next) => {
    try {
      console.log(`UPDATE stock "${req.params.pID}" x${req.params.n}`);

      const body = {
        stock: parseInt(req.params.n),
        update_reason: "inventory",
      };

      console.log(body);

      const response = await patch(
        `https://axonaut.com/api/v2/products/${req.params.pID}/stock`,
        body,
        {headers}
      );

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

// Création d'un produit
app.post("/create", cors(corsOptions), async (req, res, next) => {
  try {
    console.log("CREATE product");

    // Extraire les données du corps de la requête POST
    const {name, type, productCode, description, priceFields, qty} = req.body;

    const body = {
      name,
      product_type: type,
      product_code: productCode,
      description,
      price: priceFields.price,
      tax_rate: priceFields.taxRate,
      stock: qty,
    };

    // Envoyer une requête POST à l'API Axonaut pour créer le produit
    const response = await post(
      "https://axonaut.com/api/v2/products",
      body,
      {headers}
    );

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Lancement du serveur
app.listen(3000, () => {
  console.log("CORS-enabled web server listening on port 3000");
});
