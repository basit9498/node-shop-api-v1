const express = require("express");
const orderController = require("../controller/orderController");

const route = express.Router();

route.post("/", orderController.addOrder);

module.exports = route;
