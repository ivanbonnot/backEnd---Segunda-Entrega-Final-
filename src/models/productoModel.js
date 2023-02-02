import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productoSchema = new Schema({
  id: ObjectId,
  timestamp: { type: Number, require: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true }
});

const cartSchema = new Schema({
  id: ObjectId,
  productos: { type: Array, required: true }
})


const productoModel = mongoose.model('Product', productoSchema)


export default productoModel

// module.exports = mongoose => {
//   const Producto = mongoose.model(
//     "producto",
//     mongoose.Schema(
//       {
//         id: ObjectId,
//         title: { type: String, required: true },
//         thumbnail: { type: String, required: true },
//         description: { type: String, required: true },
//         stock: { type: String, required: true },
//         price: { type: Number, required: true }
//       },
//       { timestamps: true }
//     )
//   );

//   return Producto;
// };