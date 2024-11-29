const express = require("express");
const cors = require("cors");
const mysql = require("promise-mysql");
const categoriesController = require("./src/Controllers/categoriesController");
const allProductsController = require("./src/Controllers/allProductsController");
const dbSettings = require("./environments");
const app = express();
const port = 3001;
app.use(cors());

app.get("/categories", categoriesController.categories);

app.get("/products", allProductsController.allProducts);

app.get("/product", async (req, res) => {
  let productId = req.query.id;

  try {
    const db = await mysql.createConnection(dbSettings);
    const productRow = await db.query(
      `SELECT products.id, products.name, products.width, products.height, products.depth, products.price, products.stock, products.related, products.color, categories.id as categoryId FROM products LEFT JOIN categories ON products.name = categories.category  WHERE products.id = ?`,
      [productId]
    );

    const product = productRow.map((productRow) => ({
      categoryId: productRow.categoryId,
      width: productRow.width,
      height: productRow.height,
      depth: productRow.depth,
      price: productRow.price,
      stock: productRow.stock,
      related: productRow.related,
      color: productRow.color,
    }));
    res.json({
      message: "Successfully retrieved product.",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invalid product id", data: [] });
  }
});

app.listen(port);
