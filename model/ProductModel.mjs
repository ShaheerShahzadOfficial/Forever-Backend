import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name']
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description']
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product Price'],
    maxLenght: [8, 'Price cannot Exceed 8 digits']
  },
  Ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please Enter Product Category']
  },
  Stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxLenght: [4, 'Price cannot Exceed 4 digits'],
    default: 1
  },
  NumOfReview: {
    type: Number,
    default: 0
  },
  Review: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],

  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Product = mongoose.model('Products', ProductSchema)
export default Product

////😲😲😲 Product Model Completed ✔️✔️
