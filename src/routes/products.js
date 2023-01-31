const { Router } = require('express')
const productosRouter = new Router()
const productos = require('../controllers/productoController');


const adm = true


productosRouter.get('/', (req, res) => {
    const allProducts =  productos.findAll()
    res.json(
        allProducts
    );
})


productosRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const productById =  productos.findOne(parseInt(id))

    if (productById) {
        res.json(productById)
    } else {
        res.status(404).send({ error: 'Product not found' })
    }
})


productosRouter.post('/', (req, res) => {
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


productosRouter.put('/:id', (req, res) => {

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


productosRouter.delete('/:id', (req, res) => {

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


module.exports = productosRouter;

