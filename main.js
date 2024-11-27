const express = require("express");
const cors = require("cors");
const mysql = require("promise-mysql");

const app = express();
const port = 3001;

app.get("/categories", category);

app.listen(port);
