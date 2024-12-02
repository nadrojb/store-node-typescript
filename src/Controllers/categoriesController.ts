const mysql = require("promise-mysql");
const dbSettings = require("../../environments.ts");

const categories = async (req, res) => {
  try {
    const db = await mysql.createConnection(dbSettings);
    const output =
      await db.query(`SELECT categories.id, categories.category AS name, COUNT(products.name) AS products
  FROM categories 
  LEFT JOIN products 
  ON categories.category = products.name 
  GROUP BY categories.category 
  ORDER BY categories.id;`);

    const categories = output.map((row) => ({
      id: row.id,
      name: row.name,
      products: row.products,
    }));
    res.json({
      message: "Successfully retrieved categories.",
      data: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred.", error: err.message });
  }
};

module.exports = { categories };
