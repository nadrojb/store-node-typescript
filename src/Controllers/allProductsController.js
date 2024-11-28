const mysql = require("promise-mysql");
const dbSettings = require("../../environments");

const allProducts = async (req, res) => {
  cat = req.query.cat;
  try {
    const db = await mysql.createConnection(dbSettings);
    const rows = await db.query(
      `SELECT * FROM products WHERE name=? ORDER BY id`,
      [cat]
    );

    const products = rows.map((row) => ({
      id: row.id,
      price: row.price,
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

module.exports = { allProducts };
