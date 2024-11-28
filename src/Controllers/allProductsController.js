const mysql = require("promise-mysql");
const dbSettings = require("../../environments");

const allProducts = async (req, res) => {
  cat = req.query.cat;
  try {
    const db = await mysql.createConnection(dbSettings);
    const rows = await db.query(
      ` SELECT products.id, products.name, products.price, products.stock, products.color
        FROM products
        LEFT JOIN categories ON products.name = categories.category
        WHERE categories.id = ?;`,
      [cat]
    );

    const products = rows.map((row) => ({
      id: row.id,
      price: formatPrice(row.price),
      stock: row.stock,
      color: row.color,
    }));
    res.json({
      message: "Successfully retrieved products.",
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid category id", data: [] });
  }
};

function formatPrice(input) {
  return input.toFixed(2);
}

module.exports = { allProducts };
