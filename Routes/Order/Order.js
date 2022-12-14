const express = require("express");
const {
  DeleteOrder,
  GetAllOrder,
  GetOrderDetail,
  GetSingleOrder,
  MyOrder,
  NewOrder,
  updateOrderStatus
} = require("../../Controller/OrderController.js");
const OrderRoute = express.Router();
const {
  AuthenticatedUserRole,
  checkToken
} = require("../../middleware/Auth/auth.js");

OrderRoute.route("/createOrder").post(checkToken, NewOrder);
OrderRoute.route("/admin/getSingleOrder/:id").get(
  checkToken,
  AuthenticatedUserRole("Admin"),
  GetSingleOrder
);
OrderRoute.route("/getOrderDetail/:id").get(checkToken, GetOrderDetail);
OrderRoute.route("/myOrder").get(checkToken, MyOrder);
OrderRoute.route("/admin/getAllOrder").get(
  checkToken,
  AuthenticatedUserRole("Admin"),
  GetAllOrder
);
OrderRoute.route("/admin/updateOrderStatus/:id").put(
  checkToken,
  AuthenticatedUserRole("Admin"),
  updateOrderStatus
);
OrderRoute.route("/admin/deleteOrder/:id").delete(
  checkToken,
  AuthenticatedUserRole("Admin"),
  DeleteOrder
);

module.exports = OrderRoute;
