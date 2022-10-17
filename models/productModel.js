const ObjectId = require("mongodb").ObjectId;
const getDB = require("../utils/dbConnect").getDB;
const getCollection = require("../utils/collection");

module.exports = class Product {
  constructor(title, price, description, qty, url, id) {
    (this.title = title),
      (this.price = Number(price)),
      (this.description = description),
      (this.qty = Number(qty)),
      (this.url = url);
    this._id = id != null ? new ObjectId(id) : null;
  }

  save() {
    const db = getDB();

    if (this._id == null) {
      return db.collection(getCollection.productCollection).insertOne(this);
    } else {
      return db.collection(getCollection.productCollection).updateOne(
        { _id: this._id },
        { $set: this }
        // {
        //   $set: {
        //     title: this.title,
        //     price: this.price,
        //     description: this.description,
        //     qty: this.qty,
        //     url: this.url,
        //   },
        // }
      );
    }
  }

  static getSingleProductById = (id) => {
    const db = getDB();
    return db.collection(getCollection.productCollection).findOne({
      _id: new ObjectId(id),
    });
  };

  static getMatchById = (ids) => {
    const db = getDB();
    return db
      .collection(getCollection.productCollection)
      .find({ _id: { $in: ids } })
      .toArray();
  };

  static updateQtyMatchById = (items) => {
    const db = getDB();
    const updateManyQuery = items.map((getId) => {
      return {
        updateOne: {
          filter: { _id: getId.productId },
          update: { $inc: { qty: -getId.qty } },
        },
      };
    });
    console.log("updateManyQuery", updateManyQuery);
    return db
      .collection(getCollection.productCollection)
      .bulkWrite(updateManyQuery)
      .then((res) => {
        console.log("Product Update qty:", res);
      });
  };
};
