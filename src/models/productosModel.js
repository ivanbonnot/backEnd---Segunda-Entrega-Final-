const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductoSchema = new Schema({
  id: ObjectId,
  title: {type: String, required: true},
  thumbnail: {type: String, required: true},
  description: String,
  stock: String,
  price: Number
});

const ProductoModel = mongoose.model('productos', ProductoSchema)

module.exports = ProductoModel