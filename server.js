const http = require("http");
const app = require("./app.js");
const dotenv = require("dotenv");
const DBConnection = require("./config/database/database.js");
const cloudinary = require("cloudinary");
const Server = http.createServer(app);

// config
dotenv.config({ path: "config/config.env" });

//// Data Base Connection

DBConnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 4000;
Server.listen(port, () => {
  console.log(`Server is Running On ${port}`);
});
