import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
  id: ObjectId,
  productos: { type: Array, required: true }
})


const cartModel = mongoose.model('Cart', cartSchema)


export default cartModel