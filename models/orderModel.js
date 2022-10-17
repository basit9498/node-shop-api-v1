const getDB = require("../utils/dbConnect").getDB;
const getCollection = require("../utils/collection");

module.exports = class OrderModel {
  constructor(taxPrice, totalPrice, items, userId) {
    this.taxPrice = taxPrice;
    (this.totalPrice = totalPrice),
      (this.items = items),
      (this.userId = userId),
      (this.status = "Pending");
  }

  save() {
    const db = getDB();
    return db.collection(getCollection.orderCollection).insertOne(this);
  }
};
