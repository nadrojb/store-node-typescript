const mysql = require("promise-mysql");
const dbSettings = require("../../environments");

const singleProduct = async (req, res) => {
  let productId = req.query.id;
  let unit = req.query.unit;

  try {
    const db = await mysql.createConnection(dbSettings);
    const productRow = await db.query(
      `SELECT products.name, products.width, products.height, products.depth, products.price, products.stock, products.related, products.color, categories.id as categoryId FROM products LEFT JOIN categories ON products.name = categories.category  WHERE products.id = ?`,
      [productId]
    );
    const productData = productRow[0];
    const product = {
      categoryId: productData.categoryId,
      width: convertUnit(unit, productData.width),
      height: convertUnit(unit, productData.height),
      depth: convertUnit(unit, productData.depth),
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

function convertUnit(unit, input) {
  if (unit == "mm") {
    return input;
  } else if (unit == "cm") {
    let result = input * 0.1;
    return result.toFixed(2);
  } else if (unit == "in") {
    let result = input * 0.0393701;
    return result.toFixed(2);
  } else if (unit == "ft") {
    let result = input * 0.00328084;
    return result.toFixed(2);
  }
}

module.exports = { singleProduct };
