
import Product from '../model/ProductModel.mjs'
import ErrorHandler from '../utils/errorhandler.mjs'
import ApiFeature from '../utils/apiFeature.mjs'
import cloudinary from 'cloudinary'

//// CREATE NEW PRODUCT  --ADMIN

const createProduct = async (req, res, next) => {
  try {
    let images = []

    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products'
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }

    req.body.images = imagesLinks

    req.body.User = req.user.id

    const product = await Product.create(req.body)
      .then(result => {
        res.status(201).json({
          success: true,
          product: result
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err.message
        })
      })
  } catch (error) {
    res.status(500).json({
      err: error.message
    })
  }
}

//// GET ALL PRODUCT

const getAllProduct = async (req, res) => {
  const resultPerPage = 12
  const productsCount = await Product.countDocuments()

  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter()
  // .pagination(resultPerPage)

  let products = await apiFeature.query

  let filteredProductCount = products.length

  apiFeature.pagination(resultPerPage)

  products = await apiFeature.query.clone()

  // const products = await apiFeature.query

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount
  })
}

//// GET ALL PRODUCT  ---Admin

const getAllProductAdmin = async (req, res) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    products
  })
}

////UPDATE PRODUCT --ADMIN

const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return next(new ErrorHandler('Product Not Found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false
    })
    res.status(200).json({
      success: true,
      product
    })
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }
}

////DELETE PRODUCT --ADMIN

const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  await product.delete()
  res.status(200).json({
    success: true,
    msg: 'product is deleted successfully'
  })
}

const oneProductDetail = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  res.status(200).json({
    success: true,
    product
  })
}

const CreateProductReview = async (req, res, next) => {
  let { rating, comment, productId } = req.body

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId)

  const isReviewed = product.Review.find(
    rev => rev.user.toString() === req.user.id
  )

  if (isReviewed) {
    product.Review.forEach(rev => {
      if (rev.user.toString() === req.user.id)
        (rev.rating = rating), (rev.comment = comment)
    })
  } else {
    product.Review.push(review)
    product.NumOfReview = product.Review.length
  }
  let avg = 0
  product.Review.forEach(rev => {
    avg += rev.rating
  })

  product.Ratings = avg / product.Review.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true
  })
}

const getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  res.status(200).json({
    success: true,
    Review: product.Review
  })
}

const DeleteProductReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  const reviews = product.Review.filter(
    rev => rev._id.toString() !== req.query.id.toString()
  )

  let avg = 0
  reviews.forEach(rev => {
    avg += rev.rating
  })

  const Ratings = (product.Ratings = avg / reviews.length)

  const NumOfReview = reviews.length

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      Review: reviews,
      Ratings,
      NumOfReview
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  )

  res.status(200).json({
    success: true
  })
}

export {
  getAllProduct,
  getAllProductAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  oneProductDetail,
  CreateProductReview,
  getProductReviews,
  DeleteProductReview
}
