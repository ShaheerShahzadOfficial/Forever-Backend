const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    postalCode: {
      type: Number,
      required: true
    }
  },
  orderItem: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true
      }
    }
  ],
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },

  paidAt: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    default: 0,
    required: true
  },

  shippingPrice: {
    type: Number,
    default: 0,
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true
  },
  status: {
    type: String,
    default: "Proccessing",
    required: true
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;
