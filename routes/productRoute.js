const express = require("express");
const productController = require("../controller/productController");

const route = express.Router();

route.post("/", productController.addProduct);
route.put("/:id", productController.updateProduct);

module.exports = route;
