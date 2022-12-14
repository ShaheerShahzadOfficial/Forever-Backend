const express = require("express");
const ProductRoute = require("./Routes/Product/Product.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorMiddleware = require("./middleware/error.js");
const UserRoute = require("./Routes/User/User.js");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const OrderRoute = require("./Routes/Order/Order.js");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use("/products", ProductRoute);
app.use("/user", UserRoute);
app.use("/order", OrderRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../frontend/build"));
// }

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Error  🤦‍♂️🤦‍♂️

app.use((req, res) => {
  res.status(404).json({
    Error: "🤬🤬🤬🤬🤬🤬 URL Not Found 🤬🤬🤬🤬🤬🤬"
  });
});

// Errormiddleware
app.use(ErrorMiddleware);

module.exports = app;
