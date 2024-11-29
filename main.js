const express = require("express");
const cors = require("cors");
const mysql = require("promise-mysql");
const categoriesController = require("./src/Controllers/categoriesController");
const allProductsController = require("./src/Controllers/allProductsController");
const singleProductController = require("./src/Controllers/singleProductController");
const dbSettings = require("./environments");
const app = express();
const port = 3001;
app.use(cors());

app.get("/categories", categoriesController.categories);

app.get("/products", allProductsController.allProducts);

app.get("/product", singleProductController.singleProduct);

app.listen(port);
