const express = require("express");
const cors = require("cors");
const mysql = require("promise-mysql");
const categoriesController = require("./src/Controllers/categoriesController");
const app = express();
const port = 3001;
app.use(cors());

app.get("/categories", categoriesController.categories);

app.listen(port);
