const ObjectId = require("mongodb").ObjectId;
const getDB = require("../utils/dbConnect").getDB;
const getCollection = require("../utils/collection");

module.exports = class UserModel {
  constructor(name, email, role) {
    (this.name = name), (this.email = email);
    this.role = role ? role : "user";
    this.cart = { item: [], totalPrice: 0 };
  }

  save() {
    const db = getDB();
    return db.collection(getCollection.userCollection).insert(this);
  }

  static deleteUserById = (id) => {
    const db = getDB();
    return db
      .collection(getCollection.userCollection)
      .deleteOne({ _id: new ObjectId(id) });
  };

  static fetchSingleUser = (id) => {
    const db = getDB();
    return db
      .collection(getCollection.userCollection)
      .findOne({ _id: new ObjectId(id) });
  };

  static addToCart = (id, cart) => {
    const db = getDB();
    return db
      .collection(getCollection.userCollection)
      .updateOne({ _id: id }, { $set: { cart: cart } });
  };

  static cartRemove = (id) => {
    const db = getDB();
    return db
      .collection(getCollection.userCollection)
      .updateOne({ _id: id }, { $set: { cart: { item: [], totalPrice: 0 } } });
  };
};
