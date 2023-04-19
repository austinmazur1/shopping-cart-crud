function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = capitalize;


const Cart = require("../models/Cart.model");
