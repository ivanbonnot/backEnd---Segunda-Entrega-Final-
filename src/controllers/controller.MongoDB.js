import  productoModel  from "../models/productoModel.js";

class ControllerMongoDb {

    saveProduct = async (productToAdd) => {
        const product = new productoModel(productToAdd);
        await product.save();
    };

    getProducts = async () => await Producto.find({});

    getProductById = async (id) => await Producto.findOne({ _id: id });

    updateProduct = async (id, productToUpdate) => {
        return await Producto.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

    deleteProduct = async (id) => await Producto.deleteOne({ _id: id });

}


export default ControllerMongoDb;