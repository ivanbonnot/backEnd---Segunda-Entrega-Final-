import { Router } from "express";
import Product from "../Class/Product.js";
import dbController from "../controllers/controllerMongoDB.js";



const productsRouter = Router();

const adm = true

productsRouter.get('/', async (req, res) => {
    const productos = await dbController.getProducts();

    res.json(productos);
})


productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const productById = await dbController.getProductById(id)
    console.log(id)
    if (productById) {
        res.json(productById)
    } else {
        res.status(404).send({ error: 'Product not found' })
    }
})


productsRouter.post('/', async (req, res) => {
    if (adm) {
        // const { title, description, code, thumbnail, price, stock } = req.body

        // if (title && description && code && thumbnail && price && stock) {
        const { title, description, code, thumbnail, price, stock } = req.body;

        const product = new Product(
            title,
            description,
            code,
            thumbnail,
            price,
            stock
        );

        console.log(product)
        console.log(req.body)
        // const product = new productoModel(product);
        // await product.save();
        dbController.saveProduct(product)
        res.json('Guardado')
        // } else {
        //     res.send('Invalido, todos los campos son obligatorios')
        // }

    } else {
        res.send('Error: 403 Ruta: "api/productos" Método: "POST" No Autorizada ')
    }
})


productsRouter.put('/:id', async (req, res) => {
    if (adm) {
        const { id } = req.params
        const { title, description, code, thumbnail, price, stock } = req.body;

        const productUpdate = new Product(
            title,
            description,
            code,
            thumbnail,
            price,
            stock
        );

        const productById = await dbController.getProductById(id)

        if (productById) {
            await dbController.updateProduct(id, productUpdate)
            res.send(productUpdate)
        } else {
            res.status(404).send({ error: 'id invalid / missing fields' })
        }
    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "PUT" No Autorizada ')
    }
})


productsRouter.delete('/:id', async (req, res) => {
    if (adm) {
        const { id } = req.params
        const deleteProdById = await dbController.deleteProduct(id)

        if (deleteProdById) {
            res.send({ deleted: deleteProdById })
        } else {
            res.status(404).send({ error: 'Product not found' })
        }

    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "DELETE" No Autorizada ')
    }

})


export default productsRouter;

