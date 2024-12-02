import express from "express";
import cors from "cors";
import mysql from "promise-mysql";
import { categories } from "./src/Controllers/categoriesController";
import { allProducts } from "./src/Controllers/allProductsController";
import { singleProduct } from "./src/Controllers/singleProductController";
import { dbSettings } from "./environments";
const app = express();
const port = 3001;
app.use(cors());

app.get("/categories", categories);

app.get("/products", allProducts);

app.get("/product", singleProduct);

app.listen(port);
