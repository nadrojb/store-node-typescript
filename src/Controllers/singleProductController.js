const mysql = require("promise-mysql");
const dbSettings = require("../../environments");

const singleProduct = async (req, res) => {
  let productId = req.query.id;

  try {
    const db = await mysql.createConnection(dbSettings);
    const productRow = await db.query(
      `SELECT products.name, products.width, products.height, products.depth, products.price, products.stock, products.related, products.color, categories.id as categoryId FROM products LEFT JOIN categories ON products.name = categories.category  WHERE products.id = ?`,
      [productId]
    );
    const productData = productRow[0];
    const product = {
      categoryId: productData.categoryId,
      width: productData.width,
      height: productData.height,
      depth: productData.depth,
      price: formatPrice(productData.price),
      stock: productData.stock,
      related: productData.related,
      color: productData.color,
    };
    res.json({
      message: "Successfully retrieved product.",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invalid product id", data: [] });
  }
};

function formatPrice(input) {
  return input.toFixed(2);
}

module.exports = { singleProduct };
