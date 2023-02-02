import morgan from 'morgan'

import { connectToDb } from "./config/connectToDb.js";
// import cartRouter from "./routes/cart";
import productsRouter from "./routes/products.js";

import express from 'express'
const app = express();

//__Elegir DB, "firebase" o "mongo" __//
const db = "mongo"

//Settings
app.set('port', process.env.PORT || 8080)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))

//Starting the server
connectToDb(db).then(() => {
    app.listen(8080, () => {
        console.log('Server On')
    })
})

//Routes
app.use("/api/productos", productsRouter)
// app.use('/api/carrito', cartRouter)

//___ Error 404 ___//
app.use(function (req, res) {
    res.status(404).send({ error: -1, descripcion: 'Ruta no implementada' })
})
