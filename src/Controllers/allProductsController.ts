import mysql from "promise-mysql";
import { dbSettings } from "../../environments";
import { convertPrice } from "./Services/currencyConversion";
import { Express } from "express";
import type { Request, Response } from "express";

interface ProductRow {
  id: number;
  name: string;
  price: number;
  stock: number;
  color: string;
}

type acceptableCurrency = "GBP" | "USD" | "EUR" | "YEN";

export const allProducts = async (req: Request, res: Response) => {
  let cat: string = req.query.cat;
  let currency: acceptableCurrency = req.query.currency;
  let instockonly = parseInt(req.query.instockonly || 0);
  try {
    const db = await mysql.createConnection(dbSettings);
    let sqlQuery = `
    SELECT products.id, products.name, products.price, products.stock, products.color
    FROM products
    LEFT JOIN categories ON products.name = categories.category
    WHERE categories.id = ?
  `;
    let queryParams = [cat];

    if (instockonly === 1) {
      sqlQuery += ` AND products.stock > 1;`;
    }

    const rows: ProductRow[] = await db.query(sqlQuery, queryParams);

    const products = rows.map((row) => ({
      id: row.id,
      price: convertPrice(currency, row.price),
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
