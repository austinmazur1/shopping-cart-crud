const express = require("express");
const router = express.Router();
let cartItems = [];

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5')
    const allProducts = await response.json(); 
    console.log(allProducts);
    res.render("index",{ allProducts});
  } catch (error) {}
});

router.get("/details/:id", async (req, res, next) => {
  // console.log(req.params.id);
  const id = req.params.id
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await response.json();
    console.log({product});
    res.render('products/details', {product})
  } catch (error) {
    console.log(error);
    next(error);
  }
})

// TODO update the shopping cart
router.post("/cart", async(req, res, next) => {
  console.log(req.body.id);
  const id = req.body.id
const response = await fetch(`https://fakestoreapi.com/products/${id}`)
const cartItem = await response.json();

//Check if item is in cart already
const existingItem = cartItem.id;
if(existingItem) {
  existingItem.quantity++
} else {
  cartItems.push({id, quantity: 1, product})
}
console.log(existingItem);
console.log(cartItems);
  res.render('cart/cart', {cartItems})
})
module.exports = router;
