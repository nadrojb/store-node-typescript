const express = require("express");
const cors = require("cors");
const mysql = require("promise-mysql");

const app = express();
const port = 3001;

const dbSettings = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "furniture_store",
};
app.get("/categories", async (req, res) => {
  try {
    const db = await mysql.createConnection(dbSettings);
    const output = await db.query(
        'SELECT `id`, `category` ' +
        'FROM `categories`'
    );
    
    const categories = output.map((row) => ({
      id: row.id,
      name: row.category,
    }));
    res.json({
      message: "Successfully retrieved categories.",
      data: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred.", error: err.message });
  }
});

app.listen(port);
