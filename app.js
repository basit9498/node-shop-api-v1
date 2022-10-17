const express = require("express");
const bodyParser = require("body-parser");

const db = require("./utils/dbConnect");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

// Model
const User = require("./models/userModel");

const app = express();

// app middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get user detail middleware
app.use((req, res, next) => {
  User.fetchSingleUser("63392705352ae332551a6a42")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
});

// custom Middlewares
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);

db.dbConnection(() => {
  app.listen(5000, () => {
    console.log("MongoConnect & Server is Running");
  });
});
