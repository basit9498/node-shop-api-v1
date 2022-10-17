const { MongoClient } = require("mongodb");

let _db = null;

const dbConnection = (callback) => {
  const client = new MongoClient("mongodb://localhost:27017");
  client
    .connect()
    .then((databaseConnection) => {
      _db = databaseConnection.db("shop");
      callback();
    })
    .catch((err) => console.log("err connection:", err));
};

const getDB = () => {
  return _db;
};

exports.dbConnection = dbConnection;
exports.getDB = getDB;
