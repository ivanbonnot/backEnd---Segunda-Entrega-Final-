const db = require("../models");
const Producto = db.productos;
const connectToDd = require('../config/connectToMongoDB')

// Create and Save a new Product
exports.create = async (req, res) => {

    await connectToDd()
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Product
    const producto = new Producto({
        title: req.body.title,
        description: req.body.descripcion,
        thumbnail: req.body.foto,
        stock: req.body.stock,
        codigo: req.body.codigo,
        price: req.body.price
    });

    // Save Product in the database
    producto
        .save(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    await connectToDd()

    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Producto.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Product with an id
exports.findOne = async (req, res) => {
    await connectToDd()
    const id = req.params.id;
  
    Producto.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Product with id=" + id });
      });
  };

// Update a Product by the id in the request
exports.update = async (req, res) => {
    await connectToDd()
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update product with id=${id}. Maybe product was not found!`
          });
        } else res.send({ message: "product was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating product with id=" + id
        });
      });
  };

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
    await connectToDd()
    const id = req.params.id;
  
    Producto.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete product with id=${id}. Maybe product was not found!`
          });
        } else {
          res.send({
            message: "product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete product with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
    await connectToDd()
    Producto.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Products were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
    await connectToDd()
    Producto.find({ stock: 20 })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  };