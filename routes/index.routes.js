const express = require("express");
const router = express.Router();

//import functions from product model
const {
  getDataFromMongoDB,
  getDataFromOne,
} = require("../models/Product.model");

//// ROUTES ////

/* GET home page */
//render products from DB
router.get("/", async (req, res, next) => {
  try {
    //function that handles the fetching from db
    const allProducts = await getDataFromMongoDB();
    res.render("index", {
      allProducts,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
    console.log("error retrieving from the DB");
  }
});

//GET route to show details on specific product
router.get("/details/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    //use the function to get product with id
    const product = await getDataFromOne(id);
    //send userInSession data and product data
    res.render("products/details", {
      product,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
