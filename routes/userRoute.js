const express = require("express");
const userController = require("../controller/userController");

const route = express.Router();

route.post("/", userController.userRegister);
route.delete("/:id", userController.userDelete);

// user cart
route.put("/add-cart/product/:id", userController.addToCart);

module.exports = route;
