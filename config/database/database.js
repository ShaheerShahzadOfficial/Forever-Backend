const mongoose = require("mongoose");

const DBConnection = () => {
  const url =
    "mongodb+srv://ShaheerShahzad:ShaheerDev@ecommerce.w8dyp.mongodb.net/ForeverFashion?retryWrites=true&w=majority";

  mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
    console.log(`DATABASE CONNECTED WITH THE HOST ${result.connection.host}`);
  });

  // .catch((err) => {
  //     console.error(err)
  // });
};

module.exports = DBConnection;
