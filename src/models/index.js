const dbConfig = require('../config/connectToMongoDB');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.productos = require('./productoModel');

module.exports = db;