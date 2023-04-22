const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5')
    const allProducts = await response.json(); 
    console.log(allProducts);
    res.render("index",{ allProducts, userInSession: req.session.currentUser});
  } catch (error) {}
});

router.get("/details/:id", async (req, res, next) => {
  // console.log(req.params.id);
  const id = req.params.id

  const { email, username, password } = req.body;
  
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  });

  console.log(username);

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


module.exports = router;
