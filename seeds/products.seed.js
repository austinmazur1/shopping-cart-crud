const axios = require("axios");
const mongoose = require("mongoose");
const {Product} = require("../models/Product.model");

//require this to be able to use Mongo_db_uri
require('dotenv').config();

const MONGO_URI = process.env.MONGO_DB_URI

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

//axios to get products from api then send them to the db
//using insert many  
const getProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const allProducts = response.data
    await Product.insertMany(allProducts);
    console.log(allProducts);
  } catch (error) {
    console.log(error);
  }
};

getProducts();