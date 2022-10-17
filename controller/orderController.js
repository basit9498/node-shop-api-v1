const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.addOrder = (req, res, next) => {
  const getProductIds = req.user.cart?.item?.map((item) => {
    return item.productId;
  });

  Product.getMatchById(getProductIds)
    .then((product) => {
      const items = product.map((i) => {
        const getQtyIndex = req.user.cart?.item?.findIndex(
          (item) => item.productId.toString() === i._id.toString()
        );
        return {
          productId: i._id,
          productPrice: i.price,
          qty: req.user.cart?.item[getQtyIndex].qty,
        };
      });
      const { taxPrice } = req.body;
      const totalPrice = Number(req.user.cart.totalPrice) + Number(taxPrice);
      const order = new Order(
        Number(taxPrice),
        totalPrice,
        items,
        req.user._id
      );
      order.save().then(async (order) => {
        await Product.updateQtyMatchById(req.user.cart?.item);
        await User.cartRemove(req.user._id);

        res.json({
          message: "Order Has Been Added",
          order,
        });
      });
    })
    .catch((err) => {
      throw err;
    });
};
