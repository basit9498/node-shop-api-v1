const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.userRegister = (req, res, next) => {
  const { name, email } = req.body;
  const UserModel = new User(name, email);
  UserModel.save()
    .then((result) => {
      res.json({
        message: "user save",
        result,
      });
    })
    .catch((err) => {
      res.json({
        message: "user Not Save",
        err,
      });
    });
};

exports.userDelete = (req, res, next) => {
  User.deleteUserById(req.params.id)
    .then((result) => {
      res.json({
        message: "deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "user was not deleted",
        result: err,
      });
    });
};

exports.addToCart = (req, res, next) => {
  const productId = req.params.id;
  Product.getSingleProductById(productId).then((product) => {
    let updateCart;

    if (req.user?.cart?.item?.length > 0) {
      const getProductIndex = req.user?.cart?.item?.findIndex((i) => {
        return i.productId.toString() === productId.toString();
      });

      if (getProductIndex >= 0) {
        req.user.cart.item[getProductIndex].qty =
          req.user.cart.item[getProductIndex].qty + 1;

        updateCart = {
          item: req.user.cart.item,
          totalPrice:
            Number(req?.user?.cart?.totalPrice) + Number(product.price),
        };
      } else {
        const getOldItem = req?.user?.cart?.item;
        updateCart = {
          item: [...getOldItem, { productId: product._id, qty: 1 }],
          totalPrice:
            Number(req?.user?.cart?.totalPrice) + Number(product.price),
        };
      }
    } else {
      updateCart = {
        item: [{ productId: product._id, qty: 1 }],
        totalPrice: product.price * 1,
      };
    }

    User.addToCart(req.user._id, updateCart).then((result) => {
      res.json({
        message: "Add to Cart Done",
      });
    });
  });
};
