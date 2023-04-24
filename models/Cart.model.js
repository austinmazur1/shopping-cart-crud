const { Schema, model, default: mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
