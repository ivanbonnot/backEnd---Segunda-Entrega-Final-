import { Router } from "express";

import productos from '../controllers/controller.MongoDB';
import {dbController } from '../config/connectToDB';

const productsRouter = Router();

const adm = true
 
productsRouter.get('/', async (req, res) => {
    const productos = await dbController.getProducts();

  res.json(productos);
})


productsRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const productById =  productos.findOne(parseInt(id))

    if (productById) {
        res.json(productById)
    } else {
        res.status(404).send({ error: 'Product not found' })
    }
})


productsRouter.post('/', (req, res) => {
    console.log(req.body)
    if (adm) {
        const { foto, title, price, description } = req.body

        if (foto && title && price && description) {
             productos.create(req.body)
            res.redirect('/')
        } else {
            res.send('Invalido, todos los campos son obligatorios')
        }

    } else {
        res.send('Error: 403 Ruta: "api/productos" Método: "POST" No Autorizada ')
    }
})


productsRouter.put('/:id', (req, res) => {

    if (adm) {
        const id = Number(req.params.id)
        const { image, title, price, description } = req.body

        if ( productos.findOne(id) && (image && title && price && description)) {
            let allProducts =  productos.findAll()
            allProducts[id - 1] = { "id": id, ...req.body }
            productos.update(allProducts)
            res.send(req.body)
        } else {
            res.status(404).send({ error: 'id invalid / missing fields' })
        }

    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "PUT" No Autorizada ')
    }

})


productsRouter.delete('/:id', (req, res) => {

    if (adm) {
        const { id } = req.params
        const deleteProdById =  productos.findOne(parseInt(id))

        if (deleteProdById) {
             productos.delete(parseInt(id))
            res.send({ deleted: deleteProdById })

        } else {
            res.status(404).send({ error: 'Product not found' })
        }

    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "DELETE" No Autorizada ')
    }

})


export default productsRouter;

