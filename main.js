const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://root:password@localhost:27017";

const app = express();
const port = 3001;



app.listen(port);
