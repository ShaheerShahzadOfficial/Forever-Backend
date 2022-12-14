import Order from "../model/OrderModel.mjs";
import Product from "../model/ProductModel.mjs";
import ErrorHandler from "../utils/errorhandler.mjs";

// // // Create A New Order 

const NewOrder = async (req, res, next) => {

    const {
        shippingInfo,
        orderItem,
        // paymentInfo,
        itemPrice,
        // taxPrice,
        shippingPrice,
        totalPrice } = req.body


    const orderObj = {
        shippingInfo,
        orderItem,
        // paymentInfo:"",
        itemPrice,
        // taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: "Cash On Delievery",
        User: req.user.id
    }

    const order = await Order.create(orderObj).then((result) => {
        res.status(201).json({
            success: true,
            Order: result
        })
    })



}

// // // Get Single Order 
const GetSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("User", "name  email")

    if (!order) {
        return next(new ErrorHandler("Order Not Found With This Id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

}

const GetOrderDetail = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("User", "name  email")

    if (!order) {
        return next(new ErrorHandler("Order Not Found With This Id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

}

// // // Get Logged In User Order
const MyOrder = async (req, res, next) => {
    const orders = await Order.find({ User: req.user.id })

    if (!orders) {
        return next(new ErrorHandler("You haven't order Something", 404))
    }

    res.status(200).json({
        success: true,
        orders
    })

}


// / / / / / / / Get All Order Admin 
const GetAllOrder = async (req, res, next) => {

    const orders = await Order.find()

    if (!orders) {
        res.status(500).json({
            message: "No Order Found"
        })
    }

    let totalAmount = 0

    orders.forEach(element => {
        totalAmount += element.totalPrice
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })

}


// // // // Update Order Status
const updateOrderStatus = async (req, res, next) => {

    const orders = await Order.findById(req.params.id)

    if (!orders) {
        res.status(500).json({
            message: "No Order Found"
        })
    }

    if (orders.status === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 404))
    }


    if (orders.status === "Proccessing") {
        orders.orderItem.forEach(async (order) => {
            await updateStock(order.product, order.quantity)
        });
    }

    orders.status = req.body.status;

    if (req.body.status === "Delivered") {
        orders.deliveredAt = Date.now()
    }


    await orders.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

}


async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.Stock -= quantity

    await product.save({ validateBeforeSave: false })
}




const DeleteOrder = async (req, res, next) => {

    const orders = await Order.findById(req.params.id)

    if (!orders) {
        res.status(500).json({
            message: "No Order Found"
        })
    }


    await orders.remove()

    res.status(200).json({
        success: true
    })

}





export { NewOrder, GetSingleOrder, MyOrder, GetAllOrder, updateOrderStatus, DeleteOrder, GetOrderDetail }                                      