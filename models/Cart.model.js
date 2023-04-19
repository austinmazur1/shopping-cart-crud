const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [ 
        {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "quantity can not be less than 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  }
]},
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
