import  productoModel  from "../models/productoModel.js";

class ControllerMongoDb {
    
    saveProduct = async (productToAdd) => {
        console.log("guardado", productToAdd)
        const product = new productoModel(productToAdd);
        await product.save();
        console.log("guardado", product)
    };

    getProducts = async () => await productoModel.find({});

    getProductById = async (id) => await productoModel.findOne({ _id: id });

    updateProduct = async (id, productToUpdate) => {
        return await productoModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

    deleteProduct = async (id) => await productoModel.deleteOne({ _id: id });

}


export default ControllerMongoDb;