const ProductModel = require("../models/productModel");

exports.addProduct = (req, res, next) => {
  const { title, price, description, qty, url } = req.body;
  const product = new ProductModel(title, price, description, qty, url, null);
  product
    .save()
    .then((result) =>
      res.json({
        message: "Product Add",
        result,
      })
    )
    .catch((err) =>
      res.json({
        message: "Product Not Added",
        err,
      })
    );
};

exports.updateProduct = (req, res, next) => {
  const { title, price, description, qty, url } = req.body;
  const id = req.params.id;
  const product = new ProductModel(title, price, description, qty, url, id);
  product
    .save()
    .then((result) =>
      res.json({
        message: "Product Update",
        result,
      })
    )
    .catch((err) =>
      res.json({
        message: "Product Not Update",
        err,
      })
    );
};
