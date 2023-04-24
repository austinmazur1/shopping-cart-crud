const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: {
      rate: Number,
      count: Number,
    },
  },
});

//function to retrieve the products from the DB
const getDataFromMongoDB = async () => {
  try {
    const data = await mongoose.model("Product").find();
    return data;
  } catch (error) {
    console.log("Error retrieving data from MongoDB:", error);
  }
};

const getDataFromOne = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log("Error retrieving data from MongoDB:", error);
  }
};

const Product = model("Product", productSchema);

module.exports = {
  Product,
  getDataFromMongoDB,
  getDataFromOne,
};
