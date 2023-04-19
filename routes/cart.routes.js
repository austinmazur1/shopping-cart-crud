const express = require("express");
const router = express.Router();
const Cart = require('../models/Cart.model');

// TODO update the shopping cart
router.post("/cart", async(req, res, next) => {
    console.log(req.body);
    const {userId, id, quantity } = req.body;
    console.log(id);
    console.log(quantity);
    try {
        let cart = await Cart.findOne({});
    } catch (error) {
        
    }
})
  module.exports = router;