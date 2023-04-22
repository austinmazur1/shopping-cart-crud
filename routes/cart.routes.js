const express = require("express");
const router = express.Router();
const Cart = require('../models/Cart.model');
const User = require("../models/User.model");

// TODO update the shopping cart
router.post("/cart/:id", async(req, res, next) => {
    console.log(req.body);
    const {userId, id, quantity } = req.body;

    const user = await User.findOne({
        $or: [{ username }, { email: username }],
      });
  
      console.log(username);
    console.log(id);
    console.log(quantity);
    try {
        res.render("cart/cart", { userInSession: req.session.currentUser })
        // let cart = await Cart.findOne({});
    } catch (error) {
        
    }
})
  module.exports = router;