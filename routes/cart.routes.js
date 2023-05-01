const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//import models
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const { Product } = require("../models/Product.model");

//import middleware
const {
  getDataFromMongoDB,
  getDataFromOne,
  productExists
} = require("../models/Product.model");



//// ROUTES ////


//cart get route to display items user has
router.get("/cart/:id", async (req, res, next) => {
  
  //get the user id from the session
  const id = req.session.currentUser._id;

//find their cart with the id associated with it
  const userCart = await Cart.findOne({ user: id });

  //render the cart route, send user data and the cart data 
  if (!userCart) {
    res.render('cart/empty-cart')
  } else {
  res.render("cart/cart", { userInSession: req.session.currentUser, userCart });
}
});



// TODO update quanity if user adds same item twice
//POST route to handle when user adds an item to the cart 
//this gave me lots of headaches
router.post("/cart/:id", async (req, res, next) => {
  try {
    const username = req.session.currentUser.username;
    console.log("please work", req.body.id);

    //gets the product ID
    const id = req.body.id;

    //finds the product from our DB
    const product = await Product.findById(id);

    const userId = req.session.currentUser._id;

    //again getting cart associated with users id
    // const userCart = await Cart.findOne({ user: userId });
    const userCart = await Cart.findOne({ user: userId }).populate('products');
    
    // if user doesnt have a cart
    // we create a new one
    if (!userCart) {
      const newCart = new Cart({
        user: userId,
        products: [
          {
            id: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating,
            price: product.price,
          },
        ],
      });
      await newCart.save();
    } else {
    

      // if they have one, we push the new item to their cart
      if(Cart.findOne(product)) {
        res.redirect('/')
      } else {
      userCart.products.push({
        id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
        price: product.price,
      });

      await userCart.save();
    }
  }

    // we then populate the cart
    const populatedCart = await Cart.findOne({ user: userId }).populate(
      "products"
    );

    res.render("cart/cart", {
      cart: populatedCart.products,
      userInSession: req.session.currentUser,
    });
    // res.redirect(`/dashboard/${username}`);
    
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
