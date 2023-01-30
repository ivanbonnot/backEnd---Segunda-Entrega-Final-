const morgan = require('morgan');
const express = require('express');

//___Firebase___//
const admin = require("firebase-admin")
const serviceAccount = require("../db/ecommerce-be-ch-firebase-adminsdk-m6y02-593b737273.json")

//___Mongo___//
import mongoose from 'mongoose';
import * as moder from './models/productosModel'

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')

const handlebars = require('express-handlebars')
const path = require('path')

const app = express();

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

const { productos, carrito } = require('./class/contenedor')


//Settings
app.set('port', process.env.PORT || 8080)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))

//Starting the server
httpServer.listen(8080, () => {
    console.log('Server On')
})


//___Firebase___//
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//websocket
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await productos.getAll());
    socket.emit('carritos', await carrito.getAll());

    // actualizacion de productos
    socket.on('update', async producto => {
        products.save(producto)
        io.sockets.emit('productos', await productos.getAll());
    })

    socket.on('newCart', async () => {
        socket.emit('carritos', await carrito.getAll())
      })
});


  
//HBS
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs"
    })
);
app.set("view engine", "hbs");
app.set('views', path.resolve(__dirname, '../public'))

//Routes
app.use('/api/productos', require('./routes/products'))
app.use('/api/carrito', require('./routes/cart'))



